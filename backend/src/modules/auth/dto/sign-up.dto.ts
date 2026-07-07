import z from "zod";
import BaseDto from "../../../common/dto/base.dto";

export default class SignUpDto extends BaseDto {
  static schema = z.object({
    name: z.string().min(2).max(20).describe("Full name of the user"),
    email: z.email().min(4).max(30).describe("Email id of the user"),
    phone: z.string().length(10).describe("Phone of the phone number"),
    password: z.string().length(10).describe("password of the user"),
  });
}
