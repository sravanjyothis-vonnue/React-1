import { prisma } from "../../db/connect.ts";
import type { issuesUncheckedCreateInput } from "../../generated/prisma/models.ts";

class issueRepository {
  async list() {
    return await prisma.issues.findMany({
      where: {},
    });
  }

  async create(data: issuesUncheckedCreateInput) {
    await prisma.issues.create({ data });
  }
}

export const repository = new issueRepository();
