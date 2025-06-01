import { ContentType } from "@prisma/client";
import { Task } from "./tasks";
import { ModulewithCourseInterface } from "./modules";

export interface Unit {
  id: string;
  title: string;
  type: ContentType;
  order: number;
  moduleId: string;
  description?: string | null;
  body?: string | null;
  videoUrl?: string | null;
  assetUrl?: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface UnitTasks extends Unit {
  module: ModulewithCourseInterface;
  task: Task[];
}
