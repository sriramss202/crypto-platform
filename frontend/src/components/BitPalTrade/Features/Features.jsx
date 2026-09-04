import FeatureCard from "./FeatureCard";
import featureData from "./featureData";

function Features() {
  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center">
        <p className="text-cyan-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
          Why Choose BitPal
        </p>

        <h2 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Powerful Trading Features
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Experience lightning-fast trading, enterprise-grade security,
          and powerful tools designed for both beginners and professional
          cryptocurrency traders.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 sm:mt-12">
        {featureData.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;