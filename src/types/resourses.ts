import { ResourceType } from "@prisma/client";

export interface ResourceInterface {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceForCourse extends ResourceInterface {
  courseId: string;
  resourceId: string;
}
