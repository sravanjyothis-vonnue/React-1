import type { NextFunction, Request, Response } from "express";
import { listData, createIssue } from "./issues.service.ts";

class issuesController {
  async listIssues(req: Request, res: Response, next: NextFunction) {
    const data = listData();
    res.status(200).json({
      data: data,
    });
  }

  async createIssues(req: Request, res: Response, next: NextFunction) {
    createIssue(req.body);
    res.status(201).json({
      message: "issue Created",
    });
  }
}

export const issue = new issuesController();
