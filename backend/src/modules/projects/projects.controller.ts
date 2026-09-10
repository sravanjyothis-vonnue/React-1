import type { NextFunction, Request, Response } from "express";
import { listProjects } from "./projects.servies.ts";

class projectsController {
  async getProjects(req: Request, res: Response, next: NextFunction) {
    const data = await listProjects();
    res.status(200).json({
      data: data,
    });
  }
}

export const projectController = new projectsController();
