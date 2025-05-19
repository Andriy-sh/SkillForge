import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is require" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export const signupSchema = authSchema.extend({
  name: z
    .string({ required_error: "Name is require" })
    .min(4)
    .max(16, "Name must be at most 16 characters long"),
  email: z.string({ required_error: "Email is require" }).email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export type AuthSchema = z.infer<typeof authSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
