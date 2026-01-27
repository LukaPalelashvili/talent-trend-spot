import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Nexly helped me find brand deals that actually align with my content. My engagement has never been higher!",
    author: "Alex Rivera",
    role: "Lifestyle Creator",
    followers: "850K Followers",
    avatar: "🧑‍🎨",
  },
  {
    quote: "We found 10 perfect micro-influencers in one week. The ROI on our campaigns has increased by 340%.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    avatar: "👩‍💼",
  },
  {
    quote: "The analytics integration is a game-changer. Brands can see my real metrics instantly, no more back-and-forth.",
    author: "Marcus Johnson",
    role: "Gaming Creator",
    followers: "1.2M Subscribers",
    avatar: "🎮",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Loved by Creators & Brands
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our community has to say about their Nexly experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-interactive p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-display font-bold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.followers && ` • ${testimonial.followers}`}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
