"use server";

import redis from "@/lib/redis";
import { prisma } from "../../../../prisma";

export const getCoursesNames = async () => {
  const cachedCourses = await redis.get("courses_names");

  if (cachedCourses) {
    return JSON.parse(cachedCourses);
  }

  const courses = await prisma.course.findMany({
    select: {
      name: true,
      type: true,
    },
  });
  await redis.set("courses_names", JSON.stringify(courses));
  return courses;
};

export const getCoursesAll = async () => {
  try {
    const cachedCourses = await redis.get("courses");

    if (cachedCourses) {
      return JSON.parse(cachedCourses);
    }

    const courses = await prisma.courseResource.findMany({
      include: {
        resource: true,
        course: true,
      },
    });

    await redis.set("courses", JSON.stringify(courses));
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getCourseByName = async (name: string) => {
  try {
    const cachedCourse = await redis.get(`course:${name}`);

    if (cachedCourse) {
      return JSON.parse(cachedCourse);
    }

    const course = await prisma.courseResource.findMany({
      where: {
        course: {
          name: name,
        },
      },
      include: {
        resource: true,
        course: {
          include: {
            module: {
              include: {
                _count: {
                  select: {
                    units: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    await redis.set(`course:${name}`, JSON.stringify(course));
    return course;
  } catch (error) {
    console.error("Error fetching course:", error);
    return [];
  }
};

export const getCoursesByType = async (name: string) => {
  try {
    const cachedCourses = await redis.get(`courses:${name}`);

    if (cachedCourses) {
      return JSON.parse(cachedCourses);
    }

    const courses = await prisma.courseResource.findMany({
      where: {
        resource: {
          name: name,
        },
      },
      include: {
        course: true,
        resource: true,
      },
    });

    await redis.set(`courses:${name}`, JSON.stringify(courses));
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getCoursesWithResourceByName = async (name: string) => {
  try {
    const cachedCourses = await redis.get(`courseswithresource:${name}`);

    if (cachedCourses) {
      return JSON.parse(cachedCourses);
    }
    const resourse = await prisma.resource.findUnique({
      where: {
        name,
      },
    });
    const courses = await prisma.courseResource.findMany({
      where: {
        resource: {
          name: resourse?.name,
        },
      },
      include: {
        course: true,
        resource: true,
      },
    });

    await redis.set(`courseswithresource:${name}`, JSON.stringify(courses));
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getAllCoursesWithResourceByName = async () => {
  try {
    const cachedCourses = await redis.get(`allcourseswithresource`);

    if (cachedCourses) {
      return JSON.parse(cachedCourses);
    }
    const courses = await prisma.courseResource.findMany({
      include: {
        course: true,
        resource: true,
      },
    });

    await redis.set(`allcourseswithresource`, JSON.stringify(courses));
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getCoursesByResourseName = async (name: string) => {
  try {
    const cachedCourses = await redis.get(`courses:${name}`);

    if (cachedCourses) {
      return JSON.parse(cachedCourses);
    }
    const resourse = await prisma.resource.findUnique({
      where: {
        name,
      },
    });
    const courses = await prisma.courseResource.findMany({
      where: {
        resource: {
          name: resourse?.name,
        },
      },
      include: {
        course: true,
      },
    });

    await redis.set(`courses:${name}`, JSON.stringify(courses));
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getFullCourseByName = async (name: string) => {
  const cachedCourse = await redis.get(`fullcourse:${name}`);
  if (cachedCourse) {
    return JSON.parse(cachedCourse);
  }

  const course = await prisma.courseResource.findMany({
    where: {
      course: {
        name: name,
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
              units: true,
            },
          },
        },
      },
      resource: true,
    },
  });

  await redis.set(`fullcourse:${name}`, JSON.stringify(course));

  return course;
};

export const getCourseIdByName = async (name: string) => {
  const course = await prisma.course.findUnique({
    where: {
      name,
    },
  });

  return course?.id;
};

export const getLast15Courses = async () => {
  try {
    const cachedCourses = await redis.get("last_15_courses");

    if (cachedCourses) {
      return JSON.parse(cachedCourses);
    }

    const courses = await prisma.courseResource.findMany({
      include: {
        resource: true,
        course: true,
      },
      take: 15,
    });

    await redis.set("last_15_courses", JSON.stringify(courses));
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
