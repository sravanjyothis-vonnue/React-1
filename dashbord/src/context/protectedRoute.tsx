import { useAuth } from "./authContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { me } = useAuth();
  if (me === "User") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
