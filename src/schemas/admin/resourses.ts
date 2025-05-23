import { z } from "zod";
import { ResourceType } from "@prisma/client";

export const resourseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.nativeEnum(ResourceType),
});
export type ResourseSchema = z.infer<typeof resourseSchema>;
