import FeatureTablePage from "../components/FeatureTablePage";
import { referralRows } from "../data/adminMockData";

export default function AdminReferrals() {
  return <FeatureTablePage eyebrow="Rewards" title="Referrals" description="A UI management view corresponding to the existing user referral screen. It contains isolated mock records only; no referral data is read or written." entityName="Referrals" columns={[{ key: "id", label: "ID" }, { key: "referrer", label: "Referrer" }, { key: "referred", label: "Referred user" }, { key: "joined", label: "Joined" }, { key: "reward", label: "Reward" }, { key: "status", label: "Status" }]} rows={referralRows} statusOptions={["All", "Completed", "Pending"]} />;
}
