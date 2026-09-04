import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

      {/* Left Side */}
      <HeroContent />

      {/* Right Side */}
      <HeroImage />

    </div>
  );
}

export default Hero;