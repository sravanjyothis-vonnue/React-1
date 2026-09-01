import userIcon from "../assets/user-svgrepo-com.svg";

export function Avatar() {
  return (
    <div className="userContainer">
      <div className="ProfileImage">
        <img src={userIcon} alt="user" width={20} height={20} />
      </div>
      <h4>Dave</h4>
    </div>
  );
}
