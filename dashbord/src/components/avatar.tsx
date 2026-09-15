import userIcon from "../assets/user-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

export function Avatar() {
  const navigate = useNavigate();
  return (
    <div
      className="userContainer"
      onClick={() => {
        navigate("/profile");
      }}
    >
      <div className="ProfileImage">
        <img src={userIcon} alt="user" width={20} height={20} />
      </div>
      <h4>Dave</h4>
    </div>
  );
}
