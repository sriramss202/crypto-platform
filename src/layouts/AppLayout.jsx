import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Bell, User } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-[#050816] text-white">
      {/* Top Mobile Header — Fixed on Mobile/Tablet (< lg) */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0A0F1C]/95 px-4 backdrop-blur-md lg:hidden">
        {/* Left: Hamburger Button + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-colors hover:bg-white/10 active:scale-95"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>

          <div
            onClick={handleNavigateHome}
            className="cursor-pointer font-bold text-lg tracking-wide text-white select-none"
          >
            Bit<span className="text-cyan-400">Pal</span> <span className="text-xs text-gray-400 font-normal ml-0.5">Trade</span>
          </div>
        </div>

        {/* Right: Notifications & Profile Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleNavigateAlerts}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400" />
          </button>

          <button
            type="button"
            onClick={handleNavigateProfile}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
            aria-label="Profile"
          >
            <User size={18} />
          </button>
        </div>
      </header>

      {/* Sidebar Component (Handles Desktop Sticky & Mobile Overlay Drawer) */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-x-hidden pt-20 px-3 sm:px-5 lg:pt-6 lg:px-6 lg:py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;