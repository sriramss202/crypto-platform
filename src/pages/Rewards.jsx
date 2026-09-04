import DailyHeader from "../components/Rewards/Header/DailyHeader";
import WeeklyHeader from "../components/Rewards/Header/WeeklyHeader";
import MilestoneHeader from "../components/Rewards/Header/MilestoneHeader";
import ReferralHeader from "../components/Rewards/Header/ReferralHeader";

// Navigation
import RewardsLayout from "../components/Rewards/Navigation/RewardsLayout";

// Content
import DailyMissions from "../components/Rewards/Daily/DailyMissions";
import WeeklyMissions from "../components/Rewards/Weekly/WeeklyMissions";
import Milestones from "../components/Rewards/Milestones/Milestones";
import Referrals from "../components/Rewards/Referrals/Referrals";
import Badges from "../components/Rewards/Badges/Badges";

import { useRedux } from "../hooks/useRedux";
import { setActiveTab } from "../store/rewardsSlice";

function Rewards() {
  const { state, dispatch } = useRedux((state) => state.rewards);
  const activeTab = state.activeTab;

  const handleTabChange = (value) => {
    dispatch(setActiveTab(value));
  };

  const renderHeader = () => {
    switch (activeTab) {
      case "daily":
        return <DailyHeader />;

      case "weekly":
        return <WeeklyHeader />;

      case "milestones":
        return <MilestoneHeader />;

      case "referrals":
        return <ReferralHeader activeTab={activeTab} setActiveTab={handleTabChange} />;

      case "badges":
        return null;

      default:
        return <DailyHeader />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "daily":
        return <DailyMissions />;

      case "weekly":
        return <WeeklyMissions />;

      case "milestones":
        return <Milestones />;

      case "referrals":
        return <Referrals />;

      case "badges":
        return <Badges activeTab={activeTab} setActiveTab={handleTabChange} />;

      default:
        return <DailyMissions />;
    }
  };

  return (
    <RewardsLayout
      activeTab={activeTab}
      setActiveTab={handleTabChange}
      header={renderHeader()}
    >
      {renderContent()}
    </RewardsLayout>
  );
}

export default Rewards;