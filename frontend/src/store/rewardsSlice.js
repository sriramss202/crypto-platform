import { createSlice } from "@reduxjs/toolkit";
import badgesData, { USER_EPOCH_POINTS } from "../data/badges";

// Initial missions example data (can be replaced with API data later)

const initialMissions = [
  { id: 1, title: "Complete First Trade", description: "Execute your first trade", points: 200, completed: false },
  { id: 2, title: "Login Today", description: "Open the app and check the market", points: 100, completed: false },
  { id: 3, title: "Execute 3 Trades", description: "Execute three trades across any markets", points: 250, completed: false },
  { id: 4, title: "Refer a Friend", description: "Invite a friend to join the platform", points: 500, completed: false },
  { id: 5, title: "Achieve 7-Day Streak", description: "Log in and trade for 7 consecutive days", points: 300, completed: false },
  { id: 6, title: "Reach Silver Badge", description: "Earn enough points to reach the Silver Badge", points: 400, completed: false },
];

const BADGE_THRESHOLDS = [
  { id: 1, name: "Scout", points: 0 },
  { id: 2, name: "Speculator", points: 1000 },
  { id: 3, name: "Risk Taker", points: 3000 },
  { id: 4, name: "Opportunity Hunter", points: 7000 },
  { id: 5, name: "Position Architect", points: 12000 },
  { id: 6, name: "Yield Conqueror", points: 18000 },
  { id: 7, name: "Alpha Generator", points: 25000 },
  { id: 8, name: "Volatility Rider", points: 35000 },
  { id: 9, name: "Capital Commander", points: 50000 },
];

const initialState = {
  epochPoints: USER_EPOCH_POINTS || 0,
  completedMissions: 0,
  progress: 0, // percent 0-100
  currentBadge: "Scout", // default starting badge
  selectedBadge: badgesData.find((b) => b.name === "Scout") || badgesData[0],
  activeTab: "daily",
  missions: initialMissions,
  badges: badgesData,
};

/**
 * Helper: compute current badge based on epochPoints
 */
function computeBadgeFromPoints(points) {
  // iterate thresholds highest to lowest to pick the highest unlocked
  for (let i = BADGE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= BADGE_THRESHOLDS[i].points) return BADGE_THRESHOLDS[i].name;
  }
  return BADGE_THRESHOLDS[0].name;
}

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    // Mark a mission as completed and update points/progress/badge
    completeMission(state, action) {
      const id = action.payload;

      const idx = state.missions.findIndex((m) => m.id === id);

      if (idx === -1) return;

      const mission = state.missions[idx];

      if (mission.completed) return; // ignore if already completed

      // Use immutable updates via RTK (immer) but keep logic explicit
      state.missions[idx] = { ...mission, completed: true };

      state.epochPoints += mission.points;

      state.completedMissions += 1;

      // Update progress as fraction of missions completed
      const total = state.missions.length;
      state.progress = Math.round((state.completedMissions / total) * 100);

      // Check badge unlock
      const newBadge = computeBadgeFromPoints(state.epochPoints);
      state.currentBadge = newBadge;
    },

    
claimReward(state, action) {
  const id = action.payload;

  const badge = state.badges.find((b) => b.id === id);
  if (!badge) return;

  if (badge.claimed) return; // already claimed, ignore

  badge.claimed = true;
  // Optional: track it separately too
  // state.claimedRewards.push(id);
},

    // Set which badge is currently selected/viewed
    setSelectedBadge(state, action) {
      state.selectedBadge = action.payload;
    },

    // Set which tab is active (e.g. 'daily', 'missions', 'badges')

    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { completeMission, claimReward, setSelectedBadge, setActiveTab } =
  rewardsSlice.actions;

export default rewardsSlice.reducer;