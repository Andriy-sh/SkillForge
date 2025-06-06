"use server";

import { prisma } from "../../../../prisma";

export const getModulesByCourseName = async (name: string) => {
  const modules = await prisma.module.findMany({
    where: {
      course: {
        name: name,
      },
    },
    orderBy: { 
      order: "asc",
    },
    include: {
      units: true,
    },
  });
  return modules;
};

