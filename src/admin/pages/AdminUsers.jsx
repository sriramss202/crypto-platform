import FeatureTablePage from "../components/FeatureTablePage";
import { users } from "../data/adminMockData";

export default function AdminUsers() {
  return <FeatureTablePage eyebrow="User management" title="Users" description="A UI-only review surface for registered users. Search, filters, sorting, pagination, and actions use local presentation data only." entityName="Users" columns={[{ key: "id", label: "ID" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "joined", label: "Joined" }, { key: "status", label: "Status" }]} rows={users} />;
}
