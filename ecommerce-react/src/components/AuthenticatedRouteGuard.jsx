import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// Allows signed-in users through and redirects guests to login.
function AuthenticatedRouteGuard({ children }) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default AuthenticatedRouteGuard;
