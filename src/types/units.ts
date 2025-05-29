import { ContentType } from "@prisma/client";

export interface Unit {
  id: string;
  title: string;
  type: ContentType;
  order: number;
  moduleId: string;
  body?: string | null;
  videoUrl?: string | null;
  assetUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
