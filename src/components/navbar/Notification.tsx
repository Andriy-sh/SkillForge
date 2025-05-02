"use client";
import { Bell, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function Notification() {
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

  return (
    <div className="relative">
      <button className="mt-2 cursor-pointer" onClick={() => setIsOpen(true)}>
        <Bell width={24} height={24} />
      </button>
      {IsOpen && (
        <div
          ref={notificationRef}
          className="absolute left-0 top-[46px] bg-white shadow-lg rounded-md p-4 w-64 notification"
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
          <hr className="my-2 border-dashed" />
          <div className="flex flex-col items-center text-center mt-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"></div>
            <p className="text-gray-600 mt-4">You&apos;re all caught up!</p>
            <p className="text-gray-500 text-sm">
              Go forth and learn new things.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
