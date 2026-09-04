import { Rocket } from "lucide-react";

export default function MotivationBanner() {
  return (
        <div className="rounded-2xl border border-white/10 bg-[#080d1e]/80 backdrop-blur-xl p-6 text-white shadow-[0_30px_60px_rgba(0,230,153,0.05)] transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-cyan-300">
          <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">
            <Rocket size={24} />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-white">Invite more friends</h3>
            <p className="text-sm text-gray-400">Unlock exclusive referral badges and premium trading rewards.</p>
          </div>
        </div>
      </div>
    </div>

  );
}
