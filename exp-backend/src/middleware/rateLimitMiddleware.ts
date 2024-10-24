import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import logger from "../logs/logger";

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  points: 4, // 4 points (requests)
  duration: 10 * 60, // 10 minutes in seconds
});

// Wait time configuration
const waitTime = 60 * 60; // 1 hour in seconds

export const RateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientIp = req.ip || "0.0.0.0"; 

  try {
    await rateLimiter.consume(clientIp);
    logger.info(`Request allowed for IP: ${clientIp}`);
    next();
  } catch (error) {
    const retryAfter = Math.ceil(waitTime); // Retry after 1 hour

    // Log rate limit exceeded error
    logger.warn(
      `Rate limit exceeded for IP: ${clientIp}. Please try again later.`
    );

    return res.status(429).json({
      message: "Too many requests. Please try again later.",
      retryAfter,
    });
  }
};
