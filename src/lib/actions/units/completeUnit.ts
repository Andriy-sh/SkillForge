"use server";

import { prisma } from "../../../../prisma";

export const completeUnit = async ({
  unitId,
  userId,
}: {
  unitId: string;
  userId: string;
}) => {
  await prisma.completedUnit.upsert({
    where: {
      userId_unitId: {
        userId,
        unitId,
      },
    },
    update: {},
    create: {
      unitId,
      userId,
    },
  });
};
