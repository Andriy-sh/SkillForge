"use server";

import { prisma } from "../../../../prisma";

export const upsertEnrollment = async (data: FormData) => {
  const userId = data.get("userId") as string;
  const courseId = data.get("courseId") as string;

  if (!userId || !courseId) {
    throw new Error("Missing userId or courseId");
  }

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {},
    create: {
      userId,
      courseId,
    },
  });
};
