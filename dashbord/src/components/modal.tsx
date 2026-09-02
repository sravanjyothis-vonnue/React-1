import { Box, Modal } from "@mui/material";
import { taskSchema } from "./taskSchema";
import { toast } from "sonner";

function handleSubmit(formData: any, setOpen: any, onSubmit: any) {
  let issueData = {
    projectId: Number(formData.get("projectId")),
    title: formData.get("issue"),
    due: new Date(formData.get("due")),
    assignee: formData.get("assignee"),
    priority: formData.get("priority"),
    status: "Pending",
  };

  const result = taskSchema.safeParse(issueData);
  if (!result.success) {
    const messages = result.error.issues
      .map((issues) => issues.message)
      .join("\n");
    toast.error(messages, { duration: 3000 });
    throw new Error("Validation failed");
  }

  onSubmit((prev: any) => [...prev, issueData]);
  setOpen(false);
}

export function ModalOverlay({ open, setOpen, onSubmit }: any) {
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
            <input
              className="formInput"
              type="text"
              name="priority"
              id="priority1"
              placeholder="Issue Priority"
            />
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
                alert("Are you sure?");
                setOpen(false);
              }}
            >
              Close
            </button>
            <button
              className="formButton"
              onClick={() => {
                let data = new FormData(
                  document.getElementById("inputForm") as HTMLFormElement,
                );
                handleSubmit(data, setOpen, onSubmit);
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
