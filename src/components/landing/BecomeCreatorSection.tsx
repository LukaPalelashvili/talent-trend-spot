import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const benefits = [
  "Free to join, no hidden fees",
  "Keep 100% of your earnings",
  "Connect with verified brands",
  "Professional analytics dashboard",
  "Secure payment processing",
  "24/7 creator support",
];

const BecomeCreatorSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-gradient" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="badge-new mb-6 inline-block">Join Today</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Start Your Creator{" "}
              <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether you have 1,000 followers or 10 million, there's a place for you on Nexly. 
              Join our community of creators and start earning from your influence.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full gradient-hero-canva flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <Button className="btn-gradient text-lg h-14 px-10 gap-2 rounded-full" asChild>
              <Link to="/auth?type=creator">
                Apply as Creator
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-muted-foreground text-sm">Active Creators</div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold gradient-text mb-2">$10M+</div>
                  <div className="text-muted-foreground text-sm">Paid to Creators</div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
                  <div className="text-muted-foreground text-sm">Brand Partners</div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold gradient-text mb-2">98%</div>
                  <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full gradient-hero-canva text-white text-sm font-bold shadow-xl animate-float-slow">
              🚀 Join Now
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeCreatorSection;
