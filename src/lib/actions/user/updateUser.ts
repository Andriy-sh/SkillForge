"use server";

import { prisma } from "../../../../prisma";

export const updateUserId = async (userId: string, newUserId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { id: newUserId },
  });
};
