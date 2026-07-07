import z from "zod";
import BaseDto from "../../../common/dto/base.dto";

export default class RegisterDto extends BaseDto {
  static schema = z.object({
    appName: z.string().max(20).describe("Application name"),
    appUrl: z.url().describe("URL of the application"),
    redirectUri: z.url().describe("Redirect uri of the application"),
  });
}
