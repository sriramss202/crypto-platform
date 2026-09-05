import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import Avatar from "../components/Common/Avatar";
import { getCurrentUser } from "../utils/auth";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

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

        {/* Right: Notifications & Profile Avatar */}
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
            className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Profile"
            title={user?.displayName || "Profile"}
          >
            <Avatar user={user} size="sm" />
          </button>
        </div>
      </header>

      {/* Sidebar Component (Handles Desktop Sticky & Mobile Overlay Drawer) */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area & Desktop Header */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header — Top Right Corner Avatar */}
        <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-white/10 bg-[#0A0F1C]/95 px-6 backdrop-blur-md lg:flex">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">BitPal Trade Platform</span>
          </div>

          <div className="flex items-center gap-4">
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
              className="flex items-center gap-3 rounded-2xl bg-white/5 p-1.5 pr-4 text-left transition-all hover:bg-cyan-500/10 border border-white/5"
              aria-label="Profile"
            >
              <Avatar user={user} size="sm" />
              <div>
                <p className="text-xs font-semibold text-white leading-tight">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-[10px] text-cyan-400 capitalize">
                  {user?.role || "Trader"}
                </p>
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 min-w-0 overflow-x-hidden pt-20 px-3 sm:px-5 lg:pt-6 lg:px-6 lg:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;