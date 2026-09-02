import { useRef } from "react";

export function Filter({ onSetStatus, onSetPriority, onSetSort }: any) {
  let state = useRef<boolean>(true);
  function handleClick() {
    if (state.current) {
      onSetSort("desc");
    } else {
      onSetSort("asc");
    }
    state.current = !state.current;
  }
  function handlePriority(value: string) {
    onSetPriority(value);
  }
  function handleStatus(value: string) {
    onSetStatus(value);
  }
  return (
    <>
      <div className="filterContainer">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label htmlFor="status">Status ::</label>
          <select
            name="Status"
            id="status"
            onChange={(e) => {
              handleStatus(e.target.value);
            }}
          >
            <option value="none">None</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Blocked">Blocked</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label htmlFor="priority">Priority ::</label>
          <select
            name="Priority"
            id="priority"
            onChange={(e) => handlePriority(e.target.value)}
          >
            <option value="none">None</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button className="sort" id="sort" onClick={() => handleClick()}>
          Sort
        </button>
      </div>
    </>
  );
}
