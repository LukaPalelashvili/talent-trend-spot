import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero-canva overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative pt-32 md:pt-40 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Sparkle icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-primary" strokeWidth={1.5} />
              <Sparkles className="w-6 h-6 text-primary/60 absolute -top-2 -right-4" strokeWidth={1.5} />
              <Sparkles className="w-4 h-4 text-primary/40 absolute -bottom-1 -left-3" strokeWidth={1.5} />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold text-foreground leading-[1.05] mb-8 tracking-tight">
            Creator Studio
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
            All the power of influencer marketing, all in one place. Nexly brings together 
            brands and creators for authentic collaborations that drive real results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button className="btn-gradient text-lg h-14 px-10 gap-2 shadow-2xl" asChild>
              <Link to="/auth?type=brand">
                I'm a Brand
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button variant="outline" className="text-lg h-14 px-10 gap-2 border-primary/30 hover:bg-primary/5" asChild>
              <Link to="/auth?type=creator">
                I'm a Creator
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "50K+", label: "Active Creators" },
              { value: "10K+", label: "Brand Partners" },
              { value: "1M+", label: "Collaborations" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-normal">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fade to white at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
