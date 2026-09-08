import { useState } from "react";
import { Header } from "./header.tsx";
import { MemberSection } from "./memberSection.tsx";

export function Team() {
  const [teamSearch, setTeamSearch] = useState<null | string>(null);
  return (
    <>
      <div className="header">
        <Header search={setTeamSearch} />
      </div>
      <div className="teamHeader">TEAM</div>
      <div className="teamBody">
        <MemberSection search={teamSearch} />
      </div>
    </>
  );
}
