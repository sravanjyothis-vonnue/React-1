export function Badge({ status }: any) {
  let statusColor: string | undefined;
  switch (status) {
    case "Approved":
      statusColor = "green";
      break;
    case "Pending":
      statusColor = "yellow";
      break;
    case "Rejected":
      statusColor = "red";
      break;
  }
  return (
    <div className="badgeContainer">
      <div
        className="statusCircle"
        style={{
          backgroundColor: statusColor,
          boxShadow: `0px 0px 1px 1px ${statusColor}`,
          backdropFilter: "blur(20px)",
        }}
      ></div>
      <div className="statusField">{status}</div>
    </div>
  );
}
