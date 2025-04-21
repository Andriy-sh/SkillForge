"use server";

import { prisma } from "../../../prisma";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  await prisma.user.create({
    data: {
      email,
      name,
    },
  });
}
