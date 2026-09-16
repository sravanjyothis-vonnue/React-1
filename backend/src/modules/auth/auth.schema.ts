import z from "zod";

export const loginCreds = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(7).max(20),
});

export const registerCreds = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(7).max(20),
  role: z.enum(["User", "Admin"]).default("User"),
});

export const magicLink = z.object({
  email: z.email(),
});

export const resetLink = z.object({
  email: z.email(),
});

export const setPasswordCred = z.object({
  token: z.string().min(16),
  password: z
    .string()
    .min(7, { message: "password must contain atlest 7 character" })
    .max(20, { message: "password must not exceed 20 characters" }),
});

export type setPasswordSchema = z.infer<typeof setPasswordCred>;
export type resetSchema = z.infer<typeof resetLink>;
export type magicLinkSchema = z.infer<typeof magicLink>;
export type loginSchema = z.infer<typeof loginCreds>;
export type registerSchema = z.infer<typeof registerCreds>;
