import { NotificationType } from "@prisma/client";
import { User } from "../User/User";

export interface NotificationSchema {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}
