import { Award } from "lucide-react";

export default function ReferralTierCard({ title, threshold, reward }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-[#080d1e]/80 p-6 shadow-[0_30px_60px_rgba(0,230,153,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-cyan-500/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">{title}</p>
          <h3 className="mt-3 text-2xl font-bold text-white">{threshold} referrals</h3>
        </div>
        <Award className="text-cyan-400" size={28} />
      </div>

      <p className="mt-5 text-sm text-gray-400">Earn {reward} when you reach this referral milestone.</p>
    </div>
  );
}
