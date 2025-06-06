import {
  CourseLevel,
  CourseType,
  CourseStatus,
  CourseCategory,
} from "@prisma/client";
import { ResourceInterface } from "./resourses";
import { ModuleInterface } from "./modules";
import { Unit } from "./units";
export interface NestedResource {
  resource: ResourceInterface;
  courseId: string;
  resourceId: string;
}
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
  currentModule: number | null;
  price: number | null;
  createdAt: Date;
  updatedAt: Date;
  resources?: NestedResource[] | null;
  module?: ModuleInterface[] | null;
}
export interface CoursesInterface {
  courseId: string;
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

export type EnrollmentWithCourse = {
  courseId: string;
  course: CourseInterface & {
    module: (ModuleInterface & {
      units: Unit[];
    })[];
  };
};

export interface En {
  userId: string;
  courseId: string;
  progress: number;
  completedAt: Date | null;
  enrolledAt: Date;
  isCompleted: boolean;
  course: CourseInterface;
}
