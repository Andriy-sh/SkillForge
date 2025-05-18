"use server";

import { Status } from "@prisma/client";
import { prisma } from "../../../../prisma";

export const updateFriendship = async (
  friendshipId: string,
  status: Status
) => {
  await prisma.friendship.update({
    where: {
      id: friendshipId,
    },
    data: {
      status,
    },
  });
};
