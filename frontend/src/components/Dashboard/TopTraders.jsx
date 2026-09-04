function TopTraders() {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-[#101827] p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Top Traders</h2>
          <p className="mt-2 text-gray-400">Ranks will appear here once data is available.</p>
        </div>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">Coming Soon</span>
      </div>

      <div className="rounded-2xl border border-dashed border-white/10 bg-[#0B1220] p-6 text-center text-sm text-gray-400">
        No trader rankings available yet.
      </div>
    </div>
  );
}

export default TopTraders;