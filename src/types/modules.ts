import { CourseInterface } from "./courses";
import { Unit } from "./units";

export interface ModuleInterface {
  id: string;
  title: string;
  description: string;
  order: number;
  courseId: string;
  units?: Unit[];
  isCompleted: boolean;
  _count?: {
    units?: number;
  };
}

export interface ModulewithCourseInterface {
  id: string;
  title: string;
  description: string;
  order: number;
  courseId: string;
  units?: Unit[];
  isCompleted: boolean;
  _count?: {
    units?: number;
  };
  course: CourseInterface;
}
