import menu from "../assets/menu-dots-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

type taskData = {
  key: string;
  title: string;
  project: number;
  priority: string;
  assignee: string;
  issueId: Number;
};

export function TaskCard({
  title,
  project,
  priority,
  assignee,
  issueId,
}: taskData) {
  const navigate = useNavigate();
  function handleClick(project: Number) {
    navigate(`/dashboard/${project}`);
  }
  return (
    <tr className="issueCard-light">
      <td className="title">{title}</td>
      <td className="taskCardProject">{project}</td>
      <td className="taskCardPriority">{priority}</td>
      <td className="taskCardAssignee">{assignee}</td>
      <td className="menu">
        <img
          src={menu}
          alt="menu"
          width={16}
          height={16}
          onClick={() => handleClick(issueId)}
        />
      </td>
    </tr>
  );
}
