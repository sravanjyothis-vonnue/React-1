import { useContext, createContext, useState, type ReactNode } from "react";
import issues from "../data/taskData.json";

export interface Issue {
  issueId: number;
  projectId: number;
  title: string;
  due: string;
  assignee: string;
  priority: string;
  status: string;
}

interface IssueContextType {
  issue: Issue[];
  deleteIssue: (id: number) => void;
  createIssue: (data: Issue) => void;
  editIssue: (data: Issue) => void;
}
const IssueContext = createContext<IssueContextType | null>(null);

export function ContextWraper({ children }: { children: ReactNode }) {
  const [issue, setIssue] = useState(issues);

  const deleteIssue = (id: number) => {
    setIssue(issue.filter((issue) => issue.issueId != id));
  };

  const createIssue = (data: Issue) => {
    setIssue((prev) => [...prev, data]);
  };

  const editIssue = (data: Omit<Issue, "issueId">, index: number) => {};

  return (
    <IssueContext.Provider
      value={{ deleteIssue, issue, createIssue, editIssue } as any}
    >
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error("Context data not found");
  }
  return context;
}
