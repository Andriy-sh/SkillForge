"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SignOut } from "../auth/SignOutButton";

export default function NavBarProfile() {
  const [IsOpen, setIsOpen] = useState(false);

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

  return (
    <div className="flex items-center gap-2 relative">
      <User
        onClick={() => setIsOpen(!IsOpen)}
        className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
        size={24}
      />
      {IsOpen && (
        <div className="absolute top-[46px] left-0 flex flex-col bg-white shadow-lg rounded-lg p-4 w-40 notification z-50 border border-gray-200">
          <Link
            href={"/profile"}
            className="py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Profile
          </Link>
          <Link
            href={"/settings"}
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
