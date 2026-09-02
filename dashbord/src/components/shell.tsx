import { Content } from "./body.tsx";
import { Header } from "./header.tsx";
import { useState } from "react";

export function Shell() {
  const [search, setSearch] = useState<null | string>(null);
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
