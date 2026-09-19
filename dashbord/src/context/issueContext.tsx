import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./authContext";

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

export function Datafetch({ children }: { children: ReactNode }) {
  const { user, token, setToken } = useAuth();
  const [issue, setIssue] = useState<Issue[]>([]);

  useEffect(() => {
    if (!user) return;
    async function fetchApi() {
      try {
        const response = await fetch(
          "https://8t6gkm38-4000.inc1.devtunnels.ms/api/issues",
          {
            headers: {
              Authorization: `Barear ${token}`,
            },
          },
        );
        if (!response.ok) {
          setIssue([]);
          throw new Error("Cannot fetch data");
        }
        const data = await response.json();
        setIssue(data.data);
      } catch (error) {
        const response = await fetch("http://localhost:4000/auth/refresh", {
          credentials: "include",
        });
        const newToken = await response.json();
        setToken(newToken);
      }
    }
    fetchApi();
  }, []);

  const deleteIssue = (id: number) => {
    if (issue == null) {
      throw new Error("Issues empty");
    }
    setIssue(issue.filter((issue: Issue) => issue.issueId != id));
  };

  const createIssue = (data: Issue) => {
    setIssue((prev: Issue[]) => [...prev, data]);
  };

  const editIssue = (_data: Omit<Issue, "issueId">, _index: number) => {};

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
