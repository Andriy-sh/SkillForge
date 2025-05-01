"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../prisma";
import bcrypt from "bcryptjs";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  const exitedUser = await prisma.user.findUnique({
    where: { email },
  });

  if (exitedUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  redirect("/login");
}
