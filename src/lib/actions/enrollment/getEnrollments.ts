"use server";

import { prisma } from "../../../../prisma";

export const getEnrollments = async (userId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId,
    },
    include: {
      course: true,
    },
  });

  return enrollments;
};

export const getEnrollment = async (userId: string, courseId: string) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  return enrollment;
};
