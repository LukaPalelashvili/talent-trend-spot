import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Zap } from "lucide-react";
import expandHeroImage from "@/assets/expand-hero-creator.jpg";

const cards = [
  {
    id: 1,
    badge: "PRO",
    badgeIcon: Crown,
    title: "Magic Expand",
    description: "Seamlessly extend an image in any direction for the perfect shot. Fix awkward framing, save zoomed-in images, or turn a vertical shot into a horizontal one in seconds.",
    primaryButton: "Try Magic Expand",
    secondaryButton: "Learn more",
    bgColor: "bg-[#fef9c3]/95",
  },
  {
    id: 2,
    badge: "NEW",
    badgeIcon: Sparkles,
    title: "Smart Crop",
    description: "Automatically detect the best composition and crop your images to perfection. Let AI find the focal point and create stunning visuals instantly.",
    primaryButton: "Try Smart Crop",
    secondaryButton: "Learn more",
    bgColor: "bg-[#d1fae5]/95",
  },
  {
    id: 3,
    badge: "HOT",
    badgeIcon: Zap,
    title: "AI Enhance",
    description: "Transform ordinary photos into extraordinary masterpieces. Enhance lighting, colors, and details with one click using advanced AI technology.",
    primaryButton: "Try AI Enhance",
    secondaryButton: "Learn more",
    bgColor: "bg-[#e0e7ff]/95",
  },
];

const MagicExpandSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={containerRef}
      className="h-[300vh] bg-[#faf9f7] relative"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
        </div>
        
        {/* Cards container - positioned to the left to not cover face */}
        <div className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 w-[90%] max-w-md perspective-1000">
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
  // Calculate the scroll ranges for each card
  const segmentSize = 1 / totalCards;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;
  
  // Card becomes visible at its start point and exits at its end point
  const opacity = useTransform(
    scrollYProgress,
    [
      start - segmentSize * 0.3, // Fade in starts
      start,                     // Fully visible
      end - segmentSize * 0.3,   // Start fading out
      end,                       // Fully faded
    ],
    index === 0 
      ? [1, 1, 1, 0]  // First card starts visible
      : [0, 1, 1, 0]   // Other cards fade in
  );
  
  // Y position: starts below, comes to center, moves up
  const y = useTransform(
    scrollYProgress,
    [start - segmentSize * 0.3, start, end - segmentSize * 0.3, end],
    index === 0 
      ? [0, 0, -80, -150]      // First card only moves up
      : [100, 0, -80, -150]     // Other cards come from below
  );
  
  // Rotation for 3D effect
  const rotateX = useTransform(
    scrollYProgress,
    [start - segmentSize * 0.3, start, end - segmentSize * 0.3, end],
    index === 0 
      ? [0, 0, -8, -15]       // First card tilts as it exits
      : [8, 0, -8, -15]        // Other cards tilt in and out
  );
  
  // Scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [start - segmentSize * 0.3, start, end - segmentSize * 0.3, end],
    index === 0 
      ? [1, 1, 0.95, 0.9]
      : [0.9, 1, 0.95, 0.9]
  );
  
  // Z-index based on visibility
  const zIndex = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.1],
    [totalCards - index, totalCards - index + 1]
  );

  const BadgeIcon = card.badgeIcon;

  return (
    <motion.div
      style={{
        opacity,
        y,
        rotateX,
        scale,
        zIndex,
        transformStyle: "preserve-3d",
        transformOrigin: "center bottom",
      }}
      className="absolute inset-0"
    >
      <div className={`${card.bgColor} backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl`}>
        {/* Badge */}
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-900 text-white px-3 py-1 rounded-full mb-4">
          <BadgeIcon size={12} />
          {card.badge}
        </span>
        
        {/* Title */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {card.title}
        </h2>
        
        {/* Description */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
          {card.description}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 h-auto text-sm font-medium bg-white border-gray-300 hover:bg-gray-50"
          >
            {card.primaryButton}
          </Button>
          <Button
            variant="ghost"
            className="rounded-full px-6 py-2 h-auto text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            {card.secondaryButton}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MagicExpandSection;
