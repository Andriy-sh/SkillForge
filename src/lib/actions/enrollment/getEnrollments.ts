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
