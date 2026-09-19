import { useState } from "react";
import { useIssues } from "../context/issueContext";
import { Filter } from "./filter";
import { TaskCard } from "./taskCard";
import { ModalOverlay } from "./modal";

function handleClick({ setOpen }: any) {
  setOpen(true);
}

export function IssueSection({ selectedIssue }: any) {
  const { issue } = useIssues();
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [sort, setSort] = useState("asc");
  const [open, setOpen] = useState(false);

  const sorted =
    sort == "asc"
      ? [...issue].sort((a, b) => a.title.localeCompare(b.title))
      : [...issue].sort((a, b) => b.title.localeCompare(a.title));

  const showIssues = selectedIssue
    ? sorted.filter((issue) => {
        return issue.projectId === selectedIssue;
      })
    : sorted;

  const statusSorted =
    status == "none"
      ? showIssues
      : status
        ? showIssues.filter((issue) => {
            console.log(issue.status, status);
            return issue.status == status;
          })
        : showIssues;

  const prioritySorted =
    priority == "none"
      ? statusSorted
      : priority
        ? statusSorted.filter((issue) => issue.priority == priority)
        : statusSorted;

  return (
    <>
      <div className="issuesHeading">
        <h2>Active Issues</h2>
        <button
          className="createButton"
          onClick={() => handleClick({ setOpen })}
        >
          Add +
        </button>
      </div>
      <Filter
        onSetStatus={setStatus}
        onSetPriority={setPriority}
        onSetSort={setSort}
      />
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
            {prioritySorted.length === 0 ? (
              <tr className="noDataRow">
                <td colSpan={5}>No data found</td>
              </tr>
            ) : (
              prioritySorted.map((issue) => {
                return (
                  <TaskCard
                    key={`${issue.title}-${issue.projectId}`}
                    title={issue.title}
                    project={issue.projectId}
                    priority={issue.priority as string}
                    assignee={issue.assignee}
                    issueId={issue.issueId}
                  />
                );
              })
            )}
          </tbody>
        </table>
        <ModalOverlay open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
