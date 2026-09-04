import { Navigate, Route, Routes } from "react-router-dom";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import AdminLayout from "../components/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProfile from "../pages/AdminProfile";
import AdminSettings from "../pages/AdminSettings";
import AdminUsers from "../pages/AdminUsers";
import AdminRewards from "../pages/AdminRewards";
import AdminReferrals from "../pages/AdminReferrals";
import AdminNotifications from "../pages/AdminNotifications";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Navigate to="/login" replace />} />
      <Route element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="rewards" element={<AdminRewards />} />
        <Route path="referrals" element={<AdminReferrals />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
