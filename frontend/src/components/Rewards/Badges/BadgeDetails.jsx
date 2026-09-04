import { CheckCircle2, Lock, Zap, Gift, ShieldCheck, Sparkles, Award } from "lucide-react";
import BadgeGraphic from "./BadgeGraphic";

function BadgeDetails({ selectedBadge, userPoints = 18750 }) {
  if (!selectedBadge) {
    return (
      <div className="rounded-2xl bg-[#080d1e]/80 border border-white/10 p-8 text-center text-slate-400">
        Select a badge from the timeline above to view details.
      </div>
    );
  }

  const isCompleted = selectedBadge.status === "completed";

  const isCurrent = selectedBadge.status === "current";

  const isLocked = selectedBadge.status === "locked";

  // Calculate progress for this selected badge specifically
  let badgeProgressPercent = 0;

  let pointsDeficit = 0;

  if (isCompleted) {

    badgeProgressPercent = 100;

  } else if (selectedBadge.requiredPoints <= userPoints) {

    badgeProgressPercent = 100;

  } else {

    badgeProgressPercent = Math.min(100, (userPoints / selectedBadge.requiredPoints) * 100);

    pointsDeficit = selectedBadge.requiredPoints - userPoints;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#080d1e]/90 border border-cyan-500/30 p-6 md:p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Badge Image & Status */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#050816]/80 border border-white/10 text-center">
          <div className="relative p-4">
            <div className={`absolute inset-0 rounded-full ${isCurrent ? 'bg-cyan-400/30 animate-pulse blur-xl' : isCompleted ? 'bg-emerald-400/20 blur-lg' : 'bg-slate-700/20 blur-md'}`} />
            <BadgeGraphic badge={selectedBadge} size="xl" className="relative z-10" />
          </div>

          <h3 className="mt-4 text-2xl font-extrabold text-white tracking-wide">
            {selectedBadge.name}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isCurrent
                  ? "bg-cyan-400 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                  : isCompleted
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {isCurrent && <Sparkles className="w-3.5 h-3.5 fill-black" />}
              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
              {isLocked && <Lock className="w-3.5 h-3.5" />}
              {selectedBadge.status}
            </span>
            <span className="text-xs text-slate-400">Tier {selectedBadge.id} of 9</span>
          </div>

          {selectedBadge.unlockedAt && (
            <span className="mt-2 text-[11px] text-slate-500 font-medium">
              Unlocked on {selectedBadge.unlockedAt}
            </span>
          )}
        </div>

        {/* Right Details Info Panel */}

        <div className="lg:col-span-8 space-y-6">
          {/* Header & Required Points */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Badge Details Panel</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                {selectedBadge.name}
              </h2>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400 font-medium">Required Epoch Points</span>
              <span className="text-xl font-extrabold text-cyan-300 flex items-center gap-1 mt-0.5">
                <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                {selectedBadge.requiredPoints.toLocaleString()} PRTC
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</h4>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {selectedBadge.description}
            </p>
          </div>

          {/* Unlock Rewards */}
           <div className="p-4 rounded-xl bg-[#050816]/70 border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Gift className="w-4 h-4" />
              Unlock Reward
            </div>
            <div className="text-white font-extrabold text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              {selectedBadge.reward}
            </div>
          </div>

         
          {/* Exclusive Perks */}
          {selectedBadge.perks && selectedBadge.perks.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Associated Perks & Privileges
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedBadge.perks.map((perk, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-[#0a1226] border border-white/5 text-slate-300 text-xs flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar for Selected Badge */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Overall Progress</span>
              <span className="text-cyan-400 font-bold">{badgeProgressPercent.toFixed(1)}%</span>
            </div>

            <div className="w-full h-2.5 bg-[#030611] border border-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted
                    ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : isCurrent
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    : "bg-slate-700"
                }`}
                style={{ width: `${badgeProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {isCompleted && (
              <button
                disabled
                className="w-full py-3 px-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4" />
                Badge Completed & Reward Claimed
              </button>
            )}

            {isCurrent && (
              <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 fill-black" />

                Equipped as Active Rank Title

              </button>
            )}

            {isLocked && (
              <button className="w-full py-3 px-4 rounded-xl bg-[#050816] border border-slate-700 text-slate-400 font-semibold text-sm flex items-center justify-center gap-2 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors">
                <Lock className="w-4 h-4 text-slate-500" />
                Earn {pointsDeficit.toLocaleString()} More PTS to Unlock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeDetails;
