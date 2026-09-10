import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.ts";
import z, { ZodError } from "zod";
import jwt from "jsonwebtoken";
const { JsonWebTokenError } = jwt;

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        message: err.message,
        details: z.flattenError(err),
      },
    });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(403).json({
      error: {
        message: "Unauthorized",
        code: "UNAUTHORIZED",
      },
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      error: {
        message: err.message,
        details: err.code,
        name: err.name,
      },
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
    code: err.name,
  });
  return next();
}

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    message: "Route not found",
  });
  return next();
}
