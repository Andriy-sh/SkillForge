import { User } from "@/schemas/User/User";
import { Status } from "@prisma/client";

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  friend: User;
}
