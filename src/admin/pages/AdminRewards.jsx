import FeatureTablePage from "../components/FeatureTablePage";
import { rewardRows } from "../data/adminMockData";

export default function AdminRewards() {
  return <FeatureTablePage eyebrow="Rewards" title="Missions & rewards" description="Manages the mission and reward concepts already shown in the user rewards screens. Entries are visual mock data until persistence is designed." entityName="Rewards" columns={[{ key: "id", label: "ID" }, { key: "name", label: "Mission / reward" }, { key: "type", label: "Type" }, { key: "reward", label: "Value" }, { key: "status", label: "Status" }]} rows={rewardRows} />;
}
