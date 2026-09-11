import "dotenv/config";
import { repository } from "./auth.repository.ts";
import {
  loginCreds,
  magicLink,
  registerCreds,
  type loginSchema,
  type magicLinkSchema,
  type registerSchema,
} from "./auth.schema.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticationError, BadRequestError } from "../../utils/errors.ts";
import { redis } from "../../config/redisConfig.ts";
import crypto from "crypto";
import { sendMail } from "../../utils/mails.ts";

const key = process.env.JWT_SECRET || "secrect_key";

export async function login(body: loginSchema) {
  const result = loginCreds.safeParse(body);
  if (!result.success) {
    throw new BadRequestError("Validation error");
  }
  console.log(result.data);
  const user = await repository.findUser(body.username);
  if (!user) {
    throw new Error("User not Found");
  }
  const isMatch = await bcrypt.compare(result.data.password, user?.password);
  if (!isMatch) {
    throw new authenticationError("authentication failed");
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

function hashedToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createMagicLink(body: magicLinkSchema) {
  const TOKEN_TTL = 15 * 60;
  const result = magicLink.safeParse(body);
  if (!result.success) {
    throw new BadRequestError("Validation error");
  }
  const user = await repository.findUser(result.data.email);
  if (!user) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const hashToken = hashedToken(token);

  await redis.set(`magicLink:${hashToken}`, user.id, "EX", TOKEN_TTL);

  const link = `${process.env.APP_URL}/auth/magic-link/verify?token=${token}`;

  sendMail({
    to: result.data.email,
    subject: "Your Login Link",
    html: link,
  });
}

export async function signInwithLink(token: string) {
  const hashToken = hashedToken(token);
  const isUser = await redis.get(`magicLink:${hashToken}`);
  if (!isUser) {
    throw new Error("invalid or expired link");
  }

  const user = await repository.findUserWithId(isUser);
  if (!user) {
    throw new Error("User not found");
  }

  const jwtToken = jwt.sign({ userId: isUser, role: user.role }, key, {
    expiresIn: "1h",
  });
  return jwtToken;
}
