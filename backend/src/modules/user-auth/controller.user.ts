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

    return ApiResponse.ok(res, result);
  } catch (error) {
    console.log("Failed to sending data..");
    return ApiError.InternalServerError("Failed to sending data..");
  }
};
