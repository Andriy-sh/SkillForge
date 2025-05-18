import { z } from "zod";

export const userId = z.object({
  id: z
    .string()
    .min(1, "User ID is required")
    .max(24, "User ID must be at most 24 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "User ID must be alphanumeric"),
});
export type UserId = z.infer<typeof userId>;

export const userEmail = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export type UserEmail = z.infer<typeof userEmail>;
export const userName = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(24, "Name must be at most 24 characters long"),
});
export type UserName = z.infer<typeof userName>;

export const userPassword = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  oldPassword: z.string().min(1, "Old Password is required"),
});

export type UserPassword = z.infer<typeof userPassword>;

export const userBio = z.object({
  bio: z.string().max(160, "Bio must be at most 160 characters long"),
});
export type UserBio = z.infer<typeof userBio>;

export const userCity = z.object({
  city: z.string().max(50, "City must be at most 50 characters long"),
});
export type UserCity = z.infer<typeof userCity>;
