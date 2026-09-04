import { Lock } from "lucide-react";
import BadgeGraphic from "./BadgeGraphic";

function BadgeTimeline({ badges, selectedBadge, onSelectBadge }) {
  const row1Badges = badges.slice(0, 5); // 1. Scout, 2. Speculator, 3. Risk Taker, 4. Opportunity Hunter, 5. Position Architect
  const row2Badges = badges.slice(5);    // 6. Yield Conqueror, 7. Alpha Generator, 8. Volatility Rider, 9. Capital Commander

  return (
    <div className="rounded-2xl bg-[#050816] border border-white/10 p-4 sm:p-6 md:p-10 space-y-8 lg:space-y-12 shadow-2xl overflow-hidden">
      
      {/* ========================================================================= */}
      {/* MOBILE & TABLET (< lg): SEQUENTIAL VERTICAL TIMELINE WITH CONNECTING LINES */}
      {/* ========================================================================= */}
      <div className="flex lg:hidden flex-col items-center space-y-1 py-2 w-full">
        <div className="text-center mb-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00e699]">
            BADGE PROGRESSION TIMELINE
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Tap any badge to inspect tier details
          </p>
        </div>

        {badges.map((badge, index) => {
          const isSelected = selectedBadge && selectedBadge.id === badge.id;
          const isCurrent = badge.status === "current";
          const isLast = index === badges.length - 1;

          return (
            <div key={badge.id} className="flex flex-col items-center w-full max-w-sm">
              {/* Badge Card Button */}
              <div
                onClick={() => onSelectBadge(badge)}
                className={`relative flex items-center gap-3.5 sm:gap-4 w-full p-3 sm:p-4 rounded-2xl bg-[#060b13] border transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? "border-[#00e699] ring-1 ring-[#00e699]/50 shadow-[0_0_20px_rgba(0,230,153,0.25)]"
                    : isSelected
                    ? "border-white ring-1 ring-white/50 bg-white/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Floating Lock badge on top right */}
                {badge.status === "locked" && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#050816] border border-slate-700 flex items-center justify-center shadow-md z-20">
                    <Lock className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                )}

                {/* Badge Emblem Graphic */}
                <div className="shrink-0">
                  <BadgeGraphic badge={badge} size="sm" />
                </div>

                {/* Badge Details */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-extrabold text-white truncate">
                      {badge.name}
                    </h4>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide capitalize ${
                      badge.status === "locked"
                        ? "bg-slate-800 border border-slate-700 text-slate-400"
                        : "bg-[#061517] border border-[#00e699]/30 text-[#00e699]"
                    }`}>
                      {badge.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Tier {badge.id} of 9
                    </span>
                  </div>
                </div>
              </div>

              {/* Responsive Vertical Dashed Connector Line between sequential badges */}
              {!isLast && (
                <div className="w-[2px] h-7 sm:h-9 border-r-2 border-dashed border-[#00e699]/60 shadow-[0_0_8px_rgba(0,230,153,0.5)] my-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP (lg:): PRESERVED 2-ROW BADGE GRID CONTAINER WITH CONNECTING LINES */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative space-y-16">
        
        {/* ROW 1: 5 Badges */}
        <div className="relative grid grid-cols-5 gap-4 items-start">
          
          {/* Horizontal Dashed Connector Line behind Row 1 */}
          <div className="absolute top-[44px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#00e699]/40 z-0 pointer-events-none" />

          {/* Vertical Dashed Connector Line connecting Row 1 right edge to Row 2 right edge */}
          <div className="absolute top-[44px] right-[10%] w-[2px] h-[160px] border-r-2 border-dashed border-[#00e699]/40 z-0 pointer-events-none" />

          {row1Badges.map((badge) => {
            const isSelected = selectedBadge && selectedBadge.id === badge.id;
            const isCurrent = badge.status === "current";

            return (
              <div
                key={badge.id}
                onClick={() => onSelectBadge(badge)}
                className={`relative flex flex-col items-center text-center cursor-pointer z-10 transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected ? "scale-105" : ""
                }`}
              >
                {/* Floating Lock badge on top right */}
                {badge.status === "locked" && (
                  <div className="absolute top-0 right-4 w-6 h-6 rounded-full bg-[#050816] border border-slate-700 flex items-center justify-center shadow-md z-20">
                    <Lock className="w-3 h-3 text-slate-400" />
                  </div>
                )}

                {/* Badge Emblem */}
                <div
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    isCurrent
                      ? "ring-2 ring-[#00e699] shadow-[0_0_20px_rgba(0,230,153,0.4)] bg-[#00e699]/10"
                      : isSelected
                      ? "ring-2 ring-white shadow-lg bg-white/5"
                      : "hover:opacity-100"
                  }`}
                >
                  <BadgeGraphic badge={badge} size="md" />
                </div>

                {/* Badge Name */}
                <h4 className="mt-3 text-sm font-extrabold text-white tracking-wide">
                  {badge.name}
                </h4>

                {/* Status Pill */}
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide capitalize ${
                    badge.status === "locked"
                      ? "bg-slate-800 border border-slate-700 text-slate-400"
                      : "bg-[#061517] border border-[#00e699]/30 text-[#00e699]"
                  }`}>
                    {badge.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ROW 2: 4 Badges */}
        <div className="relative grid grid-cols-4 gap-8 items-start w-[80%] ml-auto">
          
          {/* Horizontal Dashed Connector Line behind Row 2 */}
          <div className="absolute top-[44px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-[#00e699]/40 z-0 pointer-events-none" />

          {row2Badges.map((badge) => {
            const isSelected = selectedBadge && selectedBadge.id === badge.id;
            const isCurrent = badge.status === "current";

            return (
              <div
                key={badge.id}
                onClick={() => onSelectBadge(badge)}
                className={`relative flex flex-col items-center text-center cursor-pointer z-10 transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected ? "scale-105" : ""
                }`}
              >
                {/* Floating Lock badge on top right */}
                {badge.status === "locked" && (
                  <div className="absolute top-0 right-4 w-6 h-6 rounded-full bg-[#050816] border border-slate-700 flex items-center justify-center shadow-md z-20">
                    <Lock className="w-3 h-3 text-slate-400" />
                  </div>
                )}

                {/* Badge Emblem */}
                <div
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    isCurrent
                      ? "ring-2 ring-[#00e699] shadow-[0_0_20px_rgba(0,230,153,0.4)] bg-[#00e699]/10"
                      : isSelected
                      ? "ring-2 ring-white shadow-lg bg-white/5"
                      : "hover:opacity-100"
                  }`}
                >
                  <BadgeGraphic badge={badge} size="md" />
                </div>

                {/* Badge Name */}
                <h4 className="mt-3 text-sm font-extrabold text-white tracking-wide">
                  {badge.name}
                </h4>

                {/* Status Pill */}
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide capitalize ${
                    badge.status === "locked"
                      ? "bg-slate-800 border border-slate-700 text-slate-400"
                      : "bg-[#061517] border border-[#00e699]/30 text-[#00e699]"
                  }`}>
                    {badge.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}

export default BadgeTimeline;
