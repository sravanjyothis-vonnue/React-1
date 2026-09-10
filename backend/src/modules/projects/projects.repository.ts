import { prisma } from "../../db/connect.ts";

class projectRepository {
  async list() {
    return await prisma.projects.findMany({
      where: {},
    });
  }
}

export const repository = new projectRepository();
