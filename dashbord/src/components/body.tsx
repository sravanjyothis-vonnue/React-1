import { IssueSection } from "./issuesSection";
import { useState } from "react";
import { ProjectSection } from "./project";
import { Toaster } from "sonner";

export function Content({ search }: any) {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  return (
    <>
      <ProjectSection onSelected={setSelectedIssue} search={search} />
      <IssueSection selectedIssue={selectedIssue} />
      <Toaster
        position="top-right"
        style={{
          background: "#ffffff",
          color: "#fff",
          border: "1px solid #333",
        }}
      />
    </>
  );
}
