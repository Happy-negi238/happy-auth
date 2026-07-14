import z from "zod";
import BaseDto from "../../../common/dto/base.dto";

export default class SignInDto extends BaseDto {
  static schema = z.object({
    email: z.email().min(4).max(30).describe("Email id of the user"),
    password: z.string().length(8).describe("password of the user"),
  });
}
