import type { NextFunction, Request, Response } from "express";

export function errorHandler(req: Request, res: Response, next: NextFunction) {
  return next();
}

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    message: "Route not found",
  });
  return next();
}
