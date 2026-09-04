import { NavLink } from "react-router-dom";

function SidebarItem({ item, isActive }) {
  return (
    <NavLink
      to={item.path}
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 font-medium transition-colors duration-200 ${
        isActive
          ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition-colors duration-200 ${
          isActive ? "bg-cyan-500/10 text-cyan-300" : "bg-white/5 text-gray-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300"
        }`}
      >
        {item.icon}
      </span>
      <span>{item.title}</span>
    </NavLink>
  );
}

export default SidebarItem;