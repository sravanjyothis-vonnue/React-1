import { DashbordCard } from "./dashbordCard";
import data from "../data/overview.json";
import leaveData from "../data/leaveData.json";
import { useId } from "react";
export function Dashbord() {
  let totalPending = 0;
  leaveData.forEach((leave) => {
    if (leave.status == "Pending") {
      totalPending += leave.due;
    }
  });
  return (
    <div className="cardContainer">
      {data.map((data) => {
        const id = useId();
        if (data.title == "PENDING") {
          data.count = totalPending;
        }
        return (
          <DashbordCard
            key={id}
            title={data.title}
            subtitle={data.subtitle}
            count={data.count}
            description={data.description}
            marked={data.marked}
          />
        );
      })}
    </div>
  );
}
