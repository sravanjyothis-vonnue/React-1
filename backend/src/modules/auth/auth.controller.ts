import type { NextFunction, Request, Response } from "express";
import {
  login,
  register,
  createMagicLink,
  signInwithLink,
  refreshAccessToken,
  resetPassword,
  setNewPassword,
} from "./auth.service.ts";
import {
  issueRefreshToken,
  rotateRefreshToken,
} from "../../utils/refreshTokens.ts";
import { string } from "zod";
import { BadRequestError } from "../../utils/errors.ts";

class auth {
  async loginController(req: Request, res: Response, next: NextFunction) {
    const { token, userId } = await login(req.body);

    const refreshToken = await issueRefreshToken(userId);

    res.cookie("refresh", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/auth/refresh",
      partitioned: true,
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
      path: "/auth/refresh",
      maxAge: 60 * 60 * 1000,
    });

    res.redirect(`https://preeminent-taffy-564d2c.netlify.app/?token=${token}`);
    return;
  }

  async refreshController(req: Request, res: Response, next: NextFunction) {
    try {
      const token =
        req.cookies.refresh || req.headers["authorization"]?.split(" ")[1];

      if (!token) throw new Error("No token provided");

      const { newToken, userId } = await rotateRefreshToken(token);

      const accessToken = await refreshAccessToken(userId);

      res.cookie("refresh", newToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/auth/refresh",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "token refreshed",
        token: accessToken,
      });
    } catch (error: any) {
      if (error.message == "REUSE_DETECTED") {
        res.clearCookie("refresh");
        res.status(401).json({
          message: "session invalid please login again",
        });
      } else {
        res.clearCookie("refresh");
        res.status(401).json({
          message: "Invalid session",
        });
      }
    }
  }

  async forgotController(req: Request, res: Response, next: NextFunction) {
    resetPassword(req.body);
    res.status(200).json({
      message: "Email sent successfully",
    });
  }

  async resetGetController(req: Request, res: Response, next: NextFunction) {
    const token = req.query.reset;
    if (!token) {
      throw new Error("Token not found");
    }
    res.redirect(`http://localhost:5173/reset/?token=${token}`);
  }

  async resetController(req: Request, res: Response, next: NextFunction) {
    await setNewPassword(req.body);
    res.status(201).json({
      message: "password reset",
    });
  }

  async googleAuthController(req: Request, res: Response, next: NextFunction) {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri:
        "https://8t6gkm38-4000.inc1.devtunnels.ms/auth/google/callback",
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });

    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    );
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    const { code } = req.query;

    if (!code || code !== "string") {
      throw new BadRequestError("Invalid query string");
    }

    res.redirect("http://localhost:5173/");
  }
}

export const authControl = new auth();
