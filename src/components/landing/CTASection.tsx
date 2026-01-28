import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero-canva" />
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-float-medium" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sparkle */}
          <div className="flex justify-center mb-6">
            <Sparkles className="w-10 h-10 text-white/80 animate-sparkle" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow-hero">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of brands and creators who trust Nexly for authentic 
            collaborations that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-white text-lg h-14 px-10 gap-2 shadow-2xl" asChild>
              <Link to="/auth">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button className="btn-outline-white text-lg h-14 px-10">
              Schedule a Demo
            </Button>
          </div>

          <p className="text-sm text-white/60 mt-8">
            No credit card required • Free plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
