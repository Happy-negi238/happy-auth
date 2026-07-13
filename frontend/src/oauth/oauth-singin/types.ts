import { z } from "zod";

export const OauthSignInZod = z.object({
  email: z.email("Invalid email address").min(4).max(30),
  password: z.string().length(8, "Password must be 8 characters"),
});

export type OauthSignInTypes = z.infer<typeof OauthSignInZod>;
