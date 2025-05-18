"use server";

import { prisma } from "../../../../prisma";

export const getFriends = async (userId: string) => {
  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { userId, status: "accepted" },
        { friendId: userId, status: "accepted" },
      ],
    },
    include: {
      user: true,
      friend: true,
    },
  });

  return friends;
};
