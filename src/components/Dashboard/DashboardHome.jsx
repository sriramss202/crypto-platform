import StatsCards from "./StatsCards";
import RankCard from "./RankCard";
import DailyMission from "./DailyMission";
import TopTraders from "./TopTraders";
import InviteEarn from "./InviteEarn";
import ConnectX from "./ConnectX";

function DashboardHome() {
  return (
    <div className="w-full space-y-5 sm:space-y-6 max-w-[1500px] mx-auto">
      {/* Top Row: Stats + Rank Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="col-span-1 sm:col-span-1 lg:col-span-3">
          <StatsCards type="trading" />
        </div>

        <div className="col-span-1 sm:col-span-1 lg:col-span-3">
          <StatsCards type="epoch" />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-6">
          <RankCard />
        </div>
      </div>

      {/* Middle Row: Missions + Top Traders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="col-span-1 lg:col-span-8">
          <DailyMission />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <TopTraders />
        </div>
      </div>

      {/* Bottom Row: Invite & Earn + Connect X */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <InviteEarn />
        <ConnectX />
      </div>
    </div>
  );
}

export default DashboardHome;