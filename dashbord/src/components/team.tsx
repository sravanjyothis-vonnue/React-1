import { useState } from "react";
import { Header } from "./header.tsx";
import { MemberSection } from "./memberSection.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../constext/authContext.tsx";
import { useEffect } from "react";

export function Team() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState<null | string>(null);
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
