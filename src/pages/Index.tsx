import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DiscoverSection from "@/components/landing/DiscoverSection";
import TransformSection from "@/components/landing/TransformSection";
import MagicMediaSection from "@/components/landing/MagicMediaSection";
import MagicWriteSection from "@/components/landing/MagicWriteSection";
import AppsSliderSection from "@/components/landing/AppsSliderSection";
import SafetySection from "@/components/landing/SafetySection";
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
        <DiscoverSection />
        <TransformSection />
        <MagicMediaSection />
        <MagicWriteSection />
        <AppsSliderSection />
        <SafetySection />
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
