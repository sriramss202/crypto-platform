import { CheckCircle, Target } from "lucide-react";

const steps = [
  "Share referral link",
  "Friend registers",
  "Friend trades",
  "Both earn points",
  "Unlock referral tiers",
];

export default function HowItWorks() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080d1e]/80 backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,230,153,0.05)] transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20">
      <div className="flex items-center gap-3 text-cyan-300">
        <Target size={24} />
        <p className="text-sm uppercase tracking-[0.24em]">How It Works</p>
      </div>

      <div className="mt-6 space-y-5">
        {steps.map((label, index) => (
          <div key={label} className="flex items-start gap-4">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-[#0b1221]/90 text-cyan-400">
              <span className="text-sm font-semibold">{index + 1}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-gray-500">{index === 0 ? "Copy the link and share it with friends." : index === 1 ? "New users sign up through your referral." : index === 2 ? "Your friend trades to qualify the reward." : index === 3 ? "Both of you earn Epoch Points instantly." : "Collect referrals to level up your tier."}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1221]/80 p-4 text-sm text-gray-400">
        <div className="flex items-center gap-2 text-cyan-300">
          <CheckCircle size={16} />
          <span>Fast rewards and clear progress.</span>
        </div>
      </div>
    </div>
  );
}
