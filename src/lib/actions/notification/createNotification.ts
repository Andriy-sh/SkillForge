"use server";
import { prisma } from "../../../../prisma";
import { NotificationInput } from "@/schemas/notification/notification";

export const createNotification = async ({
  receiverId,
  senderId,
  type,
  message,
}: NotificationInput) => {
  await prisma.notification.create({
    data: {
      receiverId,
      senderId,
      type,
      message,
    },
  });
};
