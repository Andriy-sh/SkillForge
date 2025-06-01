"use server";

import redis from "@/lib/redis";
// import redis from "@/lib/redis";
import { prisma } from "../../../../prisma";

export const getUnit = async (title: string) => {
  const cachedUnits = await redis.get("unit:" + title);
  if (cachedUnits) {
    return JSON.parse(cachedUnits);
  }
  const units = await prisma.unit.findMany({
    where: {
      title: {
        equals: "Welcome To Javascript",
        mode: "insensitive",
      },
    },
    include: {
      module: {
        include: {
          course: {
            include: {
              module: {
                include: {
                  units: true,
                  _count: {
                    select: {
                      units: true,
                    },
                  },
                },
              },
              _count: {
                select: {
                  module: true,
                },
              },
            },
          },
        },
      },
      task: {
        include: {
          paragraph: {
            include: {
              bulletList: true,
            },
          },
        },
      },
    },
  });
  await redis.set("unit:" + title, JSON.stringify(units));
  return units;
};
