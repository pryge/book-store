import { useAuth } from "@/context";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAdmin || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
