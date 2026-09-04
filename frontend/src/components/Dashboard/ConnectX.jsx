import {
  FaCircleCheck,
  FaXTwitter
} from "react-icons/fa6";
import RewardButton from "./RewardButton";

function ConnectX() {
  const handleConnectX = () => {
    window.open("https://x.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101827] via-[#0F172A] to-[#08111F] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] min-h-[280px]">
      {/* Top */}

      <div>

        <div
          className="
          w-14
          h-14
          sm:w-16
          sm:h-16
          p-3
          rounded-2xl
          bg-cyan-500/10
          flex
          items-center
          justify-center
          text-2xl
          sm:text-3xl
          text-cyan-400
          "
        >
          <FaXTwitter />
        </div>

        <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-white">
          Connect X Account
        </h2>

        <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed sm:leading-7">
          Connect your X account to unlock
          exclusive social rewards,
          participate in campaigns,
          and earn additional XP.
        </p>

      </div>

      {/* Bottom */}

      <div className="mt-6 sm:mt-0">

        <div className="flex items-center gap-2 mb-4 sm:mb-5 text-xs sm:text-sm text-green-400">

          <FaCircleCheck />

          <span>Earn +200 XP instantly</span>

        </div>

        <RewardButton text="Connect X" onClick={handleConnectX} />

      </div>

    </div>
  );
}

export default ConnectX;