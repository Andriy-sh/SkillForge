"use server";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../prisma";

export const updateUserId = async (userId: string, newUserId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { id: newUserId },
  });
};

export const updateUserEmail = async (userId: string, newEmail: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { email: newEmail },
  });
};

export const updateUserName = async (userId: string, newName: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { name: newName },
  });
};

export const updateUserPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.password) {
    throw new Error("User does not have a password set");
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
};
export const updateUserBio = async (userId: string, newBio: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { bio: newBio },
  });
};

export const updateUserCity = async (userId: string, newCity: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { city: newCity },
  });
};
