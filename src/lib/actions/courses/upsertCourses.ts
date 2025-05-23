"use server";

import { CourseLevel } from "@prisma/client";
import { prisma } from "../../../../prisma";

export const upsertCourseWithResources = async (data: FormData) => {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const level = data.get("level") as CourseLevel;
  const duration = Number(data.get("duration")) || null;
  const image = data.get("image") as string;
  const instructorId = data.get("instructorId") as string;
  const price = Number(data.get("price")) || null;

  const resourceIds = data.getAll("resources") as string[];

  const course = await prisma.course.upsert({
    where: { name },
    update: {
      name,
      level,
      duration,
      image,
      instructorId,
      price,
      description,
    },
    create: {
      name,
      level,
      duration,
      image,
      instructorId,
      price,
      description,
    },
  });

  await prisma.courseResource.deleteMany({
    where: { courseId: course.id },
  });

  await prisma.courseResource.createMany({
    data: resourceIds.map((resourceId) => ({
      courseId: course.id,
      resourceId,
    })),
    skipDuplicates: true,
  });

  return course;
};
