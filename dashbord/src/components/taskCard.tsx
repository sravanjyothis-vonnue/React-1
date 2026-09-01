import menu from "../assets/menu-dots-svgrepo-com.svg";

type taskData = {
  key: number;
  title: string;
  project: number;
  priority: string;
  assignee: string;
  onClick: () => void;
};

export function TaskCard({
  title,
  project,
  priority,
  assignee,
  onClick,
}: taskData) {
  return (
    <tr className="issueCard-light">
      <td className="title">{title}</td>
      <td className="taskCardProject">{project}</td>
      <td className="taskCardPriority">{priority}</td>
      <td className="taskCardAssignee">{assignee}</td>
      <td className="menu">
        <img src={menu} alt="menu" width={16} height={16} onClick={onClick} />
      </td>
    </tr>
  );
}
