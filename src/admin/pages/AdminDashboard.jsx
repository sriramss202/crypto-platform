import { ArrowUpRight, Gift, UserPlus, Users } from "lucide-react";
import { chartBars, dashboardMetrics, users } from "../data/adminMockData";
import StatusBadge from "../components/StatusBadge";

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-5 sm:space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Admin overview</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Platform at a glance</h1>
      <p className="mt-2 text-sm text-gray-400">Live operational metrics will appear when the admin API is connected.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">Preview mode</span></div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{dashboardMetrics.map(({ label, value, change, note }, index) => { const Icon = [Users, UserPlus, Gift, ArrowUpRight][index]; return <div key={label} className="group relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-[#101827] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative"><div className="flex items-start justify-between"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-cyan-400"><Icon size={24} /></div><ArrowUpRight size={18} className="text-gray-500" /></div>
      <p className="mt-6 text-sm text-gray-400">{label}</p><p className="mt-2 text-3xl font-bold text-white">{value}</p><p className="mt-3 text-xs text-gray-500"><span className="font-semibold text-green-400">{change}</span> · {note}</p></div></div>})}</div>
      <div className="grid gap-5 lg:grid-cols-12 sm:gap-6"><section className="rounded-3xl border border-white/10 bg-[#0B1220] p-5 sm:p-8 lg:col-span-8">
      <div className="flex items-start justify-between"><div><h2 className="text-2xl font-bold">User growth</h2><p className="mt-2 text-sm text-gray-400">Static chart styling preview; no business calculation.</p></div><span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">Mock data</span></div>
      <div className="mt-8 flex h-48 items-end justify-between gap-2 sm:gap-3">{chartBars.map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div style={{ height: `${height}%` }} className="w-full max-w-9 rounded-t-xl bg-gradient-to-t from-cyan-500/50 to-cyan-300" /><span className="text-[10px] text-gray-500">D{index + 1}</span></div>)}</div></section><section className="rounded-3xl border border-white/10 bg-[#101827] p-5 sm:p-8 lg:col-span-4">
      <div className="flex items-start justify-between"><div>
        <h2 className="text-2xl font-bold">Recent users</h2><p className="mt-2 text-sm text-gray-400">Static UI presentation data.</p></div><span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">Mock</span></div><div className="mt-6 space-y-3">{users.slice(0, 3).map((user) => <div key={user.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 p-3"><div className="min-w-0">
          <p className="truncate text-sm font-medium">{user.email}</p>
        <p className="mt-1 text-xs text-gray-500">{user.joined}</p></div><StatusBadge status={user.status} /></div>)}</div></section></div>
    </div>
    
  );
} 
