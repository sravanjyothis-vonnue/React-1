import { Content } from "./body.tsx";
import { Header } from "./header.tsx";

export function Shell() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <Content />
      </div>
    </>
  );
}
