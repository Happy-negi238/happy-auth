import type { Request, Response } from "express";
import * as service from "./service.user";
import ApiError from "../../common/utils/api-error";
import ApiResponse from "../../common/utils/api-response";

// User controller

export const clientSignUp = async (req: Request, res: Response) => {
  try {
    const result = await service.clientSignUpService(req.body);
    if (result instanceof ApiError) {
      return res.json(result);
    }

    res.cookie("developerId", result.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return ApiResponse.ok(res, result);
  } catch (error) {
    console.log("Failed to sending data..");
    return ApiError.InternalServerError("Failed to sending data..");
  }
};

export const clientSignIn = async (req: Request, res: Response) => {
  try {
    const result = await service.clientSignInService(req.body);

    if (result instanceof ApiError) {
      return res.json(result);
    }

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
      sameSite: "strict"
    })

    return ApiResponse.ok(res, result.success, "User login Successfully");
  } catch (error) {
    return ApiError.InternalServerError("Failed to sending data..");
  }
};

export const clientAuthenticate = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.user;
    const result = await service.authenticateService(userId);

    if (result instanceof ApiError) {
      return res.json(result);
    }

    return ApiResponse.ok(res, result.success);
  } catch (error) {
    return ApiError.InternalServerError("Getting error to authorize the user");
  }
};

export const clientLogout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return ApiResponse.ok(res, null, "Logout successfully");
    }

    const result = await service.logoutService(userId);

    if (result instanceof ApiError) {
      return res.status(result.statusCode).json({
        message: result.message,
        data: null,
      });
    }

    return ApiResponse.ok(res, result.success, "Logout successfully");
  } catch (error) {
    return ApiError.InternalServerError("Failed to logout user");
  }
};
