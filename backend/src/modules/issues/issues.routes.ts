import { Router } from "express";
import { issue } from "./issues.controller.ts";

export const issueRoutes = Router();

issueRoutes.get("/issues", issue.listIssues);

issueRoutes.post("/issues", issue.createIssues);
