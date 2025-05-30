"use server";

import redis from "@/lib/redis";
import { prisma } from "../../../../prisma";

export const getUnit = async (title: string) => {
  const cachedUnits = await redis.get("unit:" + title);
  if (cachedUnits) {
    return JSON.parse(cachedUnits);
  }
  const units = await prisma.unit.findMany({
    where: {
      title: {
        equals: title,
        mode: "insensitive",
      },
    },
    include: {
      task: {
        include: {
          paragraph: true,
        },
      },
    },
  });
  await redis.set("unit:" + title, JSON.stringify(units));
  return units;
};
