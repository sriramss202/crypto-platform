import { Trophy, Sparkles } from "lucide-react";

const milestones = [
  {
    id: 1,
    title: "First Trade",
    completed: true,
  },
  {
    id: 2,
    title: "50 Successful Trades",
    completed: false,
  },
  {
    id: 3,
    title: "100 Trades",
    completed: false,
  },
  {
    id: 4,
    title: "500 Trades",
    completed: false,
  },
  {
    id: 5,
    title: "1000 Trades",
    completed: false, 
  },
  {
    id: 6,
    title: "5000 Trades",
    completed: false,
  },
  {
    id: 7,
    title: "10000 Trades",
    completed: false, 
  }
];

function Milestones() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {milestones.map((item) => (
        <div
          key={item.id}
          className="rounded-[24px] border border-white/10 bg-[#07111f]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                item.completed
                  ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
                  : "border-slate-600/40 bg-slate-800/70 text-slate-400"
              }`}
            >
              <Trophy className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                {item.completed ? "Unlocked" : "Next up"}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">{item.title}</h2>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a1424] px-4 py-3 text-sm text-slate-400">
            <span>{item.completed ? "Completed" : "Not completed yet"}</span>
            <span className="inline-flex items-center gap-2 text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Bonus reward
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Milestones;