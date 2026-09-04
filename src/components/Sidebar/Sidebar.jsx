import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
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
    // Filter out Profile and Alerts on mobile drawer
    const filteredMenu = sidebarData.filter((item) => {
      if (isMobile) {
        return item.title !== "Profile" && item.title !== "Alerts";
      }
      return true;
    });

    return (
      <div className="flex h-full w-72 flex-col border-r border-white/10 bg-[#0A0F1C]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6 md:p-8">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Bit<span className="text-cyan-400">Pal</span>
            </h1>
            <p className="mt-1 text-sm text-gray-400">Crypto Trade</p>
          </div>

          {/* Close Button on Mobile */}
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6 md:px-5">
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

        {/* Logout & Premium */}
        <div className="space-y-4 border-t border-white/10 p-5 md:p-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

          <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-md md:p-5">
            <h2 className="text-base font-semibold text-white md:text-lg">
              Premium
            </h2>
            <p className="mt-2 text-xs text-gray-400 md:text-sm">
              Unlock advanced trading tools.
            </p>
            <button className="mt-4 w-full rounded-xl bg-cyan-500 py-2.5 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400 md:mt-5 md:py-3">
              Upgrade
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
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer content */}
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
