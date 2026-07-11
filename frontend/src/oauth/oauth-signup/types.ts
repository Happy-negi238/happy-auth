import { z } from "zod";

export const OauthSignUpZod = z.object({
  fullName: z.string().min(2, "Name is required").max(20),
  email: z.email("Invalid email address").min(4).max(30),
  password: z.string().length(8, "Password must be 8 characters"),
  phone: z
    .string()
    .length(10, "Phone number 10 digits"),
});

export type OauthSignUpTypes = z.infer<typeof OauthSignUpZod>;
