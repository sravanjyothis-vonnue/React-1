import { Badge } from "./badge.tsx";

type projectData = {
  title: string;
  description: string;
  badge: string;
  status: string;
  due: string;
  onClick: () => void;
};

export function ProjectCard({
  title,
  description,
  badge,
  status,
  due,
  onClick,
}: projectData) {
  return (
    <div className="card" onClick={onClick}>
      <div className="cardTop">
        <div className="cardHeader">
          <div className="shapes">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

          <div className="info">
            <div className="status">{status}</div>
            <div className="schedule">{due}</div>
          </div>
        </div>

        <div className="titleAndBadge">
          <div className="title">
            <h3>{title}</h3>
          </div>
          <Badge text={badge} />
        </div>
      </div>

      <div className="cardBottom">
        <div className="description">{description}</div>
      </div>
    </div>
  );
}
