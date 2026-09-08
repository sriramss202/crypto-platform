import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, X, Sparkles } from "lucide-react";
import SidebarItem from "./SidebarItem";
import sidebarData from "./sidebarData";
import { logout } from "../../utils/auth";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleLogout = () => {
    logout();
    if (setMobileOpen) setMobileOpen(false);
    navigate("/login");
  };

  const handleItemClick = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  const renderSidebarContent = (isMobile) => {
    const filteredMenu = sidebarData.filter((item) => {
      if (isMobile) {
        return item.title !== "Profile" && item.title !== "Alerts";
      }
      return true;
    });

    return (
      <div className="flex h-full w-72 flex-col border-r border-white/10 bg-[#070c1b]/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6 md:p-8 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl flex items-center gap-2">
              Bit<span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">Pal</span>
            </h1>
            <p className="mt-1 text-xs text-gray-400 flex items-center gap-1">
              <Sparkles size={12} className="text-cyan-400 animate-pulse" /> Crypto Trade Suite
            </p>
          </div>

          {/* Close Button on Mobile */}
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="rounded-xl p-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-4 py-5 md:px-5 admin-scroll-container">
          {filteredMenu.map((item) => {
            const isActive =
              item.path === "/app"
                ? pathname === "/app"
                : pathname === item.path || pathname.startsWith(`${item.path}/`);

            return (
              <div key={item.title} onClick={handleItemClick}>
                <SidebarItem item={item} isActive={isActive} />
              </div>
            );
          })}
        </nav>

        {/* Logout & Premium Pro Card */}
        <div className="shrink-0 space-y-3.5 border-t border-white/10 p-4 sm:p-5 backdrop-blur-xl">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 font-medium text-gray-300 transition-all duration-300 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
          >
            <LogOut size={18} />
            <span className="text-sm font-semibold">Logout</span>
          </button>

          {/* Fixed Premium Pro Card */}
          <div className="shrink-0 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/15 via-[#0c162b]/80 to-purple-600/15 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                Premium
              </h2>
              <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                Pro
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-300 font-medium">
              Unlock real-time AI signals &amp; advanced trading tools.
            </p>
            <button className="mt-3.5 w-full rounded-xl border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95">
              Upgrade Account
            </button>
          </div>
        </div>
      </div>

    );
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 h-full w-72 shadow-2xl">
            {renderSidebarContent(true)}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col transition-all duration-300 lg:flex">
        {renderSidebarContent(false)}
      </aside>
    </>
  );
}

export default Sidebar;

