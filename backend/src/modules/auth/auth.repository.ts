import { prisma } from "../../db/connect.ts";
import type { user } from "../../generated/prisma/client.ts";

class authRepository {
  async findUser(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  }

  async createUser(data: Omit<user, "id" | "createdAt">) {
    return await prisma.user.create({ data });
  }

  async findUserWithId(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async changePassword(newPassword: string, id: string) {
    const update = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: newPassword,
      },
    });
    return;
  }
}

export const repository = new authRepository();
