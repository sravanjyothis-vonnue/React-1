import z from "zod";

export const issues = z.object({
  title: z.string().min(5).max(30),
  projectId: z.number().nonnegative(),
  due: z.string(),
  assignee: z.string().min(5).max(30),
  priority: z.enum(["High", "Medium", "Low"]),
});

export type issuesSchema = z.infer<typeof issues>;
