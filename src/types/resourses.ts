import { ResourceType } from "@prisma/client";

export interface ResourceInterface {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  resource?: {
    name: string;
    type: ResourceType;
  };
}

export interface ResourceForCourse extends ResourceInterface {
  courseId: string;
  resourceId: string;
}
