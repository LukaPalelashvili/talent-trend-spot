import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

type TabType = "brand-voice" | "summarize" | "fun" | "formal";

const tabs: { id: TabType; label: string }[] = [
  { id: "brand-voice", label: "Brand voice" },
  { id: "summarize", label: "Summarize" },
  { id: "fun", label: "Fun" },
  { id: "formal", label: "Formal" },
];

const tabContent: Record<TabType, { title: string; description: string }> = {
  "brand-voice": {
    title: "Magic Write™",
    description: "Get your message across with words that sound just like you. Upload a sample, and Magic Write will generate text in your unique tone. Spend less time editing and more time communicating effectively.",
  },
  "summarize": {
    title: "Smart Summarize",
    description: "Transform lengthy content into concise, impactful summaries. Our AI understands context and preserves key messages while cutting the fluff. Perfect for busy professionals.",
  },
  "fun": {
    title: "Fun Mode",
    description: "Add personality and flair to your content. Make your messages more engaging with playful language, emojis, and creative expressions that resonate with your audience.",
  },
  "formal": {
    title: "Professional Tone",
    description: "Elevate your business communications with polished, professional language. Perfect for proposals, reports, and executive summaries that demand respect.",
  },
};

const previewContent: Record<TabType, { heading: string; text: string }> = {
  "brand-voice": {
    heading: "Brand Voice",
    text: "Welcome to Co. — where creativity meets strategy. We're a team of creative professionals who specialize in crafting innovative marketing solutions. Whether you're a small start-up or a large business, we're here to help you achieve your goals.",
  },
  "summarize": {
    heading: "Summary",
    text: "Key Points: Our platform streamlines influencer marketing by connecting brands with creators. Features include AI matching, analytics, and direct messaging. Results show 3x faster campaign launches and 40% higher engagement rates.",
  },
  "fun": {
    heading: "Fun Version",
    text: "Hey there! 🎉 Ready to level up your marketing game? We're the creative crew that makes brand magic happen! ✨ Big or small, we've got your back. Let's create something awesome together! 🚀",
  },
  "formal": {
    heading: "Executive Summary",
    text: "We are pleased to present our comprehensive suite of marketing solutions. Our organization specializes in developing strategic partnerships between established brands and content creators, facilitating mutually beneficial collaborations.",
  },
};

const MagicWriteSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("brand-voice");

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        {/* Section Header */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-16 md:mb-20">
          Make words come easily
        </h2>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 overflow-hidden bg-gradient-to-br from-[#f0f7ff] to-[#e8f4ff]">
          <div className="grid md:grid-cols-2 min-h-[500px]">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12 flex flex-col">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-sm border-b-2 border-[#7c3aed]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area with fixed height to prevent jumping */}
              <div className="flex-1 flex flex-col min-h-[280px]">
                {/* PRO Badge */}
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-900 text-white px-3 py-1 rounded-full w-fit mb-4">
                  <Crown size={12} />
                  PRO
                </span>

                {/* Title */}
                <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {tabContent[activeTab].title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  {tabContent[activeTab].description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 py-2 h-auto text-sm font-medium bg-white border-gray-300 hover:bg-gray-50"
                  >
                    Try Magic Write
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-full px-6 py-2 h-auto text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Preview Card */}
            <div className="p-8 md:p-12 flex items-center justify-center">
              <div className="w-full max-w-md relative">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00c9c9] via-[#5ee7df] to-[#b5f5ec] rounded-3xl transform rotate-1 scale-105 opacity-80" />
                
                {/* Preview Card */}
                <div 
                  className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-300"
                >
                  <h4 className="font-semibold text-xl text-gray-900 mb-4">
                    {previewContent[activeTab].heading}
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {previewContent[activeTab].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicWriteSection;
