import React from "react";

function NotificationCard({
  icon: Icon,
  title,
  description,
  status,
  }) {
  return (
    <div className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="p-2.5 sm:p-3 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0">
          <Icon size={22} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg text-white truncate">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-400 truncate">
            {description}
          </p>
        </div>
      </div>

      <span className="text-[11px] sm:text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-emerald-500/20 font-medium shrink-0">
        {status}
      </span>
    </div>
  );
}

export default NotificationCard;