import { Gift } from "lucide-react";

export default function InstantRewardCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080d1e]/80 backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,230,153,0.05)] transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20">
      <div className="flex items-center gap-3 text-cyan-300">
        <Gift size={24} />
        <p className="text-sm uppercase tracking-[0.24em]">Instant Reward</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-3xl bg-[#0b1221] p-6">
          <p className="text-sm text-gray-400">Reward</p>
          <p className="mt-2 text-4xl font-bold text-white">500 Epoch Points</p>
        </div>

        <p className="text-sm leading-6 text-gray-400">
          Invite your first friend and instantly earn 500 Epoch Points once they complete their first trade.
        </p>

        <button className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400">
          Invite Now
        </button>
      </div>
    </div>
  );
}
