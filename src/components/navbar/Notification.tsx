"use client";
import { updateFriendship } from "@/lib/actions/friendship/updateFriendship";
import { readNotification } from "@/lib/actions/notification/updateNotification";
import { NotificationSchema } from "@/schemas/notification/notification";
import { User } from "@/schemas/User/User";
import { Bell, CircleOff, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import EmptyNotification from "../notification/EmptyNotification";

export default function Notification({
  notifications,
  senders,
}: {
  notifications: NotificationSchema[];
  senders: User[];
}) {
  const [IsOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [stateNotifications, setNotification] = useState<NotificationSchema[]>(
    []
  );
  const [displayedNotifications, setDisplayedNotifications] = useState<
    NotificationSchema[]
  >([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".notification")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (IsOpen && notificationRef.current) {
      const notificationElement = notificationRef.current;
      const rect = notificationElement.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        notificationElement.style.left = `calc(100% - ${rect.width}px)`;
      }
      if (rect.left < 0) {
        notificationElement.style.left = "0px";
      }
    }
  }, [IsOpen]);

  const handleFriendRequest = async (
    senderid: string,
    reciverid: string,
    notificationId: string,
    action: "accepted" | "rejected" | "blocked"
  ) => {
    try {
      setNotification((prev) => {
        const updatedNotifications = prev.filter(
          (notification) => notification.id !== notificationId
        );
        updateDisplayedNotifications(updatedNotifications);
        return updatedNotifications;
      });
      await updateFriendship(senderid, reciverid, action);
      await readNotification(notificationId);
    } catch (error) {
      console.error("Error handling friend request:", error);
    }
  };

  const updateDisplayedNotifications = (
    notifications: NotificationSchema[]
  ) => {
    setDisplayedNotifications(notifications.slice(0, 3));
  };

  useEffect(() => {
    const filterNotifications = notifications.filter(
      (notification) => notification.read === false
    );
    setNotification(filterNotifications);
    updateDisplayedNotifications(filterNotifications);
  }, [notifications]);

  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Show notifications"
      >
        <Bell width={24} height={24} className="text-gray-700" />
        {stateNotifications.length > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
            {stateNotifications.length}
          </span>
        )}
      </button>
      {IsOpen && (
        <div
          ref={notificationRef}
          className="absolute left-2 top-[58px] border-1 border-slate-800 bg-white shadow-lg p-4 w-72 notification"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">My Notifications</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>
          {displayedNotifications.length > 0 ? (
            displayedNotifications.map((notification) => {
              const sender = senders.find(
                (s) => s.id === notification.senderId
              );
              return (
                <div
                  key={notification.id}
                  className="my-3 p-3 rounded-xl shadow border bg-white"
                >
                  <div className="flex items-center gap-3 mb-2 bg-gray-50 rounded-lg px-2 py-1">
                    {sender?.image ? (
                      <Image
                        src={sender.image}
                        alt={sender.name || "User"}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-base">
                        {sender?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <Link
                      href={`/profile/${sender?.id}`}
                      className="font-semibold text-blue-700 text-base max-w-[120px] truncate overflow-hidden whitespace-nowrap"
                      title={sender?.name || "Unknown"}
                    >
                      {sender?.name || "Unknown"}
                    </Link>
                  </div>
                  <div className="text-gray-800 mb-3 mt-1 text-sm text-center break-words">
                    {notification.type === "friendRequest"
                      ? "wants to add you as a friend"
                      : notification.message}
                  </div>
                  {notification.type === "friendRequest" && (
                    <div className="flex gap-2 mb-2 justify-center">
                      <button
                        onClick={() =>
                          handleFriendRequest(
                            notification.senderId || "",
                            notification.receiverId || "",
                            notification.id,
                            "accepted"
                          )
                        }
                        className="flex items-center justify-center gap-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition font-medium min-w-[90px]"
                        title="Accept"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleFriendRequest(
                            notification.senderId || "",
                            notification.receiverId || "",
                            notification.id,
                            "rejected"
                          )
                        }
                        className="flex items-center justify-center gap-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition font-medium min-w-[90px]"
                        title="Decline"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() =>
                          handleFriendRequest(
                            notification.senderId || "",
                            notification.receiverId || "",
                            notification.id,
                            "blocked"
                          )
                        }
                        className="flex items-center justify-center gap-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition font-medium "
                        title="Block"
                      >
                        <CircleOff size={18} />
                      </button>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 text-right">
                    {new Date(notification.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyNotification
              title="No New Notifications"
              subtitle="You're all caught up! Check back later for new notifications."
              Icon={Bell}
            />
          )}
        </div>
      )}
    </div>
  );
}
