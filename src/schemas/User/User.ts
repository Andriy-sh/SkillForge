import { Status } from "@prisma/client";

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
