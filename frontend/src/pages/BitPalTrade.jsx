import { useRef } from "react";
import Hero from "../components/BitPalTrade/Hero/Hero";
import Features from "../components/BitPalTrade/Features/Features";
import { useUserGSAP } from "../hooks/useUserGSAP";

function BitPalTrade() {
  const containerRef = useRef(null);

  // Hook GSAP stagger and scroll animations
  useUserGSAP(containerRef);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden text-white">
      {/* Ambient Background Glow Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-purple-600/15"></div>

      {/* Single Page Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section data-gsap="fade-up">
          <Hero />
        </section>

        {/* Section Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

        {/* Features Section */}
        <section data-gsap="fade-up">
          <Features />
        </section>
      </div>
    </div>
  );
}

export default BitPalTrade;