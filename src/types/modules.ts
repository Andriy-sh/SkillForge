import { Unit } from "./units";

export interface ModuleInterface {
  id: string;
  title: string;
  description: string;
  order: number;
  courseId: string;
  units: Unit[];
  isCompleted: boolean;
  _count?: {
    units?: number;
  };
}
