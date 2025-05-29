import { CourseInterface } from "./courses";

export interface Enrollment {
  userId: string;
  courseId: string;
  progress: number;
  enrolledAt: Date;
  completedAt: Date | null;
  isCompleted: boolean;
  course: CourseInterface;
}
