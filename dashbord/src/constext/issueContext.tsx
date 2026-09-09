import { useContext, createContext, useState, type ReactNode } from "react";

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

export async function ContextWraper({ children }: { children: ReactNode }) {
  try {
    const response = await fetch("http://localhost:4000/api/issues", {
      method: "GET",
      headers: { "Content-Type": "appliation/json" },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("fetch failed");
    }

    const issues = await response.json();
    const [issue, setIssue] = useState(issues);

    const deleteIssue = (id: number) => {
      setIssue(issue.filter((issue: Issue) => issue.issueId != id));
    };

    const createIssue = (data: Issue) => {
      setIssue((prev: any) => [...prev, data]);
    };

    const editIssue = (data: Omit<Issue, "issueId">, index: number) => {};

    return (
      <IssueContext.Provider
        value={{ deleteIssue, issue, createIssue, editIssue } as any}
      >
        {children}
      </IssueContext.Provider>
    );
  } catch (error) {
    console.error("cannot fetch request");
    return;
  }
}

export function useIssues() {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error("Context data not found");
  }
  return context;
}
