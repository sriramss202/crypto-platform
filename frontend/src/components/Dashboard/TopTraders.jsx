function TopTraders() {
  return (
    <div
      data-gsap="fade-up"
      className="h-full rounded-3xl border border-white/10 bg-[#081020]/40 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 sm:p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Top Traders</h2>
          <p className="mt-1.5 text-xs text-gray-400">Live leaderboard rankings active during epoch cycles.</p>
        </div>

        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
          Leaderboard
        </span>
      </div>

      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm font-medium text-gray-400 backdrop-blur-md">
        No active trader rankings recorded for current epoch.
      </div>
    </div>
  );
}

export default TopTraders;