import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-violet/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container relative pt-32 md:pt-40 pb-20">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>The #1 Creator-Brand Marketplace</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Connect with{" "}
            <span className="gradient-text">Influencers</span>
            <br />
            That Drive Results
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Nexly connects brands with authentic content creators across TikTok, 
            YouTube, and Instagram. Find your perfect match and grow together.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button className="btn-gradient text-lg h-14 px-8 gap-2">
              I'm a Brand
              <ArrowRight size={20} />
            </Button>
            <Button className="btn-accent text-lg h-14 px-8 gap-2">
              I'm a Creator
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            {[
              { value: "50K+", label: "Active Creators" },
              { value: "10K+", label: "Brands" },
              { value: "1M+", label: "Collaborations" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Video / Preview */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/50">
            <div className="aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <button className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow transition-transform hover:scale-110">
                <Play size={32} className="text-white ml-1" fill="currentColor" />
              </button>
            </div>
            {/* Floating Cards */}
            <div className="absolute top-8 left-8 card-elevated p-4 animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet" />
                <div>
                  <div className="text-sm font-semibold">Sarah M.</div>
                  <div className="text-xs text-muted-foreground">2.5M Followers</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 card-elevated p-4 animate-float-delayed hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">+340%</div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
