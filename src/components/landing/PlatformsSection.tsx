const platforms = [
  { name: "TikTok", icon: "📱" },
  { name: "YouTube", icon: "▶️" },
  { name: "Instagram", icon: "📷" },
  { name: "Twitter", icon: "🐦" },
  { name: "Twitch", icon: "🎮" },
  { name: "LinkedIn", icon: "💼" },
];

const PlatformsSection = () => {
  return (
    <section className="py-16 border-y border-border/50 bg-card">
      <div className="container">
        <p className="text-center text-muted-foreground mb-8 font-medium">
          Trusted by creators from all major platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="platform-badge"
            >
              <span className="text-2xl">{platform.icon}</span>
              <span>{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
