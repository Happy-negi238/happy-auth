import { z } from "zod";

export const RegisterTypeZod = z.object({
  appName: z.string().max(20).describe("Application name"),
  appUrl: z.url().describe("URL of the application"),
  redirectUri: z.url().describe("Redirect uri of the application"),
});

export type RegisterTypeZodTypes = z.infer<typeof RegisterTypeZod>;
