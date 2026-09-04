import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

import BitPalTrade from "../pages/BitPalTrade";
import Dashboard from "../pages/Dashboard";
import Rewards from "../pages/Rewards";
import Alerts from "../pages/Alerts";
import Profile from "../pages/Profile";
import AdminRoutes from "../admin/routes/AdminRoutes";

// Layout
import AppLayout from "../layouts/AppLayout";

// Route Guards
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* ================= PUBLIC ROUTES ================= */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Landing Page */}
        <Route index element={<BitPalTrade />} />

        {/* Sidebar Pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default AppRoutes;
