import {
  TrendingUp,
  TrendingDown,
  Bitcoin,
  Activity,
} from "lucide-react";

function HeroImage() {
  return (
    <div className="relative flex items-center justify-center py-4 sm:py-6 lg:py-8">

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>

        <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-cyan-400/20"></div>

        <div className="absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full border border-cyan-400/10"></div>

      </div>

      {/* Video Globe */}
      <div className="relative z-10 overflow-hidden rounded-full border border-cyan-400/30 shadow-[0_0_80px_rgba(34,211,238,0.35)] w-[220px] h-[220px] min-[380px]:w-[260px] min-[380px]:h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]">

        <video
          src="https://cdn.pixabay.com/video/2024/08/03/224712_large.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />

      </div>

      {/* Top Left Card */}
      <div className="absolute top-2 left-0 sm:top-4 sm:-left-2 lg:-left-6 z-20 rounded-2xl border border-cyan-500/20 bg-[#101827]/90 backdrop-blur-xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 shadow-xl scale-90 sm:scale-100">

        <div className="flex items-center gap-2.5 sm:gap-3">

          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-cyan-500/20">
            <Bitcoin size={16} className="text-yellow-400 sm:size-5" />
          </div>

          <div>

            <p className="text-[10px] sm:text-xs text-gray-400">
              Bitcoin
            </p>

            <h3 className="text-sm sm:text-lg font-bold text-white">
              $118,420
            </h3>

            <div className="flex items-center gap-1 text-emerald-400 text-xs sm:text-sm">

              <TrendingUp size={12} />

              +3.42%

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Right Card */}
      <div className="absolute bottom-2 right-0 sm:bottom-4 sm:-right-2 lg:-right-6 z-20 rounded-2xl border border-cyan-500/20 bg-[#101827]/90 backdrop-blur-xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 shadow-xl scale-90 sm:scale-100">

        <div className="flex items-center gap-2.5 sm:gap-3">

          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-cyan-500/20">
            <Activity size={16} className="text-cyan-400 sm:size-5" />
          </div>

          <div>

            <p className="text-[10px] sm:text-xs text-gray-400">
              Market Trend
            </p>

            <h3 className="text-sm sm:text-lg font-bold text-white">
              Bullish
            </h3>

            <div className="flex items-center gap-1 text-red-400 text-xs sm:text-sm">

              <TrendingDown size={12} />

              High Volatility

            </div>

          </div>

        </div>

      </div>

      {/* Live Trading Badge */}
      <div className="absolute top-0 right-2 sm:right-6 z-20 rounded-full border border-emerald-500/30 bg-[#101827]/90 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-lg shadow-lg scale-90 sm:scale-100">

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>

          <span className="text-xs sm:text-sm font-semibold text-emerald-400">
            LIVE MARKET
          </span>

        </div>

      </div>

      {/* Floating Profit Badge */}
      <div className="absolute bottom-4 left-2 sm:bottom-10 sm:left-4 z-20 rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-lg scale-90 sm:scale-100">

        <p className="text-[10px] sm:text-xs text-gray-300">
          Portfolio
        </p>

        <h3 className="text-sm sm:text-lg font-bold text-white">
          +24.8%
        </h3>

      </div>

    </div>
  );
}

export default HeroImage;