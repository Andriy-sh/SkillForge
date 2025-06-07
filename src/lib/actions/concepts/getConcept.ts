"use server";

import { prisma } from "../../../../prisma";

export const getAllConcepts = async () => {
  const conceptsNames = await prisma.conceptTopic.findMany({
    include: {
      doc: {
        select: {
          slug: true,
          title: true,
        },
      },
    },
  });
  return conceptsNames;
};

export const getNavConcepts = async () => {
  const concepts = await prisma.conceptTopic.findMany({
    select: {
      id: true,
      order: true,
      title: true,
      slug: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return concepts;
};

export const getConcept = async ({
  resource,
  concept,
}: {
  resource: string;
  concept: string;
}) => {
  const conceptData = await prisma.conceptTopic.findFirst({
    where: {
      slug: concept,
      doc: {
        slug: resource,
      },
    },
  });
  return conceptData;
};
