import { useRef } from "react";
import { Bell, Plus } from "lucide-react";
import NotificationCard from "../components/Alerts/NotificationCard";
import alerts from "../data/alerts";
import { useUserGSAP } from "../hooks/useUserGSAP";

function Alerts() {
  const containerRef = useRef(null);

  // Hook GSAP stagger animations
  useUserGSAP(containerRef);

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Market Signals
          </p>
          <h1 className="gsap-hero-title text-2xl sm:text-3xl font-extrabold flex items-center gap-3 text-white mt-1">
            <Bell className="text-cyan-400 shrink-0 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" size={28} />
            Price & Market Alerts
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Configure real-time automated notifications.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/40 px-5 py-3 rounded-2xl text-cyan-300 font-bold text-sm backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap">
          <Plus size={18} /> Create New Alert
        </button>
      </div>

      {/* Alert List */}
      <div className="grid gap-3 sm:gap-4">
        {alerts.map((alert) => (
          <div key={alert.id} data-gsap="fade-up">
            <NotificationCard
              icon={alert.icon}
              title={alert.title}
              description={alert.description}
              status={alert.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;