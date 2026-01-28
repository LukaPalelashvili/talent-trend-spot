import { Search, BarChart3, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    description: "Find perfect creators with AI-powered matching based on audience, engagement, and brand fit.",
    gradient: "feature-icon-purple",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track campaign performance with detailed insights on reach, engagement, and ROI.",
    gradient: "feature-icon-cyan",
  },
  {
    icon: Shield,
    title: "Verified Creators",
    description: "Work with authenticated influencers with verified audience metrics and engagement rates.",
    gradient: "feature-icon-orange",
  },
  {
    icon: Users,
    title: "Campaign Management",
    description: "Manage multiple campaigns, track deliverables, and communicate all in one place.",
    gradient: "feature-icon-magenta",
  },
];

const ForBrandsSection = () => {
  return (
    <section id="for-brands" className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="badge-new mb-6 inline-block">For Brands</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect{" "}
              <span className="gradient-text">Creator Match</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Access a network of verified creators across all major platforms. 
              Our AI-powered tools help you discover influencers who truly align 
              with your brand values and target audience.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`${feature.gradient} shrink-0 text-white`}>
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 p-8">
                {/* Mock Dashboard */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 transform hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full gradient-hero-canva" />
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
                      <div className="h-2 bg-gray-100 rounded w-16" />
                    </div>
                    <div className="ml-auto text-sm font-bold text-primary">98% Match</div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Fashion</span>
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">2.5M</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] transition-transform ml-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400" />
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
                      <div className="h-2 bg-gray-100 rounded w-14" />
                    </div>
                    <div className="ml-auto text-sm font-bold text-primary">95% Match</div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-600 text-xs rounded-full">Lifestyle</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">1.8M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl gradient-hero-canva shadow-xl flex items-center justify-center animate-float-slow">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBrandsSection;
