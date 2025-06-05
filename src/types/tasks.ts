import { TaskType } from "@prisma/client";
import { Paragraph } from "./paragraph";

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
  solution?: string | null;
  testCases?: Array<{ input: string; output: string }>;
}
