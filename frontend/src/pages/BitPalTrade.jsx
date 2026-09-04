import Hero from "../components/BitPalTrade/Hero/Hero";
import Features from "../components/BitPalTrade/Features/Features";

function BitPalTrade() {
  return (
    <div className="relative w-full overflow-hidden bg-[#050816] text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>

      {/* Single Page Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <Hero />

        {/* Section Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

        {/* Features Section */}
        <Features />
      </div>
    </div>
  );
}

export default BitPalTrade;