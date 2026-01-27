import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your{" "}
            <span className="gradient-text">Marketing Strategy?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of brands and creators who trust Nexly for authentic 
            collaborations that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-gradient text-lg h-14 px-8 gap-2">
              Get Started Free
              <ArrowRight size={20} />
            </Button>
            <Button variant="outline" className="btn-outline-subtle text-lg h-14 px-8">
              Schedule a Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
