import image from "../assets/gift-habeshaw-qJT4x-PgKq0-unsplash.jpg";
import { Avatar } from "./avatar";
import { Navbar } from "./navbar";
export function Profile() {
  return (
    <>
      <div className="headerContainer">
        <Avatar />
        <Navbar />
      </div>
      <div className="profileBody">
        <div className="profileContainer">
          <div className="profileContent">
            <div className="nameContainer">Hi There,</div>
            <div className="user">DAVE</div>
            <div className="userAbout">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
              cupiditate at repellat odio, voluptatibus aliquid? Sed aperiam
              voluptate maiores dolorem. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Consectetur molestiae perspiciatis voluptatum
              aliquam eius nisi fugit sequi debitis beatae sapiente.
            </div>
          </div>
          <div className="profileImage">
            <img src={image} alt="profile image" width={400} height={400} />
          </div>
        </div>

        <div className="personalDetails">
          <div className="emailContainer">
            <div className="detailsHeader">Email</div>
            <div className="email">someone@gmail.com</div>
          </div>
          <div className="phoneContainer">
            <div className="detailsHeader">Phone</div>
            <div className="phone">+18 5146874351</div>
          </div>
          <div id="locationContainer">
            <div className="detailsHeader">Location</div>
            <div className="location">Kerala</div>
          </div>
          <div className="roleContainer">
            <div className="detailsHeader">Role</div>
            <div className="role">Enginering Manager</div>
          </div>
        </div>
      </div>
    </>
  );
}
