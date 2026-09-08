import { LeaveCard } from "./leaveCard";
import { LeaveForm } from "./leaveForm";

export function LeaveSchema({ status, setStatus }: any) {
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

          {status.map((leaveData: any, i: any) => {
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
      <LeaveForm setLeave={setStatus} />
    </div>
  );
}
