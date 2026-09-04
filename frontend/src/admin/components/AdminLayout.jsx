import { useState } from "react";
import { Bell, Gift, LayoutDashboard, Menu, ShieldCheck, Users, UserRound, X } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

const navigation = [
  { label: "Dashboard", to: "/admin", end: true, icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Missions & Rewards", to: "/admin/rewards", icon: Gift },
  { label: "Referrals", to: "/admin/referrals", icon: UserRound },
  { label: "Notifications", to: "/admin/notifications", icon: Bell },
  { label: "Profile", to: "/admin/profile", icon: UserRound },
];

function NavContent({ closeMenu }) {
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6 md:p-8">
        <div><h1 className="text-2xl font-bold text-white md:text-3xl">Bit<span className="text-cyan-400">Pal</span> <span className="text-base font-semibold">Admin</span></h1><p className="mt-1 text-sm text-gray-400">Operations Workspace</p></div>
        <button onClick={closeMenu} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white md:hidden" aria-label="Close navigation"><X size={20} /></button>
      </div>

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-6 md:px-5" aria-label="Admin navigation">
        {navigation.map(({ label, to, end, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={closeMenu}
            className={({ isActive }) => `group flex items-center gap-3 rounded-2xl px-4 py-3.5 font-medium transition-colors duration-200 ${
              isActive
                ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {({ isActive }) => <><span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200 ${isActive ? "bg-cyan-500/10 text-cyan-300" : "bg-white/5 text-gray-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300"}`}><Icon size={18} /></span><span>{label}</span></>}
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 space-y-4 border-t border-white/10 p-5 md:p-6">
        <button onClick={signOut} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"><ShieldCheck size={18} /><span>Sign out</span></button>
        <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-md md:p-5"><p className="text-base font-semibold text-white">Admin session</p>
        <p className="mt-2 text-xs text-gray-400 md:text-sm">Frontend preview mode</p></div>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#050816] text-white">
      {menuOpen && <button aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 min-w-[288px] max-w-[288px] shrink-0 flex-col border-r border-white/10 bg-[#0A0F1C] transition-transform md:static md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <NavContent closeMenu={() => setMenuOpen(false)} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center px-4 sm:px-7 md:hidden">
          <div className="flex items-center gap-3"><button aria-label="Open navigation" onClick={() => setMenuOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-colors hover:bg-white/10 active:scale-95 md:hidden"><Menu size={22} /></button><p className="font-bold text-lg tracking-wide md:hidden">Bit<span className="text-cyan-400">Pal</span> <span className="ml-0.5 text-xs font-normal text-gray-400">Admin</span></p></div>
        </header>
        <main className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden py-4 pl-4 pr-0 sm:pl-6 md:px-8 md:py-6 lg:px-10 lg:py-8"><Outlet /></main>
      </div>
    </div>
  );
}
