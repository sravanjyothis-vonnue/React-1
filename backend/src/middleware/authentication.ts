import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const barear = req.headers["authorization"]?.split(" ")[1] || "";
    const key = process.env.JWT_SECRET;
    if (key == undefined) {
      throw new Error("cannot fetch secrect key");
    }
    const isMatch = jwt.verify(barear, key);
    req.body = isMatch;
  } catch (error) {
    next(error);
  }
  return next();
}
