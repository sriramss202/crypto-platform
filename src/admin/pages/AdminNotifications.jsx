import FeatureTablePage from "../components/FeatureTablePage";
import { notificationRows } from "../data/adminMockData";

export default function AdminNotifications() {
  return <FeatureTablePage eyebrow="Market alerts" title="Notifications" description="A UI management view for the price and market-alert concepts currently displayed to users. These records are static design data only." entityName="Notifications" columns={[{ key: "id", label: "ID" }, { key: "title", label: "Alert" }, { key: "condition", label: "Condition" }, { key: "status", label: "Status" }]} rows={notificationRows} statusOptions={["All", "Active", "Pending"]} />;
}
