import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Zap, ChevronDown } from "lucide-react";
import expandHeroImage from "@/assets/expand-hero-creator.jpg";

const cards = [
  {
    id: 1,
    badge: "PRO",
    badgeIcon: Crown,
    title: "Magic Expand",
    description: "Seamlessly extend an image in any direction for the perfect shot. Fix awkward framing in seconds.",
    primaryButton: "Try Magic Expand",
    bgColor: "bg-[#fef9c3]/95",
  },
  {
    id: 2,
    badge: "NEW",
    badgeIcon: Sparkles,
    title: "Smart Crop",
    description: "Automatically detect the best composition and crop your images to perfection instantly.",
    primaryButton: "Try Smart Crop",
    bgColor: "bg-[#d1fae5]/95",
  },
  {
    id: 3,
    badge: "HOT",
    badgeIcon: Zap,
    title: "AI Enhance",
    description: "Transform ordinary photos into extraordinary masterpieces with one click.",
    primaryButton: "Try AI Enhance",
    bgColor: "bg-[#e0e7ff]/95",
  },
];

const MagicExpandSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll indicator fades out as user starts scrolling
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="h-[200vh] bg-[#faf9f7] relative"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={expandHeroImage}
            alt="Creator with phone"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        </div>
        
        {/* Cards container - bottom half, 60% width */}
        <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] h-[200px] md:h-[220px]">
          {cards.map((card, index) => (
            <CardItem 
              key={card.id} 
              card={card} 
              index={index} 
              scrollYProgress={scrollYProgress}
              totalCards={cards.length}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/80 text-sm font-medium tracking-wide">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-white/80" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface CardItemProps {
  card: typeof cards[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalCards: number;
}

const CardItem = ({ card, index, scrollYProgress, totalCards }: CardItemProps) => {
  // Faster transitions with tighter ranges
  const segmentSize = 1 / totalCards;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = (index + 1) * segmentSize;
  
  // Snappy opacity transitions
  const opacity = useTransform(
    scrollYProgress,
    index === 0 
      ? [0, mid, end]
      : [start, start + segmentSize * 0.15, mid, end],
    index === 0 
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );
  
  // Quick Y movement
  const y = useTransform(
    scrollYProgress,
    index === 0 
      ? [0, mid, end]
      : [start, start + segmentSize * 0.15, mid, end],
    index === 0 
      ? [0, 0, -100]
      : [60, 0, 0, -100]
  );
  
  // Subtle rotation
  const rotateX = useTransform(
    scrollYProgress,
    index === 0 
      ? [0, mid, end]
      : [start, start + segmentSize * 0.15, mid, end],
    index === 0 
      ? [0, 0, -6]
      : [6, 0, 0, -6]
  );
  
  // Scale for depth
  const scale = useTransform(
    scrollYProgress,
    index === 0 
      ? [0, mid, end]
      : [start, start + segmentSize * 0.15, mid, end],
    index === 0 
      ? [1, 1, 0.92]
      : [0.92, 1, 1, 0.92]
  );

  const BadgeIcon = card.badgeIcon;

  return (
    <motion.div
      style={{
        opacity,
        y,
        rotateX,
        scale,
        transformStyle: "preserve-3d",
        transformOrigin: "center bottom",
        zIndex: totalCards - index,
      }}
      className="absolute inset-0"
    >
      <div className={`${card.bgColor} backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-2xl h-full flex flex-col`}>
        <div className="flex items-center gap-3 mb-2">
          {/* Badge */}
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-900 text-white px-3 py-1 rounded-full">
            <BadgeIcon size={12} />
            {card.badge}
          </span>
          {/* Title */}
          <h2 className="font-display text-lg md:text-xl font-bold text-gray-900">
            {card.title}
          </h2>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
          {card.description}
        </p>
        
        {/* Button */}
        <Button
          variant="outline"
          className="rounded-full px-5 py-2 h-auto text-sm font-medium bg-white border-gray-300 hover:bg-gray-50 w-fit"
        >
          {card.primaryButton}
        </Button>
      </div>
    </motion.div>
  );
};

export default MagicExpandSection;
