import type { Response, Request } from "express";
import * as service from "./service.auth";
import ApiResponse from "../../common/utils/api-response";
import RegisterDto from "./dto/register.dto";
import z from "zod";
import type SignUpDto from "./dto/sign-up.dto";
import type SignInDto from "./dto/sign-in.dto";
import ApiError from "../../common/utils/api-error";

export type RegisterBody = z.infer<typeof RegisterDto.schema>;
export type SignUpBody = z.infer<typeof SignUpDto.schema>;
export type SignInBody = z.infer<typeof SignInDto.schema>;

// OATH Controller
export const registerController = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) => {
  const developerId: string | undefined = req.cookies.developerId;

  if (!developerId) {
    return ApiError.notFound("Developer ID not found in cookies.")
  }

  const result = await service.registerService(req.body, developerId);
  return ApiResponse.ok(res, result);
};

export const signUpController = async (
  req: Request<{}, {}, SignUpBody>,
  res: Response,
) => {
  const { client_id } = req.query as { client_id: string };

  const { email, name, phone } = await service.signUpService(
    req.body,
    client_id,
  );

  return ApiResponse.ok(res, { email, name, phone });
};

export const signInController = async (
  req: Request<{}, {}, SignInBody>,
  res: Response,
) => {
  const { client_id } = req.query as { client_id: string };

  const result = await service.singInService(req.body, client_id);
  return ApiResponse.ok(res, result);
};

export const tokenController = async (req: Request, res: Response) => {
  const { code } = req.query as { code: string };

  try {
    const result = await service.tokenService(req.body, code);
    return ApiResponse.ok(res, result);
  } catch (error) {
    if (error instanceof Error) {
      throw ApiError.InternalServerError(error.message);
    }

    throw ApiError.noContent("Failed to generate token");
  }
};

export const certController = async (req: Request, res: Response) => {
  const result = await service.certService();
  return res.json({ result: [result] });
};
