import { useNavigate } from "react-router-dom";
import { useAuth } from "../constext/authContext";

export function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <>
      <nav>
        <a
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Overview
        </a>
        <a
          onClick={() => {
            navigate("/team");
          }}
        >
          Team
        </a>
        <a
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Log-out
        </a>
      </nav>
    </>
  );
}
