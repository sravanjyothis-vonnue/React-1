import crypto, { createHash } from "crypto";
import { redis } from "../config/redisConfig.ts";
const REFRESH_TTL = 60 * 60 * 24 * 30;
const REUSE_GRACE_TTL = 30;

export function hashToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}

async function storetoken(
  userId: string,
  familyId: string,
  status: "active" | "used",
  TTL: number,
) {
  const raw = crypto.randomBytes(64).toString("hex");
  const hashed = hashToken(raw);

  await redis
    .multi()
    .set(
      `refresh:${hashed}`,
      JSON.stringify({ userId: userId, status: status, familyId: familyId }),
      "EX",
      TTL,
    )
    .sadd(`family:${familyId}`, hashed)
    .expire(`family:${familyId}`, TTL)
    .sadd(`user-families:${userId}`, familyId)
    .exec();

  return raw;
}

export async function issueRefreshToken(userId: string) {
  const familyId = crypto.randomBytes(16).toString("hex");
  const token = await storetoken(userId, familyId, "active", REFRESH_TTL);
  console.log(token);
  return token;
}

export async function rotateRefreshToken(oldToken: string) {
  const oldHash = hashToken(oldToken);
  const raw = await redis.get(`refresh:${oldHash}`);

  if (!raw) {
    throw new Error("No Entry found for given key");
  }

  const { userId, familyId, status } = JSON.parse(raw);

  if (status == "used") {
    await revokeFamily(userId, familyId);
    throw new Error("REUSE_DETECTED");
  }

  await redis.set(
    `refresh:${oldHash}`,
    JSON.stringify({ userId: userId, familyId: familyId, status: "used" }),
    "EX",
    REUSE_GRACE_TTL,
  );

  const newToken = await storetoken(userId, familyId, "active", REFRESH_TTL);
  return { newToken, userId };
}

export async function revokeFamily(userId: string, familyId: string) {
  const hashes = await redis.smembers(`family:${familyId}`);
  if (hashes.length) await redis.del(...hashes.map((h) => `refresh:${h}`));
  await redis.del(`family:${familyId}`);
  await redis.srem(`user-families:${userId}`, familyId);
}
