import { Search, MessageSquare, Handshake, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse thousands of verified creators or let brands find you with smart matching.",
    color: "primary",
  },
  {
    icon: MessageSquare,
    title: "Connect",
    description: "Message directly, discuss campaign details, and negotiate terms in-platform.",
    color: "accent",
  },
  {
    icon: Handshake,
    title: "Collaborate",
    description: "Manage projects, share content drafts, and track deliverables seamlessly.",
    color: "teal",
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    description: "Track campaign performance with real-time analytics and build lasting partnerships.",
    color: "violet",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            From Discovery to Success
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a brand looking for influencers or a creator seeking opportunities, 
            our platform makes collaboration effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              <div className="card-interactive p-6 h-full relative z-10">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`feature-icon-${step.color} mb-5`}>
                  <step.icon size={28} />
                </div>
                
                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
