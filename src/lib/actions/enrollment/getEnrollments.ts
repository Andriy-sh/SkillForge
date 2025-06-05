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
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      course: {
        include: {
          module: {
            include: {
              CompletedModule: true,
            },
          },
          resources: {
            include: {
              resource: true,
            },
          },
        },
      },
    },
  });

  const enrollmentsWithProgress = enrollments.map((enrollment) => {
    const completedModulesCount = enrollment.course.module.filter((module) =>
      module.CompletedModule.some(
        (cm) => cm.userId === userId && cm.moduleId === module.id
      )
    ).length;

    return {
      ...enrollment,
      completedModulesCount,
      totalModulesCount: enrollment.course.module.length,
    };
  });

  await redis.set(
    `enrollments:${userId}`,
    JSON.stringify(enrollmentsWithProgress)
  );

  return enrollmentsWithProgress;
};

export const getEnrollment = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      courseId,
    },
  });
  return enrollment;
};

export const getEnrollmentsCourse = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    include: {
      course: {
        include: {
          module: {
            orderBy: {
              order: "asc",
            },
            include: {
              units: {
                include: {
                  CompletedUnit: true,
                },
              },
            },
          },
          resources: {
            include: {
              resource: true,
            },
          },
        },
      },
    },
  });
  await redis.set(`enrollmeasdasdnts:${userId}`, JSON.stringify(enrollment));

  return enrollment;
};
