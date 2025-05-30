import {
  CourseLevel,
  CourseType,
  CourseStatus,
  CourseCategory,
} from "@prisma/client";
import { ResourceInterface } from "./resourses";
import { ModuleInterface } from "./modules";

export interface CourseInterface {
  id: string;
  name: string;
  description: string;
  level: CourseLevel | null;
  type: CourseType | null;
  status: CourseStatus;
  optimal: boolean | null;
  duration: number | null;
  category: CourseCategory | null;
  image: string | null;
  instructorId: string | null;
  price: number | null;
  createdAt: Date;
  updatedAt: Date;
  module?: ModuleInterface[] | null;
}
export interface CoursesInterface {
  courseId: string;
  resourceId: string;
  course: CourseInterface;
}
export interface CourseWithResourceInterface {
  courseId: string;
  resourceId: string;
  resource: ResourceInterface;
  course: CourseInterface;
}

export interface FullCourse {
  courseId: string;
  resourceId: string;
  resource: ResourceInterface;
  course: CourseInterface;
}
