import type { Request, Response } from "express";
import * as service from "./service.user";
import ApiResponse from "../../common/utils/api-response";

// User controller

export const clientSignUp = async (req: Request, res: Response) => {
  const result = await service.clientSignUpService(req.body);

  res.cookie("developerId", result.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return ApiResponse.ok(res, result);
};

export const clientSignIn = async (req: Request, res: Response) => {
  const result = await service.clientSignInService(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 60 * 1000, // 10 minutes
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("developerId", result.developerId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return ApiResponse.ok(res, result.success, "User login Successfully");
};

export const clientAuthenticate = async (req: Request, res: Response) => {
  const { userId, email } = req.user;
  const result = await service.authenticateService(userId);

  return ApiResponse.ok(res, result.success);
};

export const clientLogout = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return ApiResponse.ok(res, null, "Logout successfully");
  }

  const result = await service.logoutService(userId);
  return ApiResponse.ok(res, result.success, "Logout successfully");
};
