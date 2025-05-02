"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SignOut } from "../auth/SignOutButton";

export default function NavBarProfile({ userId }: { userId: string }) {
  const [IsOpen, setIsOpen] = useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handelClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".notification")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  });
  useEffect(() => {
    if (IsOpen && profileRef.current) {
      const profileElement = profileRef.current;
      const rect = profileElement.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        profileElement.style.left = `calc(100% - ${rect.width}px)`;
      }
      if (rect.left < 0) {
        profileElement.style.left = "0px";
      }
    }
  }, [IsOpen]);
  return (
    <div className="flex items-center gap-2 relative">
      <User
        onClick={() => setIsOpen(!IsOpen)}
        className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
        size={24}
      />
      {IsOpen && (
        <div
          ref={profileRef}
          className="absolute top-[46px] left-0 flex flex-col bg-white shadow-lg rounded-lg p-4 w-60 notification z-50 border border-gray-200"
        >
          <Link
            href={`/profile/${userId}`}
            onClick={() => setIsOpen(false)}
            className="py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Profile
          </Link>
          <Link
            href={"/settings"}
            onClick={() => setIsOpen(false)}
            className="py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Settings
          </Link>
          <div className="mt-2">
            <SignOut text="Sign Out" />
          </div>
        </div>
      )}
    </div>
  );
}
