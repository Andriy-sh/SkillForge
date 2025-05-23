"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SignOut } from "../auth/SignOutButton";
import { navbarProfileConfig } from "./navbarProfile.config";
import { useUserStore } from "@/lib/store/userStore";
export default function NavBarProfile() {
  const [IsOpen, setIsOpen] = useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const userId = useUserStore((state) => state.user?.id);
  const userRole = useUserStore((state) => state.user?.role);
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
          className="absolute top-[50px] left-0 flex flex-col border-1 border-slate-800 bg-white shadow-lg  p-4 w-60 notification z-50"
        >
          {navbarProfileConfig
            .filter((link) => link.href !== "/admin" || userRole === "ADMIN")
            .map((link, index) => (
              <Link
                key={index}
                href={
                  link.href === "/profile" ? `/profile/${userId}` : link.href
                }
                onClick={() => setIsOpen(false)}
                className="group py-3 px-3 text-gray-700 hover:text-[#3a10e5] flex gap-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                {link.icon && (
                  <link.icon
                    size={24}
                    className="text-gray-600 group-hover:text-[#3a10e5]"
                  />
                )}
                {link.label}
              </Link>
            ))}

          <div className="mt-2 border-t border-t-slate-800">
            <SignOut text="Sign Out" />
          </div>
        </div>
      )}
    </div>
  );
}
