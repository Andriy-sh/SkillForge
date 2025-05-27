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
    },
  });
  await redis.set("resourses_name", JSON.stringify(resourses));
  return resourses;
};
