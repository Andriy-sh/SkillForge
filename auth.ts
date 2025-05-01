import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const exitedUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!exitedUser) {
          throw new Error("User not found");
        }

        if (!exitedUser.password) {
          throw new Error("Password is missing for the user");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          exitedUser.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return exitedUser;
      },
    }),
  ],
});
