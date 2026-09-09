import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import { prisma } from "./db/connect.ts";
import { authRoutes } from "./modules/auth/auth.routes.ts";
import { errorHandler, routeNotFound } from "./middleware/errorHandler.ts";
import cors from "cors";
import { authentication } from "./middleware/authentication.ts";
import { issueRoutes } from "./modules/issues/issues.routes.ts";

export const httpServer = express();

httpServer.use(cors({ origin: "http://localhost:5173", credentials: true }));
httpServer.use(morgan("dev"));
httpServer.use(express.json());
httpServer.use("/health", (req: Request, res: Response, next: NextFunction) => {
  const result = prisma.$executeRaw`SELECT 1`;
  if (!result) {
    res.status(500).json({
      message: "cannot connect to database",
    });
  }
  res.status(200).json({
    message: "server is healthy",
  });
});

httpServer.use("/auth", authRoutes);
httpServer.use("/api/issues", authentication, issueRoutes);

httpServer.use(routeNotFound);
httpServer.use(errorHandler);
