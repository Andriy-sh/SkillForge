import { z } from "zod";

export const userId = z.object({
  id: z
    .string()
    .min(1, "User ID is required")
    .max(30, "User ID must be at most 30 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "User ID must be alphanumeric"),
});
export type UserId = z.infer<typeof userId>;
