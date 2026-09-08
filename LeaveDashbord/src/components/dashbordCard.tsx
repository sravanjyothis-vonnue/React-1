interface cardTypes {
  title: string;
  subtitle: string;
  count: number;
  description: string;
  marked: boolean;
}

export function DashbordCard({
  title,
  subtitle,
  count,
  description,
  marked,
}: cardTypes) {
  return (
    <>
      <div className={marked ? "availableCardMarked" : "availableCard"}>
        <div className="cardHeading">
          <div>{title}</div>
          <div>{subtitle}</div>
        </div>
        <div className="cardBody">
          <div className="daysLeft">
            {title === "USED" ? 24 - count : count}
          </div>
          <div className="description">{description}</div>
        </div>
      </div>
    </>
  );
}
