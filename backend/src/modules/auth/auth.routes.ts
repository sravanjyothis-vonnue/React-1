import { authentication } from "../../middleware/authentication.ts";
import { Router } from "express";
import { authControl } from "./auth.controller.ts";

export const authRoutes = Router();

authRoutes.post("/login", authControl.loginController);

authRoutes.post("/register", authControl.registerController);

authRoutes.post("/magic-link", authControl.magicLinkRequest);

authRoutes.get("/magic-link/verify", authControl.magicLinkVerify);

authRoutes.post("/refresh", authControl.refreshController);

authRoutes.post("/forgot", authControl.forgotController);

authRoutes.patch("/reset", authControl.resetController);

authRoutes.get("/reset", authControl.resetGetController);

authRoutes.get("/google", authControl.googleAuthController);

authRoutes.get("google/callback", authControl.googleCallback);

authRoutes.get("/me", authentication, authControl.meController);
