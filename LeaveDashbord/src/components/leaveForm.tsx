import { useRef, useState } from "react";

export function LeaveForm({ setLeave }: any) {
  const [startError, setMissingError] = useState("");
  const [endError, setinPastError] = useState("");
  interface LeaveEntry {
    title: FormDataEntryValue | null;
    period: string;
    due: number;
    status: string;
  }
  const formRef = useRef<HTMLFormElement>(null);

  function handleClick(data: FormData) {
    const startRaw = data.get("start");
    const endRaw = data.get("end");

    if (!startRaw || !endRaw) {
      console.error("Missing start or end date");
      setMissingError("Missing start or end dates");
      setinPastError("Missing start or end date");
      return;
    }

    if (startRaw > endRaw) {
      console.error("start date cannot be before end date");
      setinPastError("end date cannot be before start date");
      return;
    }

    const startDate = new Date(startRaw as string);
    const startMonthDay = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endDate = new Date(endRaw as string);
    const endMonthDay = endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const due = Math.round(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const leaveObj: LeaveEntry = {
      title: data.get("type"),
      period: `${startMonthDay} - ${endMonthDay}`,
      due,
      status: "Pending",
    };

    setMissingError("");
    setinPastError("");
    setLeave((prev: LeaveEntry[]) => [...prev, leaveObj]);
  }
  return (
    <div className="formContainer">
      <div className="submitHeader">SUBMIT REQUEST</div>
      <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="typeSelect">LEAVE TYPE</label>
        <select id="typeSelect" name="type">
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Personal Time">Personal Time</option>
        </select>
        <label htmlFor="startDate">START DATE</label>
        <input type="date" id="startDate" name="start" />
        <p className="error">{startError}</p>
        <label htmlFor="endDate">END DATE</label>
        <input type="date" id="endDate" name="end" />
        <p className="error">{endError}</p>
        <label htmlFor="notes">NOTES(optional)</label>
        <input
          type="input"
          id="notes"
          placeholder="Brief Description..."
          name="des"
        />
        <button
          className="confirmBtn"
          onClick={() => {
            if (formRef.current) {
              handleClick(new FormData(formRef.current));
            }
          }}
        >
          CONFIRM REQUEST
        </button>
      </form>
    </div>
  );
}
