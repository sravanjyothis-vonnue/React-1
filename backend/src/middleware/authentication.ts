import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.body == undefined) {
    req.body = {};
  }
  const barear =
    req.headers["authorization"]?.split(" ")[1] || req.cookies?.jwt;
  const key = process.env.JWT_SECRET;
  if (key == undefined) {
    throw new Error("cannot fetch secrect key");
  }
  const isMatch = jwt.verify(barear, key);
  req.body.user = isMatch;
  return next();
}
