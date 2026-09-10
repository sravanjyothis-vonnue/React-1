import { z } from "zod";
import data from "../data/projectData.json";

let project_id: number[] = [];
data.forEach((project) => {
  project_id.push(project.projectId);
});

export const taskSchema = z.object({
  title: z.string().min(5).max(30),
  projectId: z
    .number()
    .nonnegative()
    .refine((val) => project_id.includes(val), {
      message: "Please enter a valid project ID\n",
    }),
  due: z.date().min(new Date(), { message: "Due date cannot be in the past" }),
  assignee: z.string().min(5).max(30),
  priority: z.enum(["High", "Medium", "Low"]),
});

export type tasksForm = z.infer<typeof taskSchema>;
