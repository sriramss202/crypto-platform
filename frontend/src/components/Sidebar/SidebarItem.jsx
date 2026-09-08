import { NavLink } from "react-router-dom";

function SidebarItem({ item, isActive }) {
  return (
    <NavLink
      to={item.path}
      className={`group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 font-medium transition-all duration-300 ${
        isActive
          ? "border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-xl"
          : "text-gray-400 hover:border hover:border-white/10 hover:bg-white/[0.06] hover:text-white hover:backdrop-blur-md"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition-all duration-300 ${
          isActive
            ? "bg-cyan-400/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            : "bg-white/5 text-gray-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300"
        }`}
      >
        {item.icon}
      </span>
      <span className="tracking-wide text-sm font-semibold">{item.title}</span>
    </NavLink>
  );
}

export default SidebarItem;