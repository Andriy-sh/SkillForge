"use server";

import { prisma } from "../../../../prisma";

export const getAllDocs = async () => {
  const docs = await prisma.resourceDoc.findMany({
    include: {
      resource: {
        select: {
          name: true,
          type: true,
        },
      },
    },
  });
  return docs;
};

export const getDocsBySlug = async (slug: string) => {
  const doc = await prisma.resourceDoc.findUnique({
    where: {
      slug,
    },
    include: {
      resource: {
        select: {
          name: true,
          type: true,
        },
      },
    },
  });
  return doc;
};
