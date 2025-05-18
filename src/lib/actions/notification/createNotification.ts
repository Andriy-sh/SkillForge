"use server";
import { Notification } from "@prisma/client";
import { prisma } from "../../../../prisma";

interface NotificationInput {
  userId: string;
  senderId: string;
  type: Notification["type"];
  message: string;
}

export const createNotification = async ({
  userId,
  senderId,
  type,
  message,
}: NotificationInput) => {
  await prisma.notification.create({
    data: {
      userId: userId,
      senderId: senderId,
      type,
      message,
    },
  });
};
