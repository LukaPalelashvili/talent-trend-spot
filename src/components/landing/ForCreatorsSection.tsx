import { 
  DollarSign, 
  LineChart, 
  Link2, 
  Bell, 
  Users2, 
  Award 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: DollarSign,
    title: "Set Your Rates",
    description: "You're in control. Define your pricing and terms for each collaboration.",
  },
  {
    icon: LineChart,
    title: "Showcase Analytics",
    description: "Import your real stats to prove your value and attract premium brands.",
  },
  {
    icon: Link2,
    title: "Multi-Platform Profile",
    description: "Connect all your social accounts in one professional portfolio.",
  },
  {
    icon: Bell,
    title: "Opportunity Alerts",
    description: "Get notified when brands matching your niche are looking for creators.",
  },
  {
    icon: Users2,
    title: "Creator Community",
    description: "Join groups, share tips, and network with fellow content creators.",
  },
  {
    icon: Award,
    title: "Build Your Reputation",
    description: "Earn badges and reviews that boost your credibility with brands.",
  },
];

const ForCreatorsSection = () => {
  return (
    <section id="for-creators" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-elevated p-5 hover:border-accent/30 transition-all duration-300"
              >
                <div className="feature-icon-accent mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              For Creators
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Turn Your Passion Into{" "}
              <span className="text-accent">Income</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of creators who've found their dream brand partnerships 
              through Nexly. Your content deserves to be seen—and paid for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-accent">
                Join as Creator
              </Button>
              <Button variant="outline" className="btn-outline-subtle">
                View Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCreatorsSection;
