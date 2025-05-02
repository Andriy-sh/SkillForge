"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const backgroundColor =
    pathname === "/"
      ? "bg-blue-500"
      : pathname === "/signup"
      ? "bg-green-500"
      : pathname === "/login"
      ? "bg-purple-500"
      : "bg-gray-300";

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
  return (
    <footer className={`w-full h-[200px] ${backgroundColor} text-white`}>
      Footer
    </footer>
  );
}
