import {
  FaChartLine,
  FaCoins,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Trading Points",
    value: "1,200",
    change: "+18.6%",
    users: "12.4K Traders",
    icon: <FaChartLine />,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: 2,
    title: "Epoch Points",
    value: "2,840",
    change: "+9.4%",
    users: "8.9K Users",
    icon: <FaCoins />,
    color: "text-yellow-400",
    bg: "from-yellow-500/20 to-orange-500/10",
  },
];

function StatsCards() {
  return (
    <div className="space-y-6">
      {stats.map((item) => (
        <div
          key={item.id}
          className="
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-[#0B1220]
          p-6
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-cyan-400/40
          hover:shadow-[0_0_45px_rgba(34,211,238,0.18)]
          "
        >
          {/* Background Glow */}
          <div
            className={`
              absolute
              inset-0
              bg-gradient-to-br
              ${item.bg}
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-500
            `}
          />

          {/* Content */}
          <div className="relative z-10">

            {/* Header */}
            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h2 className={`mt-3 text-4xl font-bold ${item.color}`}>
                  {item.value}
                </h2>

              </div>

              <div
                className="
                h-16
                w-16
                rounded-2xl
                flex
                items-center
                justify-center
                bg-white/5
                text-3xl
                text-cyan-400
                border
                border-white/10
                "
              >
                {item.icon}
              </div>

            </div>

            {/* Divider */}
            <div className="my-6 border-t border-white/10"></div>

            {/* Bottom */}
            <div className="flex justify-between items-center">

              <div>

                <div className="flex items-center gap-2 text-green-400">

                  <FaArrowUp />

                  <span className="font-semibold">
                    {item.change}
                  </span>

                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-400">

                  <FaUsers className="text-cyan-400" />

                  <span>{item.users}</span>

                </div>

              </div>

              <button
                className="
                rounded-xl
                bg-cyan-500
                px-5
                py-2
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:bg-cyan-400
                active:scale-95
                "
              >
                View Details
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;  