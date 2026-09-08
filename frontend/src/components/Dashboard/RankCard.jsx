import { FaMedal } from "react-icons/fa";

function RankCard() {
  const currentPoints = 1240;
  const maxPoints = 2500;

  const progress = (currentPoints / maxPoints) * 100;

  return (
    <div
      data-gsap="fade-up"
      className="h-full rounded-3xl border border-white/10 bg-[#081020]/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#0d1830]/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)] sm:p-8"
    >
      <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
        {/* Left Content */}
        <div className="w-full flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Rank</p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Scout
          </h2>

          <p className="mt-2 text-sm font-semibold text-cyan-300">
            Keep trading to unlock the next rank.
          </p>

          {/* Progress */}
          <div className="mt-6 sm:mt-8">
            <div className="mb-2 flex justify-between text-xs font-semibold text-gray-300 sm:text-sm">
              <span>Current Points</span>
              <span className="text-cyan-400">
                {currentPoints} / {maxPoints}
              </span>
            </div>

            <div className="h-3.5 w-full overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <div
                className="gsap-progress-bar h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 flex justify-between text-sm sm:mt-8">
            <div>
              <p className="text-xs font-medium text-gray-400">Current Level</p>
              <h3 className="font-bold text-white">Scout</h3>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium text-gray-400">Next Rank</p>
              <h3 className="font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                Speculator
              </h3>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="shrink-0">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-transform duration-300 hover:scale-105 sm:h-36 sm:w-36">
            <FaMedal className="text-4xl text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] sm:text-5xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankCard;