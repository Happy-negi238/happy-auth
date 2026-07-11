import type { NextFunction, Request, Response } from "express";
import {
  type JwtPayload,
} from "jsonwebtoken";
import ApiError from "../utils/api-error";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt-token";

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

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // 1. Try Access Token
  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken) as JwtPayload;
        
      req.user = {
        userId: payload.userId,
        email: payload.email,
      };

      return next();
    } catch (error) {
      
        ApiError.unauthorized("Invalid access token");
    }
  }

  // 2. Try Refresh Token
  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken) as JwtPayload;

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
