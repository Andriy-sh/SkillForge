"use server";

import { prisma } from "../../../../prisma";

export async function getMessagesBetweenUsers(
  userId1: string,
  userId2: string
) {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}
