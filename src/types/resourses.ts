import { ResourceType } from "@prisma/client";

export interface ResourceInterface {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
