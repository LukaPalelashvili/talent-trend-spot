import heroVideo from "@/assets/hero-video.mp4";

const VideoShowcaseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
