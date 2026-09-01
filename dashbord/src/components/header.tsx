import { Avatar } from "./avatar";
import { Navbar } from "./navbar";

export function Header() {
  return (
    <div className="headerContainer">
      <Avatar />
      <Navbar />
    </div>
  );
}
