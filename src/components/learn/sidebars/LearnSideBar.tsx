"use client";

import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Folder, BookOpen, Calendar, Puzzle, FolderOpen } from "lucide-react";

const sidebarItems = [
  {
    icon: Folder,
    label: "Dashboard",
    page: "dashboard",
  },
  {
    icon: BookOpen,
    label: "My learning",
    page: "my-learning",
  },
  {
    icon: Calendar,
    label: "Events",
    page: "events",
  },
  {
    icon: Puzzle,
    label: "Projects",
    page: "projects",
    badge: "Upgrade",
  },
  {
    icon: FolderOpen,
    label: "Workspaces",
    page: "workspaces",
  },
];

export default function LearnSideBar() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "dashboard";

  return (
    <div className="flex flex-col space-y-4 p-4  h-screen overflow-y-auto sticky top-18">
      {sidebarItems.map(({ icon: Icon, label, page, badge }, index) => {
        const isActive = currentPage === page;

        return (
          <div
            key={index}
            className={`group relative flex ${
              badge ? "items-center justify-between" : "items-center"
            } p-4 pl-4  rounded-lg  transition-colors duration-200 ${
              isActive ? "bg-[#f6e8de]" : " "
            }`}
          >
            {isActive && (
              <div className="absolute bg-black w-[6px] h-10 left-0 rounded-r" />
            )}

            <div className="flex items-center space-x-4">
              <Icon
                className={`w-6 h-6 transition-colors duration-200 ${
                  isActive
                    ? "text-black"
                    : "text-gray-800 group-hover:text-global"
                }`}
              />
              <Link
                href={{ pathname: "/learn", query: { page } }}
                className={` transition-colors  duration-200 ${
                  isActive
                    ? "text-black font-bold text-lg"
                    : "text-gray-900 group-hover:text-global"
                }`}
              >
                {label}
              </Link>
            </div>

            {badge && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded">
                {badge}
              </span>
            )}
          </div>
        );
      })}

      
    </div>
  );
}
