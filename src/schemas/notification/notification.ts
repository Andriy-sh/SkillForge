import { Notification, NotificationType } from "@prisma/client";
import { User } from "../User/User";

export interface NotificationSchema {
  id: string;
  receiverId: string | null;
  senderId: string | null;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}
export interface NotificationInput {
  receiverId: string;
  senderId: string;
  type: Notification["type"];
  message: string;
}
