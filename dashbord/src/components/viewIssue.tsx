import Header from "./header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useIssues } from "../context/issueContext";

export function ViewIssue() {
  const navigate = useNavigate();
  const { deleteIssue, issue } = useIssues();
  const { id } = useParams();

  if (id == undefined) {
    throw new Error("Id parameter is undefined");
  }

  const issueData = issue.find((issue) => String(issue.issueId) == id);

  if (!issueData) {
    throw new Error("No data found for given parameter");
  }

  function handleDeleteClick(issueId: number) {
    deleteIssue(issueId);
    navigate("/dashbord");
    return;
  }

  function handleEditClick() {}

  return (
    <>
      <Header />
      <div className="headerContainer">
        <div className="issueTitle">{issueData.title}</div>
      </div>
      <div className="contentContainer">
        <div className="details">
          <div className="issueDue">
            <span className="brownText">DUE : </span>
            {issueData.due}
          </div>
          <div className="issueAssignee">
            <span className="brownText">ASSIGNEE : </span>
            {issueData.assignee}
          </div>
          <div className="issueStatus">
            <span className="brownText">STATUS : </span>
            {issueData.status}
          </div>
        </div>
        <div className="buttons">
          <button className="editIssue" onClick={() => handleEditClick()}>
            Edit Issue
          </button>
          <button
            className="deleteButton"
            onClick={() => handleDeleteClick(issueData.issueId)}
          >
            Delete Issue
          </button>
        </div>
      </div>
    </>
  );
}
