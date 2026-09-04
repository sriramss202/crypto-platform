import {
  FaWallet,
  FaCheckCircle,
  FaClock,
  FaGift,
} from "react-icons/fa";
import RewardButton from "./RewardButton";

function MissionCard({
  title,
  description,
  reward,
  progress,
}) {
  const completed = progress === "Completed";

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#101827] p-4 sm:p-6 transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
      {/* Left */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
        {/* Icon */}
        <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl sm:text-3xl text-cyan-400">
          <FaWallet />
        </div>

        {/* Mission Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-xl font-semibold text-white truncate">
            {title}
          </h3>

          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-400">
            {description}
          </p>

          {/* Progress */}
          <div className="mt-3 sm:mt-4 flex items-center gap-3">
            <div className="h-2 w-28 sm:w-48 max-w-[180px] overflow-hidden rounded-full bg-white/10 shrink-0">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completed
                    ? "w-full bg-green-500"
                    : "w-2/3 bg-cyan-400"
                }`}
              />
            </div>

            <span className="text-xs sm:text-sm text-gray-400 shrink-0">
              {progress}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10 sm:border-transparent">
        {/* Reward */}
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-green-500/10 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-green-400">
          <FaGift />
          <span className="font-semibold">
            {reward}
          </span>
        </div>

        {/* Status & Claim */}
        <div className="flex items-center gap-3">
          <div className="text-xs sm:text-sm">
            {completed ? (
              <span className="flex items-center gap-1.5 text-green-400">
                <FaCheckCircle />
                <span className="hidden sm:inline">Completed</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-yellow-400">
                <FaClock />
                <span className="hidden sm:inline">In Progress</span>
              </span>
            )}
          </div>

          <RewardButton
            text={completed ? "Claim" : "Locked"}
            disabled={!completed}
          />
        </div>
      </div>
    </div>
  );
}

export default MissionCard;