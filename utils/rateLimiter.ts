import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function applyRateLimit(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0].trim();
  const windowSeconds = 60; // 1-minute window
  const maxRequests = 2; // Allow 3 requests per minute

  if (!ip) return;

  const key = `rate-limit:${ip}`;
  const currentCount = (await redis.get<number>(key)) || 0;

  if (currentCount >= maxRequests) {
    throw new Error("Too many requests, please try again later.");
  }

  await redis.setex(key, windowSeconds, currentCount + 1); // Increment count & set expiry
}



