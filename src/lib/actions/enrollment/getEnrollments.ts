"use server";

import redis from "@/lib/redis";
import { prisma } from "../../../../prisma";

export const getEnrollments = async (userId: string) => {
  const cachedEnrollments = await redis.get(`enrollments:${userId}`);

  if (cachedEnrollments) {
    return JSON.parse(cachedEnrollments);
  }
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId,
    },
    include: {
      course: {
        include: {
          module: true,
          resources: {
            include: {
              resource: true,
            },
          },
        },
      },
    },
  });
  redis.set(`enrollments:${userId}`, JSON.stringify(enrollments));

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
