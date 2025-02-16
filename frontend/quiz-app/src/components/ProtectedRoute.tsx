import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // You'll need to create this context

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth(); // This will come from your auth context

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
