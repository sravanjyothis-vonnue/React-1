import { Router } from "express";
import { issue } from "./issues.controller.ts";

export const issueRoutes = Router();

issueRoutes.get("/", issue.listIssues);

issueRoutes.post("/", issue.createIssues);
