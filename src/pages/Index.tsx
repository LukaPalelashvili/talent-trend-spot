import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import VideoShowcaseSection from "@/components/landing/VideoShowcaseSection";
import MarketplaceFeaturesSection from "@/components/landing/MarketplaceFeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DiscoverSection from "@/components/landing/DiscoverSection";
import AppsSliderSection from "@/components/landing/AppsSliderSection";
import SafetySection from "@/components/landing/SafetySection";
import WhatWeDoSection from "@/components/landing/WhatWeDoSection";
import FAQSection from "@/components/landing/FAQSection";
import ForBrandsSection from "@/components/landing/ForBrandsSection";
import ForCreatorsSection from "@/components/landing/ForCreatorsSection";
import BecomeCreatorSection from "@/components/landing/BecomeCreatorSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <VideoShowcaseSection />
        <HowItWorksSection />
        <DiscoverSection />
        <AppsSliderSection />
        <SafetySection />
        <WhatWeDoSection />
        <FAQSection />
        <ForBrandsSection />
        <ForCreatorsSection />
        <BecomeCreatorSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
