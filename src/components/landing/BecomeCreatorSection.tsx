import { Lightbulb, BookOpen, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: Lightbulb,
    title: "Getting Started Guide",
    description: "Everything you need to know to begin your creator journey.",
  },
  {
    icon: BookOpen,
    title: "Content Creation Tips",
    description: "Learn techniques from top creators to grow your audience.",
  },
  {
    icon: TrendingUp,
    title: "Monetization Strategies",
    description: "Multiple ways to turn your influence into sustainable income.",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Connect with mentors and fellow creators for support.",
  },
];

const BecomeCreatorSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Header */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            🚀 Launch Your Career
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Become a Content Creator?
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Whether you're just starting out or looking to level up, we've got 
            resources and a supportive community to help you succeed.
          </p>

          {/* Resources */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {resources.map((resource, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left hover:bg-white/15 transition-all duration-300 border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <resource.icon size={24} />
                </div>
                <h3 className="font-display font-bold mb-2">{resource.title}</h3>
                <p className="text-white/70 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold text-lg h-14 px-10 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Start Your Creator Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BecomeCreatorSection;
