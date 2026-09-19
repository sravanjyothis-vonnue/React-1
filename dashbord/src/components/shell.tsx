import { useAuth } from "../context/authContext.tsx";
import { Content } from "./body.tsx";
import Header from "./header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Shell() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const [search, setSearch] = useState<null | string>(null);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    return;
  });
  return (
    <>
      <div className="header">
        <Header search={setSearch} />
      </div>
      <div className="body">
        <Content search={search} />
      </div>
    </>
  );
}
