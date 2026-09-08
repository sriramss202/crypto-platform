import { useState, useRef, useEffect } from "react";
import { Bell, Gift, LayoutDashboard, Menu, ShieldCheck, Users, UserRound, X, ArrowUp, Sparkles } from "lucide-react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../utils/auth";
import { scrollToTopGSAP } from "../hooks/useAdminGSAP";

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
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6 md:p-8 backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl flex items-center gap-2">
            Bit<span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">Pal</span>
            <span className="text-xs uppercase font-semibold tracking-wider text-cyan-400/90 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">Admin</span>
          </h1>
          <p className="mt-1 text-xs text-gray-400 flex items-center gap-1">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" /> Glassmorphic Workspace
          </p>
        </div>
        <button
          onClick={closeMenu}
          className="rounded-xl p-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-4 py-6 md:px-5 admin-scroll-container" aria-label="Admin navigation">
        {navigation.map(({ label, to, end, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={closeMenu}
            className={({ isActive }) =>
              `group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 font-medium transition-all duration-300 ${
                isActive
                  ? "border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-xl"
                  : "text-gray-400 hover:border hover:border-white/10 hover:bg-white/[0.06] hover:text-white hover:backdrop-blur-md"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-400/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                      : "bg-white/5 text-gray-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span className="tracking-wide text-sm font-semibold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 space-y-4 border-t border-white/10 p-5 md:p-6 backdrop-blur-xl">
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 font-medium text-gray-300 transition-all duration-300 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
        >
          <ShieldCheck size={18} />
          <span className="text-sm font-semibold">Sign out</span>
        </button>

        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-blue-600/5 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Glass Mode</p>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <p className="mt-1.5 text-xs text-gray-300">Smooth GSAP & Transparent UI Active</p>
        </div>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef(null);
  const location = useLocation();

  // Handle scroll top visibility and reset scroll on page change
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    // Scroll to top smoothly on route change
    mainEl.scrollTop = 0;

    const handleScroll = () => {
      setShowScrollTop(mainEl.scrollTop > 200);
    };

    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleScrollToTop = () => {
    scrollToTopGSAP(mainRef.current);
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#030712] text-white selection:bg-cyan-500/30">
      {/* Background Ambient Translucent Glow Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-glow-slow absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="animate-glow-reverse absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full bg-purple-600/15 blur-[140px]" />
        <div className="absolute left-1/3 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Mobile Backdrop Overlay */}
      {menuOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity md:hidden"
        />
      )}

      {/* Glassmorphic Transparent Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 min-w-[288px] max-w-[288px] shrink-0 flex-col border-r border-white/10 bg-[#070c1b]/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] transition-all duration-300 md:static md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NavContent closeMenu={() => setMenuOpen(false)} />
      </aside>

      {/* Main Workspace Layout Area */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header on Mobile */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#050917]/40 px-4 backdrop-blur-xl sm:px-7 md:hidden">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-cyan-500/10 hover:text-cyan-400 active:scale-95 md:hidden"
            >
              <Menu size={22} />
            </button>
            <p className="font-bold text-lg tracking-wide">
              Bit<span className="text-cyan-400">Pal</span>{" "}
              <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-cyan-400/80">Admin</span>
            </p>
          </div>
        </header>

        {/* GSAP Smooth Scrollable Main Section */}
        <main
          ref={mainRef}
          className="admin-scroll-container relative w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <Outlet />

          {/* Floating Smooth Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
              className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#081226]/80 text-cyan-300 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-110 hover:bg-cyan-500 hover:text-black active:scale-95"
            >
              <ArrowUp size={20} />
            </button>
          )}
        </main>
      </div>
    </div>
  );
}

  