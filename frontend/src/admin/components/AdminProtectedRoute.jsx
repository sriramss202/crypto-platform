import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";

export default function AdminProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/app" replace />;
  }

  return children;
}
