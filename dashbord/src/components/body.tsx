import data from "../data/projectData.json";
import issues from "../data/taskData.json";
import { ProjectCard } from "./projectCard";
import { TaskCard } from "./taskCard";
import { useState } from "react";

export function Content() {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
  const showIssues = selectedIssue
    ? issues.filter((issue) => {
        return issue.projectId === selectedIssue;
      })
    : issues;

  function handleClick() {}

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
        {data.map((project) => {
          return (
            <ProjectCard
              key={project.projectId}
              title={project.title}
              description={project.description}
              badge={project.scope}
              status={project.status}
              due={project.due}
              onClick={() => setSelectedIssue(project.projectId)}
            />
          );
        })}
      </div>

      <div className="issuesHeading">
        <h2>Active Issues</h2>
        <button className="createButton">Create Issue</button>
      </div>

      <div className="Issues">
        <table className="issuesTable">
          <thead>
            <tr className="issueTableHeader">
              <th className="title">Title</th>
              <th className="project">Project</th>
              <th className="priority">Priority</th>
              <th className="assignee">Assignee</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {showIssues.length === 0 ? (
              <tr className="noDataRow">
                <td colSpan={5}>No data found</td>
              </tr>
            ) : (
              showIssues.map((issue) => {
                return (
                  <TaskCard
                    key={Math.floor(Math.random() * 100)}
                    title={issue.title}
                    project={issue.projectId}
                    priority={issue.priority as string}
                    assignee={issue.assignee}
                    onClick={() => handleClick}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
