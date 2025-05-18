"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SettingsSideBar() {
  const currentPath = usePathname();
  const settings = [
    { name: "Profile", href: "/settings/profile" },
    { name: "Account", href: "/settings/account" },
    { name: "Notifications", href: "/settings/notifications" },
    { name: "Preferences", href: "/settings/preferences" },
    { name: "Security", href: "/settings/security" },
    { name: "Billing", href: "/settings/billing" },
    { name: "Delete Account", href: "/settings/delete_account" },
  ];

  return (
    <div className=" h-min w-[70%] ml-10 bg-white flex flex-col border-1 p-6 border-black">
      {settings.map((link) => (
        <div key={link.name} className="mb-4">
          <Link
            href={link.href}
            className={`text-black hover:font-bold relative text-lg ${
              currentPath === link.href ? "font-bold" : ""
            }`}
          >
            {link.name}
            {currentPath === link.href && (
              <span className="absolute border-3 border-black -left-6 h-10 -top-2"></span>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
