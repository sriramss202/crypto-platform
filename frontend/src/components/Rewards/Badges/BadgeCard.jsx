import { Hexagon, ChevronRight } from "lucide-react";
import BadgeGraphic from "./BadgeGraphic";

function BadgeCard({
  currentBadge,
  nextBadge,
  selectedBadge,
  onSelectBadge,
}) {
  const activeBadge = selectedBadge || currentBadge;
  if (!activeBadge) return null;

  const isCurrent = activeBadge.status === "current";

  return (
    <div className="w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#050816]/95 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="flex items-center justify-center gap-4 py-1">
        <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#00e699]/40 md:w-32" />
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e699]">
          CURRENT BADGE
        </span>
        <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#00e699]/40 md:w-32" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-center lg:gap-8">
        <div className="flex items-center justify-center lg:col-span-2">
          <div className="flex h-44 w-44 min-[380px]:h-56 min-[380px]:w-56 sm:h-64 sm:w-64 items-center justify-center rounded-full bg-[#00e699]/10 shadow-[0_0_40px_rgba(0,230,153,0.16)]">
            <BadgeGraphic badge={activeBadge} size="xl" />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 lg:col-span-3">
          <div>
            <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
              {activeBadge.name}
            </h2>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00e699] animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00e699]">
                {isCurrent ? "Current Tier" : activeBadge.status}
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-400 sm:text-base">
              {activeBadge.description || "Complete missions to unlock the next trader tier."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#030611] p-3.5 sm:p-5">
            {nextBadge ? (
              <div
                onClick={() => onSelectBadge && onSelectBadge(nextBadge)}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#090e21] p-3 transition-colors hover:border-[#00e699]/40 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#00e699]/30 bg-[#00e699]/10 text-[#00e699]">
                    <Hexagon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      NEXT UNLOCK
                    </div>
                    <div className="mt-0.5 max-w-[130px] sm:max-w-[140px] truncate text-sm sm:text-lg font-black uppercase text-white transition-colors group-hover:text-[#00e699]">
                      {nextBadge.name}
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-[#00e699]" />
              </div>
            ) : (
              <div className="flex items-center gap-3 sm:gap-4 rounded-xl border border-white/5 bg-[#090e21] p-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">
                  <Hexagon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    STATUS
                  </div>
                  <div className="mt-0.5 text-xs sm:text-base font-extrabold text-amber-400">
                    MAX TIER REACHED
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeCard;
