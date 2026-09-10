import { MemberCard } from "./memberCard";
import data from "../data/teamData.json";

export function MemberSection({ search }: any) {
  const searchedData = search
    ? data.filter((teamMember) => {
        return teamMember.name.includes(`${search}`);
      })
    : data;
  console.log(searchedData);
  return (
    <>
      {searchedData.map((teamMember, i) => {
        return (
          <MemberCard
            key={i}
            name={teamMember.name}
            src={teamMember.src}
            role={teamMember.role}
          />
        );
      })}
    </>
  );
}
