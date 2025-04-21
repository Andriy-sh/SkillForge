import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signupSchema = authSchema.extend({
  name: z.string().min(2),
});

export type AuthSchema = z.infer<typeof authSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
