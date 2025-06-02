"use server";

import { prisma } from "../../../../prisma";

export const completeCourse = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  await prisma.completedCourse.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {},
    create: {
      courseId,
      userId,
    },
  });
};
