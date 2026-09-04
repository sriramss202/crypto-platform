import { CheckCircle, Sparkles } from "lucide-react";
import { useRedux } from "../../../hooks/useRedux";
import { completeMission } from "../../../store/rewardsSlice";
                      
function DailyMissions() {
  const { state, dispatch } = useRedux((s) => s.rewards);
  const { missions } = state;

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {missions.map((mission) => (
        <div
          key={mission.id}
          className="group rounded-[24px] border border-white/10 bg-[#07111f]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                  mission.completed
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                    : "border-cyan-400/20 bg-cyan-500/10 text-cyan-300"
                }`}
              >
                {mission.completed ? <CheckCircle className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {mission.completed ? "Completed" : "In progress"}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">{mission.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Earn {mission.points} Epoch Points by completing this mission.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="rounded-full border border-white/10 bg-[#0a1424] px-3 py-1 text-sm font-medium text-cyan-300">
              Reward: {mission.points} pts
            </div>

            {mission.completed ? (
              <button className="rounded-full border border-white/10 bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-300" disabled>
                Completed
              </button>
            ) : (
              <button
                onClick={() => dispatch(completeMission(mission.id))}
                className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Complete Mission
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyMissions;