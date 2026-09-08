import { useRef } from "react";
import { ArrowUpRight, Gift, UserPlus, Users, Activity, TrendingUp } from "lucide-react";
import { chartBars, dashboardMetrics, users } from "../data/adminMockData";
import StatusBadge from "../components/StatusBadge";
import { useAdminGSAP } from "../hooks/useAdminGSAP";

export default function AdminDashboard() {
  const containerRef = useRef(null);

  // Hook GSAP stagger and smooth animations
  useAdminGSAP(containerRef);

  return (
    <div ref={containerRef} className="mx-auto max-w-[1500px] space-y-6 sm:space-y-8">
      {/* Overview Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Admin Overview
          </p>
          <h1 className="gsap-title mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Platform Operations
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Real-time metric telemetry and operational overview workspace.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Activity size={14} className="animate-spin text-cyan-400" /> Transparent Preview Mode
        </span>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map(({ label, value, change, note }, index) => {
          const Icon = [Users, UserPlus, Gift, TrendingUp][index] || Users;
          return (
            <div
              key={label}
              data-gsap="fade-up"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#091122]/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#0d1830]/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)]"
            >
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/20 group-hover:scale-125" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors group-hover:text-cyan-400">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p className="mt-6 text-xs font-medium uppercase tracking-wider text-gray-400">{label}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">{value}</p>
                <p className="mt-3 text-xs text-gray-400">
                  <span className="font-semibold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                    {change}
                  </span>{" "}
                  · {note}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics & Activity Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* User Growth Chart */}
        <section
          data-gsap="fade-up"
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081020]/40 p-6 backdrop-blur-xl sm:p-8 lg:col-span-8 shadow-2xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">User Growth Telemetry</h2>
              <p className="mt-1.5 text-sm text-gray-400">
                Visual presentation analytics for user onboarding activity.
              </p>
            </div>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300">
              Live Mock
            </span>
          </div>

          <div className="mt-10 flex h-52 items-end justify-between gap-2.5 sm:gap-4 px-2">
            {chartBars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <div
                  style={{ height: `${height}%` }}
                  className="gsap-chart-bar w-full max-w-[42px] rounded-t-2xl border-t border-cyan-300/40 bg-gradient-to-t from-cyan-600/30 via-cyan-500/50 to-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 hover:brightness-125"
                />
                <span className="text-[11px] font-semibold text-gray-400">D{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Registered Users */}
        <section
          data-gsap="fade-up"
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081020]/40 p-6 backdrop-blur-xl sm:p-8 lg:col-span-4 shadow-2xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Recent Users</h2>
              <p className="mt-1.5 text-sm text-gray-400">Latest platform accounts.</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
              Activity
            </span>
          </div>

          <div className="mt-6 space-y-3.5">
            {users.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.06]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-200">{user.email}</p>
                  <p className="mt-1 text-xs text-gray-400">{user.joined}</p>
                </div>
                <StatusBadge status={user.status} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
 
