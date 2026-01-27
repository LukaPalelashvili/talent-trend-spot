import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ForBrandsSection from "@/components/landing/ForBrandsSection";
import ForCreatorsSection from "@/components/landing/ForCreatorsSection";
import BecomeCreatorSection from "@/components/landing/BecomeCreatorSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PlatformsSection />
        <HowItWorksSection />
        <ForBrandsSection />
        <ForCreatorsSection />
        <BecomeCreatorSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
