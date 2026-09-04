import {
  InviteFriendsCard,
  ReferralStats,
  InstantRewardCard,
  HowItWorks,
  ReferralTierCard,
  ReferralHistory,
  MotivationBanner,
} from "../Referral";

function Referrals() {
  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <InviteFriendsCard />
        <ReferralStats />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <InstantRewardCard />
        <HowItWorks />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ReferralTierCard title="Tier 1" threshold="5" reward="1,000 pts" />
        <ReferralTierCard title="Tier 2" threshold="25" reward="5,000 pts" />
        <ReferralTierCard title="Tier 3" threshold="100" reward="25,000 pts" />
      </div>

      <ReferralHistory />
      <MotivationBanner />
    </div>
  );
}

export default Referrals;