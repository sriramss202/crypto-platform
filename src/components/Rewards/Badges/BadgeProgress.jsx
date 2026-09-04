import { Lock } from "lucide-react";

function BadgeProgress({
  totalPoints = 0,
  currentBadge,
  nextBadge,
  selectedBadge,
  className = ""
}) {

const targetBadge = nextBadge || selectedBadge || currentBadge;
const targetName = targetBadge?.name || "MAX TIER";

const currentReq = currentBadge?.requiredPoints || 0;
const nextReq = nextBadge?.requiredPoints || currentReq + 1000;

const range = Math.max(1, nextReq - currentReq);

const pointsInCurrentLevel = Math.max(0, totalPoints - currentReq);

const percentageCompleted = Math.min(
  100,
  (pointsInCurrentLevel / range) * 100
);


  return (
    <div className={`rounded-2xl bg-[#050816] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl ${className}`}>

      {/* Header */}
      
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#00e699]">
        PROGRESS TO {targetName === "Scout" ? "SPECULATOR" : targetName}
        
      </div>

      {/* Progress Track */}
      <div className="relative pt-6 pb-8 px-4 sm:px-10">
        
        {/* Track Line */}
        <div className="relative w-full h-1 bg-[#0d1626] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00e699] shadow-[0_0_12px_rgba(0,230,153,0.9)] transition-all duration-700 ease-out"
            style={{ width: `${percentageCompleted}%` }}
          />
        </div>

        {/* Left Node: Current Marker */}
        <div className="absolute left-4 sm:left-10 top-6 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-[#050816] border-2 border-[#00e699] flex items-center justify-center shadow-[0_0_12px_rgba(0,230,153,0.6)]">
            <div className="w-3.5 h-3.5 rounded-full bg-[#00e699]" />
          </div>
          <div className="mt-3 text-[11px] font-bold text-[#00e699] uppercase tracking-wider">
            Current
          </div>
        </div>

        {/* Middle Diamond Percentage Indicator */}
        <div
          className="absolute top-6 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ease-out z-10"
          style={{ left: `${Math.max(8, Math.min(92, percentageCompleted))}%` }}
        >
          <div className="w-3.5 h-3.5 rotate-45 bg-[#00e699] shadow-[0_0_12px_rgba(0,230,153,1)] border border-white" />
          <div className="mt-4 text-xs font-extrabold text-[#00e699]">
            {percentageCompleted.toFixed(0)}%
          </div>
        </div>

        {/* Right Node: Unlock Marker */}
        <div className="absolute right-4 sm:right-10 top-6 translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-[#090e21] border border-slate-700 flex items-center justify-center text-slate-500">
            <Lock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="mt-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Unlock
          </div>
        </div>

      </div>
    </div>
  );
}

export default BadgeProgress;
