import type { NextFunction, Request, Response } from "express";
import { login } from "./auth.service.ts";
import { register } from "./auth.service.ts";

class auth {
  async loginController(req: Request, res: Response, next: NextFunction) {
    const token = await login(req.body);

    res.cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({
      message: "user logged -in",
      token: token,
    });
  }

  async registerController(req: Request, res: Response, next: NextFunction) {
    await register(req.body);
    res.status(201).json({
      message: "user Created",
    });
  }

  async meController(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      message: {
        me: req.body.userId,
        role: req.body.role,
      },
    });
  }
}

export const authControl = new auth();
