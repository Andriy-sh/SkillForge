import { Unit } from "./units";

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  courseId: string;
  units: Unit[];
}
