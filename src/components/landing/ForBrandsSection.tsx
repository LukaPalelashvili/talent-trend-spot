import { 
  Users, 
  Filter, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Users,
    title: "50,000+ Verified Creators",
    description: "Access a curated network of authentic influencers across all major platforms.",
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description: "Find the perfect match with filters for niche, engagement rate, demographics, and more.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track campaign performance with detailed metrics and ROI analysis.",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "AI-powered detection to ensure authentic engagement and follower counts.",
  },
  {
    icon: Zap,
    title: "Smart Matching",
    description: "Let our algorithm suggest the best creators based on your goals and budget.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with creators worldwide to expand your brand's international presence.",
  },
];

const ForBrandsSection = () => {
  return (
    <section id="for-brands" className="py-24 md:py-32 gradient-hero">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              For Brands
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Find Your Perfect{" "}
              <span className="gradient-text">Creator Match</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Stop scrolling through endless profiles. Nexly's intelligent platform 
              helps you discover influencers who align with your brand values and 
              deliver real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-gradient">
                Start Finding Creators
              </Button>
              <Button variant="outline" className="btn-outline-subtle">
                See How It Works
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-elevated p-5 hover:border-primary/30 transition-all duration-300"
              >
                <div className="feature-icon-primary mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBrandsSection;
