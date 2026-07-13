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

  // 1. Try Access Token
  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken) as TokenPayload;

      req.user = {
        userId: payload.userId,
        email: payload.email,
      };

      return next();
    } catch (error) {
      return ApiError.unauthorized("Invalid access token");
    }
  }

  // 2. Try Refresh Token
  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken) as TokenPayload;

      const [developerData] = await db
        .select()
        .from(developers)
        .where(eq(developers.id, payload.userId));

      if(!developerData || !developerData.refreshToken){
        return ApiError.unauthorized("Unauthorized access denied");
      }

      const isHashMatched = await compareHash(refreshToken, developerData.refreshToken);

      if(!isHashMatched){
        return ApiError.badRequest("Invalid grant")
      }
      
      req.user = {
        userId: payload.userId,
        email: payload.email,
      };

      return next();
    } catch {
      ApiError.unauthorized("Invalid or expired refresh token");
    }
  }

  ApiError.unauthorized("Authentication required");
};
