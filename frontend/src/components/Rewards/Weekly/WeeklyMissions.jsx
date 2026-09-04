import { CalendarDays, Sparkles } from "lucide-react";

const weekly = [
  {
    id: 1,
    title: "Trade 20 Times",
    progress: "12 / 20",
    reward: "1200 Epoch Points",
  },
  {
    id: 2,
    title: "Trade £10,000 Volume",
    progress: "£4,500 / £10,000",
    reward: "2000 Epoch Points",
  },
  {
    id: 3,  
    title: "Refer a Friend",
    progress: "0 / 5",
    reward: "500 Epoch Points",
  },
  {
    id: 4,  
    title: "Complete 5 Daily Missions",
    progress: "3 / 5",
    reward: "1500 Epoch Points",
  },
  {
    id: 5,  
    title: "Achieve a 7-Day Streak",
    progress: "5 / 7",
    reward: "2500 Epoch Points",    
  },
  {
    id: 6,  
    title: "Reach Silver Badge",
    progress: "0 / 1",
    reward: "1000 Epoch Points",
  }
];

function WeeklyMissions() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {weekly.map((item) => (
        <div
          key={item.id}
          className="rounded-[24px] border border-white/10 bg-[#07111f]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Weekly objective</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Progress: {item.progress}</p>
              </div>
            </div>

            <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
              +{item.reward.split(" ")[0]}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0a1424] px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span>Reward: {item.reward}</span>
            </div>
            <div className="h-2 w-24 rounded-full bg-slate-800">
              <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeeklyMissions;