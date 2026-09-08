import {
  FaChartLine,
  FaCoins,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Trading Volume Points",
    value: "1,200",
    change: "+18.6%",
    users: "12.4K Active",
    icon: <FaChartLine />,
    color: "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]",
    bg: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: 2,
    title: "Epoch Staking Rewards",
    value: "2,840",
    change: "+9.4%",
    users: "8.9K Stakers",
    icon: <FaCoins />,
    color: "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]",
    bg: "from-amber-500/20 to-orange-500/10",
  },
];

function InviteEarn() {
  return (
    <div className="space-y-6">
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
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.title}</p>
                <h2 className={`mt-3 text-4xl font-extrabold tracking-tight ${item.color}`}>
                  {item.value}
                </h2>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-white/10"></div>

            {/* Bottom */}
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <FaArrowUp />
                  <span>{item.change}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-gray-400">
                  <FaUsers className="text-cyan-400" />
                  <span>{item.users}</span>
                </div>
              </div>

              <button className="rounded-2xl border border-cyan-400/30 bg-cyan-500/20 px-5 py-2.5 text-xs font-bold text-cyan-300 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InviteEarn;
  