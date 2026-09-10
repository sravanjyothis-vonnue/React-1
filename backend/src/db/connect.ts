import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const connection = process.env.DATABASE_URL;
if (connection == undefined) {
  throw new Error("Error fetching database connection string");
}

const adapter = new PrismaPg({
  connectionString: connection,
});

export const prisma = new PrismaClient({ adapter });
