import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";

import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DiscoverSection from "@/components/landing/DiscoverSection";
import TransformSection from "@/components/landing/TransformSection";
import MagicMediaSection from "@/components/landing/MagicMediaSection";
import MagicWriteSection from "@/components/landing/MagicWriteSection";
import AppsSliderSection from "@/components/landing/AppsSliderSection";
import SafetySection from "@/components/landing/SafetySection";
import WhatWeDoSection from "@/components/landing/WhatWeDoSection";

import PricingSection from "@/components/landing/PricingSection";
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
        
        <HowItWorksSection />
        <DiscoverSection />
        <TransformSection />
        <MagicMediaSection />
        <MagicWriteSection />
        <AppsSliderSection />
        <SafetySection />
        <WhatWeDoSection />
        
        <PricingSection />
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
