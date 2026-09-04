import { forwardRef } from "react";

const TabButton = forwardRef(function TabButton(
  { icon: Icon, label, value, activeTab, setActiveTab },
  ref
) {
  const active = activeTab === value;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setActiveTab(value)}
      className={`
        relative z-10 flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold
        transition-all duration-200 ease-out sm:rounded-full sm:px-5 sm:py-2.5 sm:text-sm
        ${
          active
            ? "text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"
            : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
        }
      `}
    >
      <Icon
        size={16}
        className={`shrink-0 transition-all duration-200 ${
          active
            ? "scale-110 text-cyan-300 stroke-[2.5]"
            : "text-slate-500 group-hover:text-slate-300"
        }`}
      />
      <span className="whitespace-nowrap tracking-wide">{label}</span>
    </button>
  );
});

TabButton.displayName = "TabButton";

export default TabButton;