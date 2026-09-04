import { Bell } from "lucide-react";
import NotificationCard from "../components/Alerts/NotificationCard";
import alerts from "../data/alerts";

function Alerts() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-white">
            <Bell className="text-cyan-400 shrink-0" size={28} />
            Price &amp; Market Alerts
          </h1>

          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Configure real-time notifications.
          </p>
        </div>

        <button className="bg-cyan-500 px-4 py-2.5 sm:px-5 sm:py-2 rounded-xl text-black font-bold text-sm sm:text-base whitespace-nowrap hover:bg-cyan-400 transition">
          + Create New Alert
        </button>
      </div>

      {/* Alert List */}
      <div className="grid gap-3 sm:gap-4">
        {alerts.map((alert) => (
          <NotificationCard
            key={alert.id}
            icon={alert.icon}
            title={alert.title}
            description={alert.description}
            status={alert.status}
          />
        ))}
      </div>
    </div>
  );
}

export default Alerts;