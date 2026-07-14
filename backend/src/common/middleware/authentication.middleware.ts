import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import {
  verifyAccessToken,
  verifyRefreshToken,
  type TokenPayload,
} from "../utils/jwt-token";
import { db } from "../..";
import { developers } from "../db/schema";
import { eq } from "drizzle-orm";
import { compareHash } from "../../modules/user-auth/service.user";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  console.log("in middleware");
  // 1. Try Access Token
  if (accessToken) {
    try {
      console.log("access token found");
      const payload = verifyAccessToken(accessToken) as TokenPayload;

      req.user = {
        userId: payload.userId,
        email: payload.email,
      };

      return next();
    } catch (error) {
      throw ApiError.unauthorized("Invalid access token");
    }
  }

  // 2. Try Refresh Token
  if (refreshToken) {
    try {
      console.log("refresh token found");
      const payload = verifyRefreshToken(refreshToken) as TokenPayload;

      const [developerData] = await db
        .select()
        .from(developers)
        .where(eq(developers.id, payload.userId));

      if (!developerData || !developerData.refreshToken) {
        throw ApiError.unauthorized("Unauthorized access denied");
      }

      const isHashMatched = await compareHash(
        refreshToken,
        developerData.refreshToken,
      );

      if (!isHashMatched) {
        throw ApiError.badRequest("Invalid grant");
      }

      req.user = {
        userId: payload.userId,
        email: payload.email,
      };

      return next();
    } catch {
      throw ApiError.unauthorized("Invalid or expired refresh token");
    }
  }

  throw ApiError.unauthorized("Authentication required");
};
