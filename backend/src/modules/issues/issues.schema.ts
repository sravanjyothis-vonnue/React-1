import z from "zod";
import { prisma } from "../../db/connect.ts";

const projects = await prisma.projects.findMany({
  where: {},
});

const project_id: number[] = projects.map((project) => {
  return project_id.push(project.projectId);
});

export const issues = z.object({
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

export type issuesSchema = z.infer<typeof issues>;
