import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Globe, Maximize2, RefreshCw } from "lucide-react";

interface TabContent {
  id: string;
  label: string;
  title: string;
  description: string;
  ctaText: string;
  isPro?: boolean;
}

const tabs: TabContent[] = [
  {
    id: "transform",
    label: "Transform",
    title: "Campaign Optimizer™",
    description:
      "Swap formats, platforms, and dimensions in a snap. Transform your content for different social media channels, instantly reformat any campaign for multiple platforms, or auto-optimize them without leaving the page.",
    ctaText: "Try Campaign Optimizer",
    isPro: true,
  },
  {
    id: "translate",
    label: "Translate",
    title: "Global Reach™",
    description:
      "Translate your campaigns to reach global audiences. Our AI-powered translation ensures your message resonates across cultures while maintaining brand voice and authenticity.",
    ctaText: "Try Global Reach",
    isPro: true,
  },
  {
    id: "reformat",
    label: "Reformat",
    title: "Smart Resize™",
    description:
      "Automatically resize and reformat your content for any platform. From Instagram Stories to YouTube thumbnails, create perfectly optimized content in seconds.",
    ctaText: "Try Smart Resize",
    isPro: false,
  },
];

const TransformVisual = () => (
  <>
    {/* Document Preview */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[320px]">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-4 mb-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-xs font-bold">
            co
          </div>
          <div>
            <p className="text-white font-bold text-lg">Sales Report</p>
          </div>
          <div className="ml-auto w-12 h-8 rounded bg-white/20" />
        </div>
      </div>

      {/* Document Body */}
      <div className="bg-white rounded-xl p-6 shadow-xl space-y-3">
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 rounded-full w-5/6" />
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 rounded-full w-4/5" />
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 rounded-full w-3/4" />
        <div className="pt-2">
          <div className="h-2.5 bg-gray-200 rounded-full w-1/3" />
        </div>
      </div>
    </div>
  </>
);

const TranslateVisual = () => (
  <>
    {/* Globe and Language Cards */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[340px]">
      {/* Central Globe */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-xl">
          <Globe size={48} className="text-white" strokeWidth={1.5} />
        </div>
      </div>

      {/* Language Cards */}
      <div className="flex gap-3 justify-center">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-xs text-gray-500 mb-1">English</p>
          <p className="font-medium text-gray-900">Hello World</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-xs text-gray-500 mb-1">Spanish</p>
          <p className="font-medium text-gray-900">Hola Mundo</p>
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-3">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-xs text-gray-500 mb-1">French</p>
          <p className="font-medium text-gray-900">Bonjour le monde</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-xs text-gray-500 mb-1">German</p>
          <p className="font-medium text-gray-900">Hallo Welt</p>
        </div>
      </div>
    </div>
  </>
);

const ReformatVisual = () => (
  <>
    {/* Multiple Format Cards */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[360px]">
      <div className="flex items-center justify-center gap-4">
        {/* Square - Instagram */}
        <div className="bg-white rounded-xl p-3 shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-400 rounded-lg flex items-center justify-center">
            <Maximize2 size={24} className="text-white" />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">1:1</p>
        </div>

        {/* Arrow */}
        <RefreshCw size={24} className="text-white/60" />

        {/* Vertical - Stories */}
        <div className="bg-white rounded-xl p-3 shadow-lg">
          <div className="w-14 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Maximize2 size={20} className="text-white" />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">9:16</p>
        </div>

        {/* Arrow */}
        <RefreshCw size={24} className="text-white/60" />

        {/* Horizontal - YouTube */}
        <div className="bg-white rounded-xl p-3 shadow-lg">
          <div className="w-28 h-16 bg-gradient-to-br from-red-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Maximize2 size={20} className="text-white" />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">16:9</p>
        </div>
      </div>
    </div>
  </>
);

const TransformSection = () => {
  const [activeTab, setActiveTab] = useState("transform");
  const activeContent = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const renderVisual = () => {
    switch (activeTab) {
      case "translate":
        return <TranslateVisual />;
      case "reformat":
        return <ReformatVisual />;
      default:
        return <TransformVisual />;
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        {/* Section Header */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-16 md:mb-20">
          Transform your content
        </h2>

        {/* Main Card */}
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[500px] md:min-h-[520px]">
          {/* Left Side - Light Purple */}
          <div className="bg-[#ede9fe] p-8 md:p-12 flex-1 flex flex-col">
            {/* Tabs */}
            <div className="flex gap-6 mb-8 border-b border-gray-300/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
              ))}
            </div>

            {/* Content - Fixed Height Container */}
            <div className="flex-1 flex flex-col justify-center min-h-[280px]">
              <div className="space-y-4">
                {/* PRO Badge */}
                <div className="h-7">
                  {activeContent.isPro && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-900 text-white px-3 py-1 rounded-full">
                      <Crown size={12} />
                      PRO
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                  {activeContent.title}
                </h3>

                {/* Description - Fixed Height */}
                <p className="text-gray-600 text-base leading-relaxed max-w-md min-h-[96px]">
                  {activeContent.description}
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 py-2 h-auto text-sm font-medium bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    {activeContent.ctaText}
                  </Button>
                  <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Deep Purple */}
          <div className="bg-[#7c3aed] p-8 md:p-12 flex-1 relative overflow-hidden min-h-[400px] md:min-h-[520px]">
            {/* Sparkles decoration */}
            <Sparkles
              size={16}
              className="absolute top-8 left-8 text-white/40"
              strokeWidth={2}
            />
            <Sparkles
              size={12}
              className="absolute top-1/3 left-12 text-white/30"
              strokeWidth={2}
            />
            <Sparkles
              size={14}
              className="absolute bottom-1/3 left-16 text-white/40"
              strokeWidth={2}
            />
            <Sparkles
              size={16}
              className="absolute top-1/4 right-1/4 text-white/40"
              strokeWidth={2}
            />
            <Sparkles
              size={12}
              className="absolute top-1/2 right-8 text-white/30"
              strokeWidth={2}
            />
            <Sparkles
              size={14}
              className="absolute bottom-1/4 right-1/3 text-white/40"
              strokeWidth={2}
            />
            <Sparkles
              size={10}
              className="absolute bottom-12 left-1/2 text-white/30"
              strokeWidth={2}
            />

            {/* Dynamic Visual */}
            <div className="transition-opacity duration-300">
              {renderVisual()}
            </div>

            {/* Pause Button */}
            <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gray-900/50 flex items-center justify-center text-white hover:bg-gray-900/70 transition-colors">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-full" />
                <div className="w-1 h-4 bg-white rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;
