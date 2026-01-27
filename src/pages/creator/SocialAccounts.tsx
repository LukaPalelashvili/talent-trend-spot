import { useState, useEffect } from "react";
import { Plus, Link2, Trash2, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !newPlatform || !newUsername) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("social_accounts").insert({
        profile_id: profile.id,
        platform: newPlatform as "youtube" | "tiktok" | "instagram" | "twitter" | "twitch" | "linkedin",
        username: newUsername,
        profile_url: newProfileUrl || null,
        followers: parseInt(newFollowers) || 0,
        total_views: parseInt(newViews) || 0,
        engagement_rate: parseFloat(newEngagement) || 0,
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

    // Remove primary from all
    await supabase
      .from("social_accounts")
      .update({ is_primary: false })
      .eq("profile_id", profile.id);

    // Set new primary
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
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Social Accounts</h1>
            <p className="text-muted-foreground">
              Connect your social media accounts to showcase your stats
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-accent gap-2" disabled={availablePlatforms.length === 0}>
                <Plus className="w-4 h-4" />
                Add Account
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
            <Button onClick={() => setDialogOpen(true)} className="btn-accent gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Account
            </Button>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border">
          <h4 className="font-semibold mb-2">💡 Tip</h4>
          <p className="text-sm text-muted-foreground">
            Keep your stats up to date! Brands are more likely to reach out when they can see 
            accurate follower counts and engagement rates. Set your most active platform as primary.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialAccounts;
