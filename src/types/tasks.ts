import { Paragraph, TaskType } from "@prisma/client";

export interface Task {
  id: string;
  unitId: string;
  type: TaskType;
  title: string;
  description: string | null;
  order: number;
  points: number | null;
  isCompleted: boolean;
  isOptional: boolean;
  createdAt: Date;
  updatedAt: Date;
  paragraph: Paragraph[] | null;
}
