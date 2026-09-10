import type { issuesCreateInput } from "../../generated/prisma/models.ts";
import { BadRequestError } from "../../utils/errors.ts";
import { repository } from "./issues.repository.ts";
import { issues } from "./issues.schema.ts";

export async function listData() {
  const data = await repository.list();
  return data;
}

export async function createIssue(body: issuesCreateInput) {
  const result = issues.safeParse(body);
  if (!result.success) {
    throw new BadRequestError("Validation error");
  }

  const data = {
    title: result.data.title,
    due: result.data.due,
    assignee: result.data.assignee,
    priority: result.data.priority,
    projectId: result.data.projectId,
  };
  await repository.create(data);
}
