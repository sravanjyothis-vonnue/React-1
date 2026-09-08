import { Badge } from "./badge";

interface leaveCardData {
  title: string;
  period: string;
  due: number;
  status: "Approved" | "Pending" | "Rejected";
}

export function LeaveCard({ title, period, due, status }: leaveCardData) {
  return (
    <div className="leavecard">
      <div className="title">{title}</div>
      <div className="period">{period}</div>
      <div className="due">{due}</div>
      <div className="status">
        <Badge status={status} />
      </div>
    </div>
  );
}
