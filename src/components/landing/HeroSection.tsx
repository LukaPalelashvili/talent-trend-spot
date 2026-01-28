import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero-canva overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-float-medium" />
      </div>

      <div className="container relative pt-32 md:pt-40 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Sparkle icon */}
          <div className="flex justify-center mb-6 animate-slide-up">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-white animate-sparkle" strokeWidth={1.5} />
              <Sparkles className="w-6 h-6 text-white/60 absolute -top-2 -right-4 animate-sparkle" style={{ animationDelay: '0.5s' }} strokeWidth={1.5} />
              <Sparkles className="w-4 h-4 text-white/40 absolute -bottom-1 -left-3 animate-sparkle" style={{ animationDelay: '1s' }} strokeWidth={1.5} />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 animate-slide-up text-shadow-hero">
            Creator Studio
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 animate-slide-up-delayed leading-relaxed">
            All the power of influencer marketing, all in one place. Nexly brings together 
            brands and creators for authentic collaborations that drive real results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
            <Button className="btn-white text-lg h-14 px-10 gap-2 shadow-2xl" asChild>
              <Link to="/auth?type=brand">
                I'm a Brand
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button className="btn-outline-white text-lg h-14 px-10 gap-2" asChild>
              <Link to="/auth?type=creator">
                I'm a Creator
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            {[
              { value: "50K+", label: "Active Creators" },
              { value: "10K+", label: "Brand Partners" },
              { value: "1M+", label: "Collaborations" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Cards */}
        <div className="relative mt-20 h-80 md:h-96 max-w-6xl mx-auto">
          {/* Card 1 - Left */}
          <div className="absolute left-0 md:left-[5%] top-1/2 -translate-y-1/2 w-48 md:w-64 h-64 md:h-80 floating-card floating-card-1 animate-float-slow transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="p-6 h-full flex flex-col justify-end">
              <div className="w-12 h-12 rounded-full bg-white/20 mb-4" />
              <div className="h-3 bg-white/30 rounded-full w-3/4 mb-2" />
              <div className="h-2 bg-white/20 rounded-full w-1/2" />
            </div>
          </div>

          {/* Card 2 - Left-Center */}
          <div className="absolute left-[15%] md:left-[20%] top-1/3 w-44 md:w-56 h-56 md:h-72 floating-card floating-card-2 animate-float-delayed-1 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/30" />
                <div className="w-8 h-8 rounded-lg bg-white/20" />
              </div>
              <div>
                <div className="h-3 bg-white/30 rounded-full w-full mb-2" />
                <div className="h-2 bg-white/20 rounded-full w-2/3" />
              </div>
            </div>
          </div>

          {/* Card 3 - Center */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-52 md:w-72 h-64 md:h-80 floating-card floating-card-3 animate-float-medium z-10 transform hover:scale-105 transition-transform duration-500">
            <div className="p-6 h-full flex flex-col justify-center items-center">
              <div className="w-20 h-20 rounded-full bg-white/30 mb-4" />
              <div className="h-3 bg-white/40 rounded-full w-3/4 mb-2" />
              <div className="h-2 bg-white/30 rounded-full w-1/2 mb-4" />
              <div className="flex gap-2">
                <div className="w-16 h-6 rounded-full bg-white/30" />
                <div className="w-16 h-6 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* Card 4 - Right-Center */}
          <div className="absolute right-[15%] md:right-[20%] top-1/3 w-44 md:w-56 h-56 md:h-72 floating-card floating-card-4 animate-float-delayed-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="p-6 h-full flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/30" />
                <div className="flex-1">
                  <div className="h-2 bg-white/30 rounded-full w-full mb-1" />
                  <div className="h-2 bg-white/20 rounded-full w-2/3" />
                </div>
              </div>
              <div className="h-20 bg-white/20 rounded-xl" />
            </div>
          </div>

          {/* Card 5 - Right */}
          <div className="absolute right-0 md:right-[5%] top-1/2 -translate-y-1/2 w-48 md:w-64 h-64 md:h-80 floating-card floating-card-5 animate-float-delayed-3 transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="p-6 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30" />
                </div>
              </div>
              <div className="h-3 bg-white/30 rounded-full w-full mb-2" />
              <div className="h-2 bg-white/20 rounded-full w-3/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
