import userIcon from "../assets/user-svgrepo-com.svg";

function handleClick() {
  window.location.href = "/profile";
}

export function Avatar() {
  return (
    <div className="userContainer" onClick={handleClick}>
      <div className="ProfileImage">
        <img src={userIcon} alt="user" width={20} height={20} />
      </div>
      <h4>Dave</h4>
    </div>
  );
}
