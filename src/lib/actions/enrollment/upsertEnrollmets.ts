"use server";

import { prisma } from "../../../../prisma";

export const upsertEnrollment = async (data: FormData) => {
  const userId = data.get("userId") as string;
  const courseId = data.get("courseId") as string;
  const progressRaw = data.get("progress");

  if (!userId || !courseId) {
    throw new Error("Missing userId or courseId");
  }

  const progress = parseInt(progressRaw as string, 10) || 0;
  if (progress < 0 || progress > 100) {
    throw new Error("Progress must be between 0 and 100");
  }
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {
      progress,
    },
    create: {
      userId,
      courseId,
      progress,
    },
  });
};
