import z from "zod";

export const loginCreds = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(7).max(20),
});

export type loginSchema = z.infer<typeof loginCreds>;

export const registerCreds = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(7).max(20),
  role: z.enum(["User", "Admin"]).default("User"),
});

export type registerSchema = z.infer<typeof registerCreds>;
