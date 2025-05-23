import { Role, Status } from "@prisma/client";

export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  bio: string | null;
  city: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  friendships?: {
    id: string;
    userId: string;
    friendId: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }[];
  friendsWith?: {
    id: string;
    userId: string;
    friendId: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export type GlobalUser = {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
  city: string | null;
  role: Role;
};
