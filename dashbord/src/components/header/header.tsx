import Avatar from "../avatar";
import { Navbar } from "../navbar";
import { Search } from "../search";

export default function Header({ search }: any) {
  return (
    <div className="headerContainer">
      <Avatar />
      <Search setSearch={search} />
      <Navbar />
    </div>
  );
}
