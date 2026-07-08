import z from "zod";
import BaseDto from "../../../common/dto/base.dto";

export default class clientSignUpDto extends BaseDto {
  static schema = z.object({
    fullName: z.string().max(30).describe("User full name"),
    email: z.email().min(4).max(30).describe("User email address"),
    password: z.string().length(8).describe("User password"),
  });
}
