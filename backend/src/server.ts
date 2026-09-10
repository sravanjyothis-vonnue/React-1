import { httpServer } from "./app.ts";
import { prisma } from "./db/connect.ts";

const PORT = 4000;
const server = httpServer.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});

async function shutdown(signal: NodeJS.Signals) {
  console.log("\nAttumpting gracefull shutdown...");
  server.close(async (err) => {
    if (err) {
      process.exit(1);
    }

    try {
      await prisma.$disconnect();
      console.log("closeing all db connections...");
      process.exit(0);
    } catch (error) {
      console.log("could not close all db connections...");
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.log("Forcing shutdown");
    process.exit(1);
  }, 9000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
