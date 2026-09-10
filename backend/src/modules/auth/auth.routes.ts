import { authentication } from "../../middleware/authentication.ts";
import { Router } from "express";
import { authControl } from "./auth.controller.ts";

export const authRoutes = Router();

authRoutes.post("/login", authControl.loginController);

authRoutes.post("/register", authControl.registerController);

authRoutes.get("/me", authentication, authControl.meController);
