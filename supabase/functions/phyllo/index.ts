import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const PHYLLO_BASE_URL = "https://api.getphyllo.com";

function getPhylloAuthHeader(): string {
  const clientId = Deno.env.get("PHYLLO_CLIENT_ID");
  const secret = Deno.env.get("PHYLLO_SECRET");
  if (!clientId || !secret) throw new Error("Phyllo credentials not configured");
  return "Basic " + btoa(`${clientId}:${secret}`);
}

function supabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function phylloFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${PHYLLO_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: getPhylloAuthHeader(),
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Phyllo API error [${res.status}]: ${JSON.stringify(data)}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      console.error("Missing env vars:", { 
        url: !!supabaseUrl, 
        anonKey: !!supabaseAnonKey, 
        serviceKey: !!supabaseServiceKey 
      });
      throw new Error("Supabase environment variables not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authError } = await createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: authHeader } } }
    ).auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "create_token") {
      // Step 1: Create or retrieve Phyllo user
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("user_id", user.id)
        .single();

      if (!profile) {
        return new Response(JSON.stringify({ error: "Profile not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create a Phyllo user using the profile ID as external_id
      const phylloUser = await phylloFetch("/v1/users", {
        method: "POST",
        body: JSON.stringify({
          name: profile.full_name || profile.email,
          external_id: profile.id,
        }),
      });

      // Step 2: Create SDK token
      const sdkToken = await phylloFetch("/v1/sdk-tokens", {
        method: "POST",
        body: JSON.stringify({
          user_id: phylloUser.id,
          products: ["IDENTITY", "ENGAGEMENT"],
        }),
      });

      return new Response(
        JSON.stringify({
          sdk_token: sdkToken.sdk_token,
          user_id: phylloUser.id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "fetch_accounts") {
      const phylloUserId = url.searchParams.get("phyllo_user_id");
      if (!phylloUserId) {
        return new Response(JSON.stringify({ error: "phyllo_user_id required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Fetch connected accounts from Phyllo
      const accounts = await phylloFetch(`/v1/profiles?user_id=${phylloUserId}`);

      // Get user's profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!profile) {
        return new Response(JSON.stringify({ error: "Profile not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Sync accounts to our social_accounts table
      const synced = [];
      for (const account of accounts.data || []) {
        const platformMap: Record<string, string> = {
          YOUTUBE: "youtube",
          TIKTOK: "tiktok",
          INSTAGRAM: "instagram",
          TWITTER: "twitter",
          TWITCH: "twitch",
          LINKEDIN: "linkedin",
        };

        const platform = platformMap[account.work_platform?.name?.toUpperCase()] || null;
        if (!platform) continue;

        const { data: existing } = await supabase
          .from("social_accounts")
          .select("id")
          .eq("profile_id", profile.id)
          .eq("platform", platform)
          .maybeSingle();

        const accountData = {
          profile_id: profile.id,
          platform,
          username: account.username || account.platform_username || "unknown",
          profile_url: account.url || null,
          followers: account.reputation?.follower_count || 0,
          total_views: account.reputation?.content_count || 0,
          engagement_rate: account.reputation?.engagement_rate
            ? parseFloat((account.reputation.engagement_rate * 100).toFixed(2))
            : 0,
          is_primary: false,
        };

        if (existing) {
          await supabase
            .from("social_accounts")
            .update(accountData)
            .eq("id", existing.id);
          synced.push({ ...accountData, id: existing.id, action: "updated" });
        } else {
          const { data: inserted } = await supabase
            .from("social_accounts")
            .insert(accountData)
            .select()
            .single();
          synced.push({ ...inserted, action: "created" });
        }
      }

      // Update total followers on profile
      const { data: allAccounts } = await supabase
        .from("social_accounts")
        .select("followers")
        .eq("profile_id", profile.id);

      if (allAccounts) {
        const total = allAccounts.reduce((acc: number, a: any) => acc + (a.followers || 0), 0);
        await supabase
          .from("profiles")
          .update({ total_followers: total })
          .eq("id", profile.id);
      }

      return new Response(JSON.stringify({ synced, total: synced.length }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Phyllo function error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
