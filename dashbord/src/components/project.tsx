import { ProjectCard } from "./projectCard";
import data from "../data/projectData.json";
import { MarqueeRow } from "./marque.tsx";

export function ProjectSection({ onSelected, search }: any) {
  const searchedProject = search
    ? data.filter((project) => project.title.includes(search))
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
          {searchedProject.map((project) => (
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
