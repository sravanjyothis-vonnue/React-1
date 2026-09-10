import { Router } from "express";
import { projectController } from "./projects.controller.ts";

export const projectRoutes = Router();

projectRoutes.get("/", projectController.getProjects);
