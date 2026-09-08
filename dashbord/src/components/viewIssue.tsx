import { Header } from "./header";
import issues from "../data/taskData.json";
import { useParams } from "react-router-dom";

function handleDeleteClick() {}

function handleEditClick() {}

export function ViewIssue() {
  const { id } = useParams();
  if (id == undefined) {
    throw new Error("Id parameter is undefined");
  }
  const data = issues.find((issue) => String(issue.issueId) == id);
  if (!data) {
    throw new Error("No data found for given parameter");
  }
  return (
    <>
      <Header />
      <div className="headerContainer">
        <div className="issueTitle">{data.title}</div>
      </div>
      <div className="contentContainer">
        <div className="details">
          <div className="issueDue">
            <span className="brownText">DUE : </span>
            {data.due}
          </div>
          <div className="issueAssignee">
            <span className="brownText">ASSIGNEE : </span>
            {data.assignee}
          </div>
          <div className="issueStatus">
            <span className="brownText">STATUS : </span>
            {data.status}
          </div>
        </div>
        <div className="buttons">
          <button className="editIssue" onClick={() => handleEditClick()}>
            Edit Issue
          </button>
          <button className="deleteButton" onClick={() => handleDeleteClick()}>
            Delete Issue
          </button>
        </div>
      </div>
    </>
  );
}
