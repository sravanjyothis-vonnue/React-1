import { LeaveSchema } from "./leaveSchema";
import { Header } from "./header";
import { Dashbord } from "./dashbordSchema";
import leaveData from "../data/leaveData.json";
import { useState } from "react";
export function Body() {
  const [leavestatus, setLeavesStatus] = useState(leaveData);
  return (
    <>
      <Header />
      <Dashbord leaveData={leavestatus} />
      <LeaveSchema status={leavestatus} setStatus={setLeavesStatus} />
    </>
  );
}
