export default function ReferralStats() {
  const stats = [
    { label: "Total Referrals", value: "24" },
    { label: "Total Points Earned", value: "18,500" },
  ];

  return (
    <div className="space-y-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-3xl border border-white/10 bg-[#080d1e]/80 p-6 shadow-[0_30px_60px_rgba(0,230,153,0.05)] transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">{stat.label}</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
