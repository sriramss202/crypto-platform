import { Award, Zap, ShieldCheck, Flame } from "lucide-react";

import { useRedux } from "../../../hooks/useRedux";

function BadgeHeader({ totalBadges = 9 }) {
  const { state } = useRedux((s) => s.rewards);
  const { currentBadge, epochPoints, badges } = state;
  const unlockedCount = badges.filter((b) => b.requiredPoints <= epochPoints).length;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#080d1e]/80 border border-cyan-500/20 p-6 md:p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
      {/* Background cyan glow highlights */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Title & Description */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            Epoch Gamification Season 4
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Award className="text-cyan-400 w-8 h-8 shrink-0 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
            Mission & Rewards <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">→ Badges</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Ascend through 9 elite trader tiers. Trade volume, execute tactical positions, and accumulate Epoch Points to unlock exclusive platform perks, fee rebates, and prestige flairs.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
          {/* Current Tier Pill */}
          <div className="flex-1 sm:flex-none bg-[#050816]/80 border border-cyan-500/30 rounded-xl p-4 min-w-[140px] flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Current Tier</span>
              <Flame className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-lg font-bold text-cyan-400 truncate">{currentBadge}</div>
            <div className="text-[11px] text-slate-500 mt-1">Tier {badges.findIndex((b) => b.name === currentBadge) + 1} of {totalBadges}</div>
          </div>

          {/* Points Pill */}
          <div className="flex-1 sm:flex-none bg-[#050816]/80 border border-white/10 rounded-xl p-4 min-w-[140px] flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Epoch Points</span>
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-lg font-bold text-white">
              {epochPoints.toLocaleString()} <span className="text-xs font-semibold text-cyan-400">PTS</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">+{0} PTS this epoch</div>
          </div>

          {/* Unlocked Badges Pill */}
          <div className="flex-1 sm:flex-none bg-[#050816]/80 border border-white/10 rounded-xl p-4 min-w-[140px] flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Unlocked</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white">
              {unlockedCount} <span className="text-xs font-semibold text-slate-400">/ {totalBadges}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">{Math.round((unlockedCount/totalBadges)*100)}% System Unlocked</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeHeader;
