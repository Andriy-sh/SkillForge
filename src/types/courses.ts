import { CourseLevel, CourseType, CourseStatus } from "@prisma/client";
import { ResourceInterface } from "./resourses";

export interface CourseInterface {
  id: string;
  name: string;
  description: string;
  level: CourseLevel | null;
  type: CourseType | null;
  status: CourseStatus;
  duration: number | null;
  image: string | null;
  instructorId: string | null;
  price: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseWithResourceInterface {
  courseId: string;
  resourceId: string;
  resource: ResourceInterface;
  course: CourseInterface;
}
