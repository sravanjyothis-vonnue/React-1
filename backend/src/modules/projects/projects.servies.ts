import { repository } from "./projects.repository.ts";

export async function listProjects() {
  return await repository.list();
}
