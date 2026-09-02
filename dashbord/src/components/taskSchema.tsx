import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(5).max(30),
  projectId: z.number().nonnegative(),
  due: z.date().min(new Date(), { message: "Due date cannot be in the past" }),
  assignee: z.string().min(5).max(30),
  priority: z.enum(["High", "Medium", "Low"]),
});

export type tasksForm = z.infer<typeof taskSchema>;
