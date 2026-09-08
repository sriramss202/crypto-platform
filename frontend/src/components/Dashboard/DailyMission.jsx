import { useState } from "react";
import MissionCard from "./MissionCard";
import { FaTasks, FaCalendarWeek, FaArrowRight } from "react-icons/fa";

const dailyMissions = [
  {
    id: 1,
    title: "Connect Wallet",
    description: "Connect your crypto wallet.",
    reward: "+50 XP",
    progress: "Completed",
  },
  {
    id: 2,
    title: "Complete 5 Trades",
    description: "Trade any token 5 times.",
    reward: "+100 XP",
    progress: "3 / 5",
  },
  {
    id: 3,
    title: "Invite One Friend",
    description: "Invite a new user.",
    reward: "+200 XP",
    progress: "Pending",
  },
];

const weeklyMissions = [
  {
    id: 4,
    title: "Trade Volume $5000",
    description: "Reach trading volume.",
    reward: "+500 XP",
    progress: "55%",
  },
  {
    id: 5,
    title: "Refer 5 Friends",
    description: "Invite five new users.",
    reward: "+1000 XP",
    progress: "2 / 5",
  },
];

function DailyMission() {
  const [activeTab, setActiveTab] = useState("daily");
  const [showPopup, setShowPopup] = useState(false);

  const missionData = activeTab === "daily" ? dailyMissions : weeklyMissions;

  return (
    <>
      <div
        data-gsap="fade-up"
        className="rounded-3xl border border-white/10 bg-[#081020]/40 p-5 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Platform Missions
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Complete active challenges and unlock reward points.
            </p>
          </div>
          <button
            onClick={() => setShowPopup(true)}
            className="group rounded-2xl border border-cyan-400/40 bg-cyan-500/20 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-bold text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 hover:scale-105 hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
          >
            <span className="flex items-center gap-2">
              View All
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-3 sm:mt-8 sm:gap-4">
          <button
            onClick={() => setActiveTab("daily")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all duration-300 sm:text-sm ${
              activeTab === "daily"
                ? "border border-cyan-400/40 bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md"
                : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaTasks />
            Daily Missions
          </button>

          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all duration-300 sm:text-sm ${
              activeTab === "weekly"
                ? "border border-cyan-400/40 bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md"
                : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaCalendarWeek />
            Weekly Challenges
          </button>
        </div>

        {/* Mission List */}
        <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
          {missionData.map((mission) => (
            <MissionCard
              key={mission.id}
              title={mission.title}
              description={mission.description}
              reward={mission.reward}
              progress={mission.progress}
            />
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-[#070e1c]/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] admin-scroll-container">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                All Available Missions
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-3xl text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              {missionData.map((mission) => (
                <MissionCard
                  key={mission.id}
                  title={mission.title}
                  description={mission.description}
                  reward={mission.reward}
                  progress={mission.progress}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DailyMission;