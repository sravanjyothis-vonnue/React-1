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
import { projectRoutes } from "./modules/projects/projects.routes.ts";
import cookieParser from "cookie-parser";

export const httpServer = express();

httpServer.use(
  cors({
    origin: [
      "https://preeminent-taffy-564d2c.netlify.app",
      "http://localhost:5173",
      "https://accounts.google.com",
    ],
    credentials: true,
  }),
);
httpServer.use(morgan("dev"));
httpServer.use(cookieParser());
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
httpServer.use("/api/projects", authentication, projectRoutes);

httpServer.use(routeNotFound);
httpServer.use(errorHandler);
