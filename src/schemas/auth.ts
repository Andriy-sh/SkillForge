import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is require" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is require" })
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long"),
});

export const signupSchema = authSchema.extend({
  name: z
    .string({ required_error: "Name is require" })
    .min(4)
    .max(16, "Name must be at most 16 characters long"),
  email: z.string({ required_error: "Email is require" }).email(),
  password: z
    .string({ required_error: "Password is require" })
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long"),
});

export type AuthSchema = z.infer<typeof authSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
