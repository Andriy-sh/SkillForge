"use client";
// import { updateFriendship } from "@/lib/actions/friendship/updateFriendship";
import { NotificationSchema } from "@/schemas/notification/notification";
import { Bell, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function Notification({
  notifications,
}: {
  notifications: NotificationSchema[];
}) {
  const [IsOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

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
  // const handleFriendRequest = (notificationId: string) => {
  //   try {
  //     await updateFriendship(notificationId, "accepted");
  //   } catch (error) {
  //     console.error("Error handling friend request:", error);
  //   }
  // };
  return (
    <div className="relative">
      <button className="mt-2 cursor-pointer" onClick={() => setIsOpen(true)}>
        <Bell width={24} height={24} />
      </button>
      {IsOpen && (
        <div
          ref={notificationRef}
          className="absolute left-2 top-[46px] bg-white shadow-lg rounded-md p-4 w-64 notification"
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
          {notifications.map((notification) => (
            <div key={notification.id} className="my-2">
              <p className="text-gray-800">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.type}</p>
              <button
                onClick={() => {}}
                className="text-sm text-blue-500 hover:underline"
              >
                {notification.type === "friendRequest" ? "Accept" : "View"}
              </button>
              <p className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
