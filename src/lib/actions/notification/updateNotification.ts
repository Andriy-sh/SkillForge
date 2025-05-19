"use server";

import { prisma } from "../../../../prisma";

export const readNotification = async (notificationId: string) => {
  await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });
};
