"use server";

import { ResourceType } from "@prisma/client";
import { prisma } from "../../../../prisma";

export const upsertResources = async (data: FormData) => {
  const name = data.get("name") as string;
  const type = data.get("type") as ResourceType;
  const description = data.get("description") as string;

  if (!name || !type || !description) {
    throw new Error("All fields are required");
  }

  return await prisma.resource.upsert({
    where: { name },
    update: { name, type, description },
    create: { name, type, description },
  });
};
