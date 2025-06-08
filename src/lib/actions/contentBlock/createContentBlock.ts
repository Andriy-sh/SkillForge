"use server";

import { ContentBlockType } from "@prisma/client";
import { prisma } from "../../../../prisma";

type CreateBlockInput = {
  topicId: string;
  type: ContentBlockType;
  content: string;
  title: string;
};

export async function createBlockContent(data: CreateBlockInput) {
  const count = await prisma.contentBlock.count({
    where: { topicId: data.topicId },
  });

  const block = await prisma.contentBlock.create({
    data: {
      topicId: data.topicId,
      type: data.type,
      content: data.content,
      title: data.title,
      order: count,
    },
  });

  return block;
}
