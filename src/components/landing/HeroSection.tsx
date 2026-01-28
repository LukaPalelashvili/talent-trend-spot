import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParallaxElement } from "@/components/animations/ParallaxSection";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={sectionRef} className="relative min-h-screen gradient-hero-canva overflow-hidden">
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxElement speed={0.3} direction="down">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        </ParallaxElement>
        <ParallaxElement speed={0.5} direction="up">
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down">
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </ParallaxElement>
      </div>

      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="container relative pt-32 md:pt-40 pb-32"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Sparkle icon */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Sparkles className="w-12 h-12 text-primary animate-sparkle" strokeWidth={1.5} />
              <Sparkles className="w-6 h-6 text-primary/60 absolute -top-2 -right-4 animate-sparkle" style={{ animationDelay: '0.5s' }} strokeWidth={1.5} />
              <Sparkles className="w-4 h-4 text-primary/40 absolute -bottom-1 -left-3 animate-sparkle" style={{ animationDelay: '1s' }} strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold text-foreground leading-[1.05] mb-8 tracking-tight"
          >
            Creator Studio
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-normal"
          >
            All the power of influencer marketing, all in one place. Nexly brings together 
            brands and creators for authentic collaborations that drive real results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
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
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "50K+", label: "Active Creators" },
              { value: "10K+", label: "Brand Partners" },
              { value: "1M+", label: "Collaborations" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-normal">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Cards with Parallax */}
        <div className="relative mt-20 h-80 md:h-96 max-w-6xl mx-auto">
          {/* Card 1 - Left */}
          <ParallaxElement speed={0.6} direction="up" className="absolute left-0 md:left-[5%] top-1/2 -translate-y-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="w-48 md:w-64 h-64 md:h-80 floating-card floating-card-1 transition-transform duration-500"
            >
              <div className="p-6 h-full flex flex-col justify-end">
                <div className="w-12 h-12 rounded-full bg-white/20 mb-4" />
                <div className="h-3 bg-white/30 rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-white/20 rounded-full w-1/2" />
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Card 2 - Left-Center */}
          <ParallaxElement speed={0.4} direction="down" className="absolute left-[15%] md:left-[20%] top-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="w-44 md:w-56 h-56 md:h-72 floating-card floating-card-2 transform rotate-3 transition-transform duration-500"
            >
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
            </motion.div>
          </ParallaxElement>

          {/* Card 3 - Center */}
          <ParallaxElement speed={0.2} direction="up" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.08 }}
              className="w-52 md:w-72 h-64 md:h-80 floating-card floating-card-3 transition-transform duration-500"
            >
              <div className="p-6 h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 rounded-full bg-white/30 mb-4" />
                <div className="h-3 bg-white/40 rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-white/30 rounded-full w-1/2 mb-4" />
                <div className="flex gap-2">
                  <div className="w-16 h-6 rounded-full bg-white/30" />
                  <div className="w-16 h-6 rounded-full bg-white/20" />
                </div>
              </div>
            </motion.div>
          </ParallaxElement>

          {/* Card 4 - Right-Center */}
          <ParallaxElement speed={0.5} direction="down" className="absolute right-[15%] md:right-[20%] top-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="w-44 md:w-56 h-56 md:h-72 floating-card floating-card-4 transform -rotate-3 transition-transform duration-500"
            >
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
            </motion.div>
          </ParallaxElement>

          {/* Card 5 - Right */}
          <ParallaxElement speed={0.7} direction="up" className="absolute right-0 md:right-[5%] top-1/2 -translate-y-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 6 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="w-48 md:w-64 h-64 md:h-80 floating-card floating-card-5 transition-transform duration-500"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/30" />
                  </div>
                </div>
                <div className="h-3 bg-white/30 rounded-full w-full mb-2" />
                <div className="h-2 bg-white/20 rounded-full w-3/4" />
              </div>
            </motion.div>
          </ParallaxElement>
        </div>
      </motion.div>

      {/* Gradient fade to white at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
