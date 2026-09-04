import badgesData from "../../../data/badges";
import { useRedux } from "../../../hooks/useRedux";
import { setSelectedBadge } from "../../../store/rewardsSlice";
import BadgeCard from "./BadgeCard";
import BadgeProgress from "./BadgeProgress";
import BadgeTimeline from "./BadgeTimeline";

function Badges({ activeTab, setActiveTab }) {
  const { state, dispatch } = useRedux((state) => state.rewards);
  const { selectedBadge, badges, epochPoints } = state;
  const badgeList = badges?.length ? badges : badgesData;

  const currentBadge =
    badgeList.find((b) => b.status === "current") ||
    badgeList.find((b) => b.name === "Scout") ||
    selectedBadge;

  const currentBadgeIndex = badgeList.findIndex((b) => b.id === currentBadge.id);

  const nextBadge = currentBadgeIndex >= 0 && currentBadgeIndex < badgeList.length - 1
    ? badgeList[currentBadgeIndex + 1]
    : null;

  const handleSelectBadge = (badge) => {
    dispatch(setSelectedBadge(badge));
  };

  return (
    <div className="flex flex-col gap-6 text-white font-sans antialiased">
      <BadgeCard
        currentBadge={currentBadge}
        selectedBadge={selectedBadge}
        nextBadge={nextBadge}
        onSelectBadge={handleSelectBadge}
      />

      <BadgeProgress
        totalPoints={epochPoints}
        currentBadge={currentBadge}
        nextBadge={nextBadge}
        selectedBadge={selectedBadge}
      />

      <BadgeTimeline
        badges={badgeList}
        selectedBadge={selectedBadge}
        onSelectBadge={handleSelectBadge}
      />
    </div>
  );
}

export default Badges;