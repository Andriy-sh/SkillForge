import "next-auth/jwt";
import { Role } from "@prisma/client";
type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: UserId;
      role: Role;
    } & DefaultSession["user"];
  }
}
