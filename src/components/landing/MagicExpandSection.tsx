import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import expandHeroImage from "@/assets/expand-hero-image.jpg";

const MagicExpandSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.6, 0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3, 0.5], [48, 24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="min-h-[200vh] bg-[#faf9f7] relative"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated image container */}
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
          }}
          className="relative w-full h-full origin-center overflow-hidden"
        >
          {/* Background image */}
          <img
            src={expandHeroImage}
            alt="Creator with phone"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          
          {/* Content card overlay */}
          <motion.div 
            className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-md"
            style={{ opacity }}
          >
            <div className="bg-[#fef9c3]/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              {/* PRO Badge */}
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-900 text-white px-3 py-1 rounded-full mb-4">
                <Crown size={12} />
                PRO
              </span>
              
              {/* Title */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Magic Expand
              </h2>
              
              {/* Description */}
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                Seamlessly extend an image in any direction for the perfect shot. Fix awkward framing, save zoomed-in images, or turn a vertical shot into a horizontal one in seconds.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-2 h-auto text-sm font-medium bg-white border-gray-300 hover:bg-gray-50"
                >
                  Try Magic Expand
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full px-6 py-2 h-auto text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Corner decorations to show the "expanding" effect */}
          <motion.div 
            className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-purple-400 rounded-tl-lg"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5], [1, 0.5]),
            }}
          />
          <motion.div 
            className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-purple-400 rounded-tr-lg"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5], [1, 0.5]),
            }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-purple-400 rounded-bl-lg"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5], [1, 0.5]),
            }}
          />
          <motion.div 
            className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-purple-400 rounded-br-lg"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5], [1, 0.5]),
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MagicExpandSection;
