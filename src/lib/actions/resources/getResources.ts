"use server";

import redis from "@/lib/redis";
import { prisma } from "../../../../prisma";

export const getResourcesNames = async () => {
  const cachedResources = await redis.get("resources_name");

  if (cachedResources) {
    return JSON.parse(cachedResources);
  }

  const resourses = await prisma.resource.findMany({
    select: {
      name: true,
      type: true,
    },
  });
  await redis.set("resourses_name", JSON.stringify(resourses));
  return resourses;
};

export const getResourseByName = async (name: string) => {
  const resourse = await prisma.resource.findUnique({
    where: {
      name,
    },
  });
  return resourse;
};

export const get15NamesOfMostPopularResources = async () => {
  const cachedResources = await redis.get("most_popular_resources");

  if (cachedResources) {
    return JSON.parse(cachedResources);
  }

  const resourses = await prisma.resource.findMany({
    take: 15,
    orderBy: {
      courses: { _count: "desc" },
    },
    select: {
      name: true,
      type: true,
    },
  });
  await redis.set("most_popular_resources", JSON.stringify(resourses));
  return resourses;
};
