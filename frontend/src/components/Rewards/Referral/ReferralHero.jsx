import { Users } from "lucide-react";

export default function ReferralHero() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080d1e]/80 backdrop-blur-xl p-8 shadow-[0_30px_60px_rgba(0,230,153,0.06)] transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-cyan-300">
              <Users size={28} />
              <span className="text-sm uppercase tracking-[0.24em] text-cyan-400/80">Referral Program</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-white">Earn More Together</h1>
            <p className="mt-3 max-w-3xl text-sm text-gray-400 sm:text-base">
              Invite friends and earn Epoch Points together. Share your referral link and unlock premium rewards.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
