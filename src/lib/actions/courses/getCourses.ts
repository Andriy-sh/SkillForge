"use server";

import { prisma } from "../../../../prisma";

export const getCourses = async () => {
  const courses = await prisma.course.findMany({
    include: {
      resources: {
        include: {
          resource: true,
        },
      },
    },
  });
  return courses;
};

export const getCoursesAll = async () => {
  const courses = await prisma.courseResource.findMany({
    include: {
      resource: true,
      course: true,
    },
  });
  return courses;
};
