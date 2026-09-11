import type { NextFunction, Request, Response } from "express";
import {
  login,
  register,
  createMagicLink,
  signInwithLink,
} from "./auth.service.ts";

class auth {
  async loginController(req: Request, res: Response, next: NextFunction) {
    const token = await login(req.body);

    res.cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
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
        me: req.body.user.userId,
        role: req.body.user.role,
      },
    });
  }

  async magicLinkRequest(req: Request, res: Response, next: NextFunction) {
    await createMagicLink(req.body);
    res.status(200).json({
      message: "Magic Link created and sent",
    });
  }

  async magicLinkVerify(req: Request, res: Response, next: NextFunction) {
    const urlToken = String(req.query.token);
    const token = await signInwithLink(urlToken);

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    res.redirect(`https://preeminent-taffy-564d2c.netlify.app/?token=${token}`);
    return;
  }
}

export const authControl = new auth();
