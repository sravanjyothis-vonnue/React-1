import { LeaveCard } from "./leaveCard";
import { LeaveForm } from "./leaveForm";
import leaveData from "../data/leaveData.json";
import { useState } from "react";

export function LeaveSchema() {
  const [leavestatus, setLeavesStatus] = useState(leaveData);
  return (
    <div className="leaveBody">
      <div className="leaveContainer">
        <div className="requestHistory">REQUEST HISTORY</div>
        <div className="leaveTable">
          <div className="leaveStatsTable">
            <div className="title">TYPE</div>
            <div className="period">PERIOD</div>
            <div className="due">DURATION</div>
            <div className="status">STATUS</div>
          </div>

          {leavestatus.map((leaveData, i) => {
            return (
              <LeaveCard
                key={i}
                title={leaveData.title}
                period={leaveData.period}
                due={leaveData.due}
                status={leaveData.status as "Approved" | "Pending" | "Rejected"}
              />
            );
          })}
        </div>
      </div>
      <LeaveForm setLeave={setLeavesStatus} />
    </div>
  );
}
