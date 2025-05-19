"use server";

import { prisma } from "../../../../prisma";

export const getNotification = async (userId: string) => {
  return await prisma.notification.findMany({
    where: {
      receiverId: userId,
    },
  });
};
