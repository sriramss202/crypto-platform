import { FaChartLine, FaCoins } from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Trading Points",
    value: "1,250",
    subTitle: "Today +120",
    icon: <FaChartLine />,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: 2,
    title: "Epoch Points",
    value: "2,840",
    subTitle: "Weekly +540",
    icon: <FaCoins />,
    color: "text-yellow-400",
    bg: "from-yellow-500/20 to-orange-500/10",
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6">

      {stats.map((item) => (

        <div
          key={item.id}
          className="
          group
          relative
          overflow-hidden
          rounded-3xl
          bg-[#101827]
          border
          border-cyan-500/10
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-400
          hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
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

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400">
                  {item.title}
                </p>

                <h2 className={`mt-3 text-4xl font-bold ${item.color}`}>
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {item.subTitle}
                </p>

              </div>

              <div
                className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-white/5
                text-3xl
                text-cyan-400
                "
              >
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