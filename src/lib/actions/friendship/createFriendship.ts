"use server";

import { prisma } from "../../../../prisma";

export const createFriendship = async (userId: string, friendId: string) => {
  await prisma.friendship.create({
    data: {
      userId,
      friendId,
      status: "PENDING",
    },
  });
};
