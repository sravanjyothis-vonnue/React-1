import { Box, Modal } from "@mui/material";
import { taskSchema } from "./taskSchema";
import { toast } from "sonner";
import { useIssues } from "../constext/issueContext";

export function ModalOverlay({ open, setOpen }: any) {
  const { createIssue } = useIssues();
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "400px",
    height: "600px",
    color: "whitesmoke",
    border: "1px solid #535c5783",
    borderRadius: "50px",
    padding: "20px",
  };

  async function handleSubmit(formData: any, setOpen: any) {
    let issueData = {
      projectId: Number(formData.get("projectId")),
      issueId: Math.floor(Math.random() * 100),
      title: formData.get("issue"),
      due: new Date(formData.get("due")),
      assignee: formData.get("assignee"),
      priority: formData.get("priority"),
      status: "Pending",
    };

    const result = taskSchema.safeParse(issueData);
    if (!result.success) {
      result.error.issues.forEach((issues) =>
        toast.error(`${String(issues.path[0])} : ${issues.message}`, {
          duration: 6000,
        }),
      );
      return;
    }

    const data = {
      projectId: result.data.projectId,
      issueId: issueData.issueId,
      title: result.data.title,
      due: result.data.due.toLocaleDateString(),
      assignee: result.data.assignee,
      priority: result.data.priority,
      status: "Pending",
    };
    const dataDB = {
      projectId: result.data.projectId,
      issueId: issueData.issueId,
      title: result.data.title,
      due: result.data.due,
      assignee: result.data.assignee,
      priority: result.data.priority,
      status: "Pending",
    };
    createIssue(data);
    try {
      const response = await fetch("http://localhost:4000/api/issues", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataDB),
      });

      if (!response.ok) {
        throw new Error("Faild to create data");
      }
    } catch (error) {
      console.error(error);
      return;
    }
    toast("Issue Added successfully", { duration: 3000 });
    setOpen(false);
  }

  return (
    <>
      <Modal open={open} className="addForm" onClose={() => setOpen(false)}>
        <Box sx={style}>
          <h2 style={{ marginBottom: "30px" }}>
            <u>New Issue</u>
          </h2>
          <form id="inputForm">
            <label className="formLabel" htmlFor="issue">
              Issue :
            </label>
            <input
              className="formInput"
              type="text"
              name="issue"
              id="issue"
              placeholder="Enter title for issue"
            />
            <label className="formLabel" htmlFor="due">
              Due :
            </label>
            <input
              className="formInput"
              type="date"
              name="due"
              id="due"
              placeholder="Task Due"
            />
            <label className="formLabel" htmlFor="assignee">
              Assignee :
            </label>
            <input
              className="formInput"
              type="text"
              name="assignee"
              id="assignee"
              placeholder="Issue Assigneed to"
            />
            <label className="formLabel" htmlFor="priority1">
              Priority :
            </label>
            <select id="priority1" name="priority">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <label className="formLabel" htmlFor="priority1">
              Project Id :
            </label>
            <input
              className="formInput"
              type="text"
              name="projectId"
              id="projectId"
              placeholder="Project Id"
            />
          </form>

          <div className="buttonContainer">
            <button
              className="formButton"
              onClick={() => {
                const status = window.confirm("Are you sure?");
                if (status) {
                  setOpen(false);
                }
              }}
            >
              Close
            </button>
            <button
              className="formButton"
              id="submitButton"
              onClick={() => {
                let data = new FormData(
                  document.getElementById("inputForm") as HTMLFormElement,
                );

                handleSubmit(data, setOpen);
              }}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
