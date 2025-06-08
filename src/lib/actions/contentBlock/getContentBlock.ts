"use server";

import { prisma } from "../../../../prisma";

export const getContentBlocks = async (topicId: string) => {
  const content = await prisma.contentBlock.findMany({
    where: {
      topicId: topicId,
    },
    orderBy: {
      order: "asc",
    },
  });
  return content;
};
