import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroCreator from "@/assets/hero-creator.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero-canva overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative pt-28 md:pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-left"
          >
            {/* Trust badges */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">50K+</span> creators
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
              The Premier Marketplace Connecting{" "}
              <span className="gradient-text">Brands</span> with Top-Tier{" "}
              <span className="gradient-text">Creators</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed font-normal">
              Streamline your influencer marketing. Discover verified talent, manage campaigns, 
              and ensure secure payments—all in one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
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

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-lg">✋</span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span>5min set-up</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative lg:pl-8"
          >
            <div className="relative">
              {/* Main hero image */}
              <img
                src={heroCreator}
                alt="Creator using Nexly platform with social media analytics"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl p-4 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white text-lg">📈</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">98%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating partnerships card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-4 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <span className="text-white text-lg">🤝</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">1M+</div>
                    <div className="text-xs text-muted-foreground">Collaborations</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient fade to white at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
