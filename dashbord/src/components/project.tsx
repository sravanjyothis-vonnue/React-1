import { ProjectCard } from "./projectCard";
import { MarqueeRow } from "./marque.tsx";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.tsx";

interface dataSchema {
  projectId: number;
  status: string;
  due: string;
  title: string;
  scope: string;
  description: string;
}
[];

export function ProjectSection({ onSelected, search }: any) {
  const { user, token } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!user) return;
    fetch("https://8t6gkm38-4000.inc1.devtunnels.ms/api/projects", {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => setData(json.data))
      .catch(() => setData([]));
  }, []);

  const searchedProject = search
    ? data.filter((project: dataSchema) => project.title.includes(search))
    : data;

  return (
    <>
      <div className="bodyHeader">
        <h2>Active Projects</h2>
        <p>
          Managing the core architectural foundations and ongoing feature
          sprints.
        </p>
      </div>

      <div className="projects">
        <MarqueeRow>
          {searchedProject.map((project: dataSchema) => (
            <ProjectCard
              key={project.projectId}
              title={project.title}
              description={project.description}
              badge={project.scope}
              status={project.status}
              due={project.due}
              onClick={() => onSelected(project.projectId)}
            />
          ))}
        </MarqueeRow>
      </div>
    </>
  );
}
