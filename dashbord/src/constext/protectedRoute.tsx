import { useAuth } from "./authContext";
import { Outlet, useNavigate } from "react-router-dom";

export function ProtectedRoute() {
  const navigate = useNavigate();
  const { me } = useAuth();
  if (!me || me == "User") {
    navigate("/");
  }
  return <Outlet />;
}
