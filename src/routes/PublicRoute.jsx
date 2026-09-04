import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function PublicRoute({ children }) {

  // If the user is already logged in,
  // don't allow access to Login/Register pages.
  const user = getCurrentUser();
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/app"} replace />;
  }

  // Otherwise render the requested page.
  return children;
}

export default PublicRoute;
