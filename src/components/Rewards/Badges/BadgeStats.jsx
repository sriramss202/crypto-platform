import { Trophy, Target, Award, Sparkles } from "lucide-react";

function BadgeStats({ totalPoints = 18750, currentBadge, nextBadge, unlockedCount = 3, totalBadges = 9 }) {

  const pointsNeeded = nextBadge ? Math.max(0, nextBadge.requiredPoints - totalPoints) : 0;

  const currentReq = currentBadge ? currentBadge.requiredPoints : 0;

  const nextReq = nextBadge ? nextBadge.requiredPoints : totalPoints;

  const range = nextReq - currentReq;
  
  const progressInTier = range > 0 ? Math.min(100, Math.max(0, ((totalPoints - currentReq) / range) * 100)) : 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Points Stat Card */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#080d1e]/90 border border-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">

        <div className="flex items-center justify-between">

          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Epoch Points</span>

          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">

            <Trophy className="w-5 h-5" />

          </div>

        </div>

        <div className="mt-3 flex items-baseline gap-2">

          <span className="text-3xl font-extrabold text-white tracking-tight">{totalPoints.toLocaleString()}</span>

          <span className="text-sm font-semibold text-cyan-400">PTS</span>

        </div>

        <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">

          <span className="text-emerald-400 font-semibold">▲ +1,250</span> from last epoch trades
        </p>
      </div>

      {/* Current Rank Stat Card */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#080d1e]/90 border border-cyan-500/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Tier Rank</span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 animate-pulse">
            <Award className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xl sm:text-2xl font-bold text-cyan-300 truncate block">
            {currentBadge ? currentBadge.name : "Opportunity Hunter"}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">

          Rank <span className="text-white font-medium">#4 of 9</span> • Active Status
        </p>
      </div>

      {/* Points Needed Stat Card */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#080d1e]/90 border border-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Next Rank Goal</span>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Target className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">{pointsNeeded.toLocaleString()}</span>
          <span className="text-sm font-semibold text-slate-400">PTS Needed</span>
        </div>
        <p className="mt-2 text-xs text-slate-400 truncate">
          To unlock <span className="text-cyan-400 font-semibold">{nextBadge ? nextBadge.name : "Next Tier"}</span>
        </p>
      </div>

      {/* Badge Mastery Stat Card */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#080d1e]/90 border border-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
      
        <div className="flex items-center justify-between">

          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Collection Progress</span>

          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">

            <Sparkles className="w-5 h-5" />
          </div>

        </div>

        <div className="mt-3 flex items-baseline gap-2">

          <span className="text-3xl font-extrabold text-white tracking-tight">{unlockedCount}</span>

          <span className="text-sm font-semibold text-slate-400">/ {totalBadges} Badges</span>

        </div>

        <p className="mt-2 text-xs text-slate-400">

          Tier completion <span className="text-purple-400 font-semibold">{progressInTier.toFixed(1)}%</span>
        </p>
      </div>
    </div>
  );
}

export default BadgeStats;
