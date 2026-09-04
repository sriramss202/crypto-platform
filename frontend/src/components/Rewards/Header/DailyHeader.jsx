import { Sun, Star, Medal } from "lucide-react";

function DailyHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
          <Sun className="h-3.5 w-3.5 text-yellow-400" />
          Daily Missions
        </div>

        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Complete today’s missions
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
          Finish the day’s trading tasks to unlock Epoch Points and build momentum for your current badge streak.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="min-w-[160px] rounded-2xl border border-white/10 bg-[#081120] p-4">
          <Star className="mb-2 h-5 w-5 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">3250</h3>
          <p className="mt-1 text-sm text-slate-400">Epoch Points</p>
        </div>

        <div className="min-w-[160px] rounded-2xl border border-white/10 bg-[#081120] p-4">
          <Medal className="mb-2 h-5 w-5 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Silver</h3>
          <p className="mt-1 text-sm text-slate-400">Current Badge</p>
        </div>
      </div>
    </div>
  );
}

export default DailyHeader;