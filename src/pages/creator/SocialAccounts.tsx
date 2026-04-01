import { useState, useEffect, useCallback } from "react";
import { Plus, Link2, Trash2, Star, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { socialAccountSchema } from "@/lib/validation";

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  profile_url: string | null;
  followers: number;
  total_views: number;
  engagement_rate: number;
  is_primary: boolean;
}

const platforms = [
  { value: "youtube", label: "YouTube", emoji: "▶️" },
  { value: "tiktok", label: "TikTok", emoji: "📱" },
  { value: "instagram", label: "Instagram", emoji: "📷" },
  { value: "twitter", label: "Twitter", emoji: "🐦" },
  { value: "twitch", label: "Twitch", emoji: "🎮" },
  { value: "linkedin", label: "LinkedIn", emoji: "💼" },
];

const SocialAccounts = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [phylloLoading, setPhylloLoading] = useState(false);
  const [phylloSyncing, setPhylloSyncing] = useState(false);

  // New account form
  const [newPlatform, setNewPlatform] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newProfileUrl, setNewProfileUrl] = useState("");
  const [newFollowers, setNewFollowers] = useState("");
  const [newViews, setNewViews] = useState("");
  const [newEngagement, setNewEngagement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [profile]);

  const fetchAccounts = async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("social_accounts")
      .select("*")
      .eq("profile_id", profile.id)
      .order("is_primary", { ascending: false });

    if (data) setAccounts(data);
    setLoading(false);
  };

  // ─── Phyllo Connect Flow ──────────────────────────────────────
  const handlePhylloConnect = useCallback(async () => {
    if (!profile) return;
    setPhylloLoading(true);

    try {
      // Get auth session
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/phyllo?action=create_token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create Phyllo token");
      }

      const { sdk_token, user_id: phylloUserId } = await res.json();

      // 2. Load Phyllo Connect SDK
      await loadPhylloSDK();

      // 3. Initialize Connect
      const config = {
        clientDisplayName: "Nexly",
        environment: "production",
        userId: phylloUserId,
        token: sdk_token,
        redirect: false,
        workPlatformId: null,
      };

      const phylloConnect = (window as any).PhylloConnect.initialize(config);

      phylloConnect.on("accountConnected", async () => {
        toast({ title: "Account connected! Syncing data..." });
        await syncPhylloAccounts(phylloUserId);
      });

      phylloConnect.on("accountDisconnected", () => {
        toast({ title: "Account disconnected", variant: "destructive" });
      });

      phylloConnect.on("exit", (reason: string) => {
        setPhylloLoading(false);
        if (reason === "error") {
          toast({ title: "Connection failed", description: "Please try again", variant: "destructive" });
        }
      });

      phylloConnect.on("tokenExpired", () => {
        toast({ title: "Session expired", description: "Please try connecting again", variant: "destructive" });
        setPhylloLoading(false);
      });

      phylloConnect.open();
    } catch (error: any) {
      console.error("Phyllo connect error:", error);
      toast({
        title: "Connection Error",
        description: error.message || "Failed to initialize Phyllo",
        variant: "destructive",
      });
      setPhylloLoading(false);
    }
  }, [profile, toast]);

  const syncPhylloAccounts = async (phylloUserId: string) => {
    setPhylloSyncing(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/phyllo?action=fetch_accounts&phyllo_user_id=${phylloUserId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to sync accounts");
      }

      const result = await res.json();
      toast({
        title: "Sync Complete!",
        description: `${result.total} account(s) synced successfully`,
      });
      fetchAccounts();
    } catch (error: any) {
      toast({
        title: "Sync Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPhylloSyncing(false);
      setPhylloLoading(false);
    }
  };

  const loadPhylloSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).PhylloConnect) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.getphyllo.com/connect/v2/phyllo-connect.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Phyllo SDK"));
      document.head.appendChild(script);
    });
  };

  // ─── Manual Add ──────────────────────────────────────────────
  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const validation = socialAccountSchema.safeParse({
      platform: newPlatform || undefined,
      username: newUsername,
      profile_url: newProfileUrl || undefined,
      followers: newFollowers ? parseInt(newFollowers) : undefined,
      total_views: newViews ? parseInt(newViews) : undefined,
      engagement_rate: newEngagement ? parseFloat(newEngagement) : undefined,
    });

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError?.message || "Please check your input",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = validation.data;
      const { error } = await supabase.from("social_accounts").insert({
        profile_id: profile.id,
        platform: data.platform,
        username: data.username,
        profile_url: data.profile_url || null,
        followers: Number.isNaN(data.followers) ? 0 : (data.followers || 0),
        total_views: Number.isNaN(data.total_views) ? 0 : (data.total_views || 0),
        engagement_rate: Number.isNaN(data.engagement_rate) ? 0 : (data.engagement_rate || 0),
        is_primary: accounts.length === 0,
      });

      if (error) throw error;

      toast({ title: "Account added successfully!" });
      setDialogOpen(false);
      resetForm();
      fetchAccounts();
      updateTotalFollowers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetPrimary = async (accountId: string) => {
    if (!profile) return;
    await supabase
      .from("social_accounts")
      .update({ is_primary: false })
      .eq("profile_id", profile.id);

    await supabase
      .from("social_accounts")
      .update({ is_primary: true })
      .eq("id", accountId);

    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      await updateProfile({ primary_platform: account.platform as any });
    }

    toast({ title: "Primary account updated" });
    fetchAccounts();
  };

  const handleDelete = async (accountId: string) => {
    if (!confirm("Are you sure you want to remove this account?")) return;
    await supabase.from("social_accounts").delete().eq("id", accountId);
    toast({ title: "Account removed" });
    fetchAccounts();
    updateTotalFollowers();
  };

  const updateTotalFollowers = async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("social_accounts")
      .select("followers")
      .eq("profile_id", profile.id);

    if (data) {
      const total = data.reduce((acc, a) => acc + a.followers, 0);
      await updateProfile({ total_followers: total });
    }
  };

  const resetForm = () => {
    setNewPlatform("");
    setNewUsername("");
    setNewProfileUrl("");
    setNewFollowers("");
    setNewViews("");
    setNewEngagement("");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformEmoji = (platform: string) => {
    return platforms.find((p) => p.value === platform)?.emoji || "📱";
  };

  const connectedPlatforms = accounts.map((a) => a.platform);
  const availablePlatforms = platforms.filter((p) => !connectedPlatforms.includes(p.value));

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Social Accounts</h1>
            <p className="text-muted-foreground">
              Connect your social media accounts to showcase your stats
            </p>
          </div>

          <div className="flex gap-2">
            {/* Phyllo Auto-Connect Button */}
            <Button
              onClick={handlePhylloConnect}
              disabled={phylloLoading || phylloSyncing}
              className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
            >
              {phylloLoading || phylloSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              {phylloSyncing ? "Syncing..." : phylloLoading ? "Connecting..." : "Auto-Connect"}
            </Button>

            {/* Manual Add */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2" disabled={availablePlatforms.length === 0}>
                  <Plus className="w-4 h-4" />
                  Add Manually
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Social Account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddAccount} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform *</Label>
                    <Select value={newPlatform} onValueChange={setNewPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePlatforms.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            <span className="flex items-center gap-2">
                              <span>{p.emoji}</span>
                              <span>{p.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Username *</Label>
                    <Input
                      placeholder="@yourusername"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Profile URL</Label>
                    <Input
                      type="url"
                      placeholder="https://..."
                      value={newProfileUrl}
                      onChange={(e) => setNewProfileUrl(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Followers</Label>
                      <Input
                        type="number"
                        placeholder="10000"
                        value={newFollowers}
                        onChange={(e) => setNewFollowers(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Total Views</Label>
                      <Input
                        type="number"
                        placeholder="500000"
                        value={newViews}
                        onChange={(e) => setNewViews(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Eng. Rate %</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="4.5"
                        value={newEngagement}
                        onChange={(e) => setNewEngagement(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !newPlatform || !newUsername}>
                      {isSubmitting ? "Adding..." : "Add Account"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Auto-Connect Info Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-foreground">Auto-Connect with Phyllo</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click "Auto-Connect" to securely link your social accounts and automatically import 
                your real follower counts, views, and engagement rates. No manual entry needed!
              </p>
            </div>
          </div>
        </div>

        {/* Accounts List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-elevated p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-secondary" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-secondary rounded w-1/4" />
                    <div className="h-4 bg-secondary rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : accounts.length > 0 ? (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="card-elevated p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-3xl shrink-0">
                    {getPlatformEmoji(account.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg capitalize">
                        {account.platform}
                      </h3>
                      {account.is_primary && (
                        <span className="flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">@{account.username}</p>
                    {account.profile_url && (
                      <a
                        href={account.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Profile →
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-xl font-display font-bold">
                        {formatNumber(account.followers)}
                      </div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="text-xl font-display font-bold">
                        {formatNumber(Number(account.total_views))}
                      </div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="text-xl font-display font-bold text-green-600">
                        {account.engagement_rate}%
                      </div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!account.is_primary && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetPrimary(account.id)}
                        title="Set as primary"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(account.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-elevated p-12 text-center">
            <Link2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">No accounts connected</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Connect your social media accounts to let brands see your stats and reach
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={handlePhylloConnect} className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Zap className="w-4 h-4" />
                Auto-Connect
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Manually
              </Button>
            </div>
          </div>
        )}

        {/* Tip Card */}
        <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border">
          <h4 className="font-semibold mb-2">💡 Tip</h4>
          <p className="text-sm text-muted-foreground">
            Use Auto-Connect for accurate, verified stats that brands trust more. 
            Manually added stats can be updated anytime but may carry less weight with brands.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SocialAccounts;
