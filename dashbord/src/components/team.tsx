import { useState } from "react";
import Header from "./header";
import { MemberSection } from "./memberSection.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.tsx";
import { useEffect } from "react";

export function Team() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    return;
  });
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
