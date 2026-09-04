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

  const missionData =
    activeTab === "daily" ? dailyMissions : weeklyMissions;

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-5 sm:p-8">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Missions
            </h2>
            <p className="mt-1 sm:mt-2 text-sm text-gray-400">
              Complete missions and earn XP rewards.
            </p>
          </div>
          <button
            onClick={() => setShowPopup(true)}
            className="group rounded-xl bg-cyan-500 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400">
            <span className="flex items-center gap-2">
              View All
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </span>
          </button>

        </div>

        {/* Tabs */}

        <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4">

          <button
            onClick={() => setActiveTab("daily")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold transition

            ${
              activeTab === "daily"
                ? "bg-cyan-500 text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >

            <FaTasks />
            Daily
          </button>

          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold transition

            ${
              activeTab === "weekly"
                ? "bg-cyan-500 text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <FaCalendarWeek />
            Weekly
          </button>

        </div>

        {/* Mission List */}

        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/20 bg-[#08111F] p-5 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                All Missions
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-3xl text-gray-400 hover:text-white">
               ×           
              </button>
            </div>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
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