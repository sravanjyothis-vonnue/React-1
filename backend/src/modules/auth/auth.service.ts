import "dotenv/config";
import { repository } from "./auth.repository.ts";
import {
  loginCreds,
  registerCreds,
  type loginSchema,
  type registerSchema,
} from "./auth.schema.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET || "secrect_key";

export async function login(body: loginSchema) {
  const result = loginCreds.safeParse(body);
  if (!result.success) {
    throw new Error("validation error");
  }
  const user = await repository.findUser(body.username);
  if (!user) {
    throw new Error("user is not registerd");
  }
  const isMatch = await bcrypt.compare(result.data.password, user?.password);
  if (!isMatch) {
    throw new Error("Unauthorized");
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, key, {
    expiresIn: "1h",
  });

  return token;
}

export async function register(body: registerSchema) {
  const user = await repository.findUser(body.username);
  if (user) {
    throw new Error("User already exist");
  }
  const result = registerCreds.safeParse(body);
  if (!result.success) {
    throw new Error("validation error");
  }
  const hashedPassword = bcrypt.hashSync(result.data.password, 10);
  const registerObj = {
    username: result.data.username,
    password: hashedPassword,
    role: result.data.role,
  };
  await repository.createUser(registerObj);
  return;
}
