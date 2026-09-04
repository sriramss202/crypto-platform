import TrustedUsers from "./TrustedUsers";
import GetStartedButton from "./GetStartedButton";

function HeroContent() {
  return (
    <div className="flex flex-col justify-center max-w-2xl space-y-4 sm:space-y-6">

      {/* Trusted Users */}
      <TrustedUsers />

      {/* Heading */}
      <div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-none tracking-tight text-white">
          BITPAL
          <br />
          <span className="text-cyan-400">
            TRADE
          </span>
        </h1>

        <div className="mt-3 sm:mt-5 flex items-center gap-3">
          <div className="h-[2px] w-8 sm:w-12 rounded-full bg-cyan-400"></div>

          <p className="text-xs sm:text-sm lg:text-base font-semibold tracking-wide text-cyan-400 uppercase">
            Trade Smarter • Execute Faster
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
          Buy, sell, and manage your cryptocurrency portfolio with
          lightning-fast execution, enterprise-grade security,
          and real-time market analytics.
        </p>
      </div>

      {/* CTA */}
      <div className="pt-1">
        <GetStartedButton />
      </div>

    </div>
  );
}

export default HeroContent;