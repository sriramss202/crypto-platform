import { FaChartLine, FaCoins } from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Trading Points",
    value: "1,250",
    subTitle: "Today +120",
    icon: <FaChartLine />,
    color: "text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]",
    bg: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: 2,
    title: "Epoch Points",
    value: "2,840",
    subTitle: "Weekly +540",
    icon: <FaCoins />,
    color: "text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]",
    bg: "from-amber-500/20 to-orange-500/10",
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {stats.map((item) => (
        <div
          key={item.id}
          data-gsap="fade-up"
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#081020]/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#0d1830]/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)]"
        >
          {/* Background Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-all duration-500`}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.title}</p>
                <h2 className={`mt-3 text-4xl font-extrabold tracking-tight ${item.color}`}>
                  {item.value}
                </h2>
                <p className="mt-2 text-xs font-semibold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                  {item.subTitle}
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;