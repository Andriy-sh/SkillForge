"use server";

import { prisma } from "../../../../prisma";

export const deleteFriendship = async (id: string) => {
  await prisma.friendship.delete({
    where: {
      id,
    },
  });
};
