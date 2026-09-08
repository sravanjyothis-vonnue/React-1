import { Header } from "./header";
import issues from "../data/taskData.json";
import { useParams } from "react-router-dom";

export function ViewIssue() {
  const { id } = useParams();
  if (id == undefined) {
    throw new Error("Id parameter is undefined");
  }
  const data = issues.filter((issue) => String(issue.issueId) == id);
  if (data.length == 0) {
    throw new Error("No data found for given parameter");
  }
  return (
    <>
      <Header />
      <div className="headerContainer">
        <div className="issueTitle">{data[0].title}</div>
      </div>
      <div className="contentContainer">
        <div className="details">
          <div className="issueDue">
            <span className="brownText">DUE : </span>
            {data[0].due}
          </div>
          <div className="issueAssignee">
            <span className="brownText">ASSIGNEE : </span>
            {data[0].assignee}
          </div>
          <div className="issueStatus">
            <span className="brownText">STATUS : </span>
            {data[0].status}
          </div>
        </div>
        <div className="buttons">
          <button className="editIssue">Edit Issue</button>
          <button className="deleteButton">Delete Issue</button>
        </div>
      </div>
    </>
  );
}
