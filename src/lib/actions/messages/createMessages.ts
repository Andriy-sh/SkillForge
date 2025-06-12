"use server";

import redis from "@/lib/redis";
import { prisma } from "../../../../prisma";

export async function createMessage(
  senderId: string,
  receiverId: string,
  content: string
) {
  const friendship = await prisma.friendship.findFirst({
    where: {
      OR: [
        { userId: senderId, friendId: receiverId, status: "ACCEPTED" },
        { userId: receiverId, friendId: senderId, status: "ACCEPTED" },
      ],
    },
  });
  if (!friendship) {
    throw new Error("Users are not friends");
  }

  const message = await prisma.message.create({
    data: { senderId, receiverId, content },
  });

  await redis.publish(
    `chat:${[senderId, receiverId].sort().join(":")}`,
    JSON.stringify(message)
  );

  return message;
}
