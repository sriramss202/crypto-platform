import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Bell, ArrowUp, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import Avatar from "../components/Common/Avatar";
import { getCurrentUser } from "../utils/auth";
import { scrollToUserContainerTop } from "../hooks/useUserGSAP";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    mainEl.scrollTop = 0;

    const handleScroll = () => {
      setShowScrollTop(mainEl.scrollTop > 200);
    };

    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleScrollToTop = () => {
    scrollToUserContainerTop(mainRef.current);
  };

  const handleNavigateProfile = (e) => {
    if (e) e.preventDefault();
    navigate("/app/profile");
  };

  const handleNavigateAlerts = (e) => {
    if (e) e.preventDefault();
    navigate("/app/alerts");
  };

  const handleNavigateHome = (e) => {
    if (e) e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#030712] text-white selection:bg-cyan-500/30">
      {/* Background Ambient Translucent Glow Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-glow-slow absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="animate-glow-reverse absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full bg-purple-600/15 blur-[140px]" />
        <div className="absolute left-1/3 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#050917]/40 px-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-cyan-500/10 hover:text-cyan-400 active:scale-95"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>

          <div
            onClick={handleNavigateHome}
            className="cursor-pointer font-bold text-lg tracking-wide text-white select-none flex items-center gap-1.5"
          >
            Bit<span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Pal</span>
            <span className="text-xs text-gray-400 font-normal">Trade</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleNavigateAlerts}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400" />
          </button>

          <button
            type="button"
            onClick={handleNavigateProfile}
            className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Profile"
            title={user?.displayName || "Profile"}
          >
            <Avatar user={user} size="sm" />
          </button>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area & Desktop Header */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Header */}
        <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-white/10 bg-[#050917]/40 px-6 backdrop-blur-xl lg:flex">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" /> BitPal Trade Glass Platform
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleNavigateAlerts}
              className="relative flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400" />
            </button>

            <button
              type="button"
              onClick={handleNavigateProfile}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 pr-4 text-left backdrop-blur-md transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              aria-label="Profile"
            >
              <Avatar user={user} size="sm" />
              <div>
                <p className="text-xs font-bold text-white leading-tight">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-[10px] font-semibold text-cyan-400 capitalize">
                  {user?.role || "Trader"}
                </p>
              </div>
            </button>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main
          ref={mainRef}
          className="admin-scroll-container flex-1 min-w-0 overflow-y-auto overflow-x-hidden pt-20 px-3 sm:px-5 lg:pt-6 lg:px-8 lg:py-8"
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

export default AppLayout;