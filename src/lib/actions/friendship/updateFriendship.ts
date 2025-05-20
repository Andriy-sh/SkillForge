"use server";

import { Status } from "@prisma/client";
import { prisma } from "../../../../prisma";

export const updateFriendship = async (
  senderid: string,
  reciverid: string,
  status: Status
) => {
  await prisma.friendship.update({
    where: {
      userId_friendId: {
        userId: senderid,
        friendId: reciverid,
      },
    },
    data: {
      status,
    },
  });
};

export async function updateFriendshipById(
  friendshipId: string,
  status: Status
) {
  return prisma.friendship.update({
    where: { id: friendshipId },
    data: { status },
  });
}
