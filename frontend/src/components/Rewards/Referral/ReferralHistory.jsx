import { useState } from "react";
import { Users, CheckCircle2, Clock, Gift, ArrowUpRight } from "lucide-react";

export default function ReferralHistory() {
  const [filter, setFilter] = useState("all");

  const referralData = [
    {
      id: 1,
      user: "alex_trader",
      name: "Alex Morgan",
      date: "2026-08-24",
      status: "completed",
      reward: "+500 PTS",
      tier: "Tier 1",
    },
    {
      id: 2,
      user: "crypto_sam",
      name: "Sam Wilson",
      date: "2026-08-22",
      status: "completed",
      reward: "+1,000 PTS",
      tier: "Tier 2",
    },
    {
      id: 3,
      user: "elena_v",
      name: "Elena Rostova",
      date: "2026-08-20",
      status: "pending",
      reward: "Pending",
      tier: "Tier 1",
    },
    {
      id: 4,
      user: "marcus_k",
      name: "Marcus Chen",
      date: "2026-08-18",
      status: "completed",
      reward: "+500 PTS",
      tier: "Tier 1",
    },
    {
      id: 5,
      user: "satoshi_n",
      name: "Sarah Nakamoto",
      date: "2026-08-15",
      status: "completed",
      reward: "+5,000 PTS",
      tier: "Tier 3",
    },
  ];

  const filteredReferrals = referralData.filter((item) => {
    if (filter === "completed") return item.status === "completed";
    if (filter === "pending") return item.status === "pending";
    return true;
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-[#080d1e]/80 backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,230,153,0.05)] transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-cyan-300">
          <Users size={22} />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/90 font-semibold">
              Activity Log
            </p>
            <h2 className="text-xl font-bold text-white">Referral History</h2>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c1424] p-1">
          {["all", "completed", "pending"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200 ${
                filter === tab
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Referral Table / List */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-gray-400">
            <tr>
              <th className="px-4 py-3 rounded-l-xl">User</th>
              <th className="px-4 py-3">Date Joined</th>
              <th className="px-4 py-3">Reward Tier</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right rounded-r-xl">Points Earned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredReferrals.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-white/[0.03]"
              >
                {/* User Column */}
                <td className="px-4 py-4 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-gray-400">@{item.user}</p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-4 text-gray-400 text-xs sm:text-sm">
                  {item.date}
                </td>

                {/* Tier */}
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                    <Gift size={12} />
                    {item.tier}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="px-4 py-4">
                  {item.status === "completed" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 size={13} />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                      <Clock size={13} />
                      Pending
                    </span>
                  )}
                </td>

                {/* Points Earned */}
                <td className="px-4 py-4 text-right">
                  <span
                    className={`font-bold ${
                      item.status === "completed"
                        ? "text-emerald-400"
                        : "text-gray-500"
                    }`}
                  >
                    {item.reward}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-400">
        <p>Showing {filteredReferrals.length} referrals</p>
        <div className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer">
          View full reward history <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  );
}
