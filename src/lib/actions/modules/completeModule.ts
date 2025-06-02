"use server";

import { prisma } from "../../../../prisma";

export const completeModule = async ({
  moduleId,
  userId,
}: {
  moduleId: string;
  userId: string;
}) => {
  await prisma.completedModule.upsert({
    where: {
      userId_moduleId: {
        userId,
        moduleId,
      },
    },
    update: {},
    create: {
      moduleId,
      userId,
    },
  });
};
