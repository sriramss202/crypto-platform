import { Target, Trophy, BarChart3 } from "lucide-react";

function MilestoneHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
          <Target className="h-3.5 w-3.5 text-cyan-400" />
          Milestones
        </div>

        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Unlock new milestones with every step
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
          Reach trading checkpoints to unlock exclusive achievements, bonus perks, and deeper rewards.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="min-w-[160px] rounded-2xl border border-white/10 bg-[#081120] p-4">
          <Trophy className="mb-2 h-5 w-5 text-emerald-400" />
          <h3 className="text-2xl font-bold text-white">12</h3>
          <p className="mt-1 text-sm text-slate-400">Completed</p>
        </div>

        <div className="min-w-[160px] rounded-2xl border border-white/10 bg-[#081120] p-4">
          <BarChart3 className="mb-2 h-5 w-5 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">78%</h3>
          <p className="mt-1 text-sm text-slate-400">Overall Progress</p>
        </div>
      </div>
    </div>
  );
}

export default MilestoneHeader;