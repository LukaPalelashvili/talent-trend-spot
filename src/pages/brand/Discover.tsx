import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Heart, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Creator {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  niche: string | null;
  total_followers: number;
  avg_engagement_rate: number;
  primary_platform: string | null;
  location: string | null;
  languages: string[];
}

const platforms = [
  { value: "all", label: "All Platforms" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "twitch", label: "Twitch" },
];

const niches = [
  "All Niches", "Lifestyle", "Tech Reviews", "Gaming", "Beauty & Makeup",
  "Fashion", "Fitness", "Food & Cooking", "Travel", "Comedy", "Education", "Music"
];

const followerRanges = [
  { value: "all", label: "Any Followers" },
  { value: "nano", label: "1K - 10K (Nano)" },
  { value: "micro", label: "10K - 100K (Micro)" },
  { value: "mid", label: "100K - 500K (Mid)" },
  { value: "macro", label: "500K - 1M (Macro)" },
  { value: "mega", label: "1M+ (Mega)" },
];

const Discover = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [platform, setPlatform] = useState("all");
  const [niche, setNiche] = useState("All Niches");
  const [followerRange, setFollowerRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCreators();
    fetchSavedProfiles();
  }, [platform, niche, followerRange]);

  const fetchCreators = async () => {
    setLoading(true);
    let query = supabase
      .from("profiles")
      .select("*")
      .eq("user_type", "creator");

    if (platform !== "all") {
      query = query.eq("primary_platform", platform as "youtube" | "tiktok" | "instagram" | "twitter" | "twitch" | "linkedin");
    }

    if (niche !== "All Niches") {
      query = query.eq("niche", niche);
    }

    // Follower range filtering
    if (followerRange !== "all") {
      const ranges: Record<string, [number, number]> = {
        nano: [1000, 10000],
        micro: [10000, 100000],
        mid: [100000, 500000],
        macro: [500000, 1000000],
        mega: [1000000, 100000000],
      };
      const [min, max] = ranges[followerRange] || [0, 100000000];
      query = query.gte("total_followers", min).lte("total_followers", max);
    }

    const { data } = await query.order("total_followers", { ascending: false }).limit(50);
    setCreators(data || []);
    setLoading(false);
  };

  const fetchSavedProfiles = async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("saved_profiles")
      .select("saved_profile_id")
      .eq("user_profile_id", profile.id);

    if (data) {
      setSavedIds(new Set(data.map((s) => s.saved_profile_id)));
    }
  };

  const toggleSave = async (creatorId: string) => {
    if (!profile) return;

    if (savedIds.has(creatorId)) {
      await supabase
        .from("saved_profiles")
        .delete()
        .eq("user_profile_id", profile.id)
        .eq("saved_profile_id", creatorId);

      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(creatorId);
        return next;
      });
      toast({ title: "Removed from saved" });
    } else {
      await supabase.from("saved_profiles").insert({
        user_profile_id: profile.id,
        saved_profile_id: creatorId,
      });

      setSavedIds((prev) => new Set(prev).add(creatorId));
      toast({ title: "Saved to favorites!" });
    }
  };

  const filteredCreators = creators.filter((c) =>
    searchQuery
      ? c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.niche?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const platformEmoji: Record<string, string> = {
    youtube: "▶️",
    tiktok: "📱",
    instagram: "📷",
    twitter: "🐦",
    twitch: "🎮",
    linkedin: "💼",
  };

  const activeFilters = [
    platform !== "all" && platforms.find((p) => p.value === platform)?.label,
    niche !== "All Niches" && niche,
    followerRange !== "all" && followerRanges.find((f) => f.value === followerRange)?.label,
  ].filter(Boolean);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold mb-2">Discover Creators</h1>
          <p className="text-muted-foreground">
            Find the perfect influencers for your brand
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or niche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="card-elevated p-4 grid sm:grid-cols-3 gap-4 animate-fade-in">
              <div>
                <label className="text-sm font-medium mb-2 block">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Niche</label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((n) => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Followers</label>
                <Select value={followerRange} onValueChange={setFollowerRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {followerRanges.map((f) => (
                      <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, i) => (
                <Badge key={i} variant="secondary" className="gap-1">
                  {filter}
                  <button
                    onClick={() => {
                      if (filter === platforms.find((p) => p.value === platform)?.label) setPlatform("all");
                      if (filter === niche) setNiche("All Niches");
                      if (filter === followerRanges.find((f) => f.value === followerRange)?.label) setFollowerRange("all");
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              <button
                onClick={() => {
                  setPlatform("all");
                  setNiche("All Niches");
                  setFollowerRange("all");
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-elevated p-4 animate-pulse">
                <div className="flex gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-secondary" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                </div>
                <div className="h-12 bg-secondary rounded" />
              </div>
            ))}
          </div>
        ) : filteredCreators.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCreators.map((creator) => (
              <div key={creator.id} className="card-interactive p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-2xl shrink-0">
                    {creator.avatar_url ? (
                      <img
                        src={creator.avatar_url}
                        alt={creator.full_name || ""}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      "👤"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold truncate">
                      {creator.full_name || "Creator"}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {creator.niche || "Content Creator"}
                    </div>
                    {creator.location && (
                      <div className="text-xs text-muted-foreground">📍 {creator.location}</div>
                    )}
                  </div>
                </div>

                {creator.bio && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {creator.bio}
                  </p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <span>{creator.primary_platform ? platformEmoji[creator.primary_platform] : "📱"}</span>
                    <span className="font-semibold">{formatFollowers(creator.total_followers)}</span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    {creator.avg_engagement_rate}% ER
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to={`/profile/${creator.id}`}>View Profile</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSave(creator.id)}
                    className={savedIds.has(creator.id) ? "text-red-500" : ""}
                  >
                    <Heart className={`w-4 h-4 ${savedIds.has(creator.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/messages?to=${creator.id}`}>
                      <MessageSquare className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-elevated p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">No creators found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Discover;
