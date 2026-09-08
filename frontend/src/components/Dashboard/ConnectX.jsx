import { FaCircleCheck, FaXTwitter } from "react-icons/fa6";
import RewardButton from "./RewardButton";

function ConnectX() {
  const handleConnectX = () => {
    window.open("https://x.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      data-gsap="fade-up"
      className="flex min-h-[280px] flex-col justify-between rounded-3xl border border-white/10 bg-[#081020]/40 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#0d1830]/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)] sm:p-8"
    >
      {/* Top */}
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-2xl text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] sm:h-16 sm:w-16 sm:text-3xl">
          <FaXTwitter />
        </div>

        <h2 className="mt-4 text-xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-2xl">
          Connect X Account
        </h2>

        <p className="mt-2 text-xs leading-relaxed text-gray-300 sm:mt-3 sm:text-sm sm:leading-7">
          Connect your X account to unlock exclusive social rewards, participate in campaigns, and earn additional XP points.
        </p>
      </div>

      {/* Bottom */}
      <div className="mt-6 sm:mt-0">
        <div className="mb-4 flex items-center gap-2 text-xs font-bold text-emerald-400 sm:mb-5 sm:text-sm">
          <FaCircleCheck />
          <span>Earn +200 XP instantly</span>
        </div>

        <RewardButton text="Connect X" onClick={handleConnectX} />
      </div>
    </div>
  );
}

export default ConnectX;