import type { Response } from "express";

export default class ApiResponse {
  static ok(
    res: Response,
    data: unknown = null,
    message: string = "Data created successfully",
  ) {
    return res.status(200).json({
      message,
      data,
    });
  }
}
