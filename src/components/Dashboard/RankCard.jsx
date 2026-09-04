import { FaMedal } from "react-icons/fa";

function RankCard() {
  const currentPoints = 1240;
  const maxPoints = 2500;

  const progress = (currentPoints / maxPoints) * 100;

  return (
    <div className="h-full rounded-3xl bg-[#101827] border border-cyan-500/10 p-5 sm:p-7 transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6">

        {/* Left Content */}
        <div className="flex-1 w-full">

          <p className="text-gray-400 text-sm">
            Current Rank
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Scout
          </h2>

          <p className="text-cyan-400 text-sm sm:text-base mt-2">
            Keep trading to unlock the next rank.
          </p>

          {/* Progress */}
          <div className="mt-6 sm:mt-8">

            <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2">
              <span>Current Points</span>
              <span>
                {currentPoints} / {maxPoints}
              </span>
            </div>

            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

          </div>

          {/* Bottom */}
          <div className="flex justify-between mt-6 sm:mt-8 text-sm">
            <div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Current
              </p>
              <h3 className="text-white font-semibold">
                Scout
              </h3>
            </div>

            <div className="text-right">
              <p className="text-gray-400 text-xs sm:text-sm">
                Next Rank
              </p>
              <h3 className="text-cyan-400 font-semibold">
                Speculator
              </h3>
            </div>
          </div>

        </div>

        {/* Badge */}
        <div className="shrink-0">
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center">
            <FaMedal className="text-4xl sm:text-5xl text-cyan-400" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default RankCard;