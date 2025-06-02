"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CourseType } from "@prisma/client";
export default function SidebarCourses({
  resoursesNames,
}: {
  resoursesNames: { name: string; type: CourseType }[];
}) {
  const [isCoursesExpanded, setIsCoursesExpanded] = useState(true);

  return (
    <div className="w-64 border-r border-gray-200 h-full">
      <div className="p-4 space-y-6">
        <div>
          <button
            onClick={() => setIsCoursesExpanded(!isCoursesExpanded)}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Explore Courses
            </h3>
            <svg
              className={`w-5 h-5 transform transition-transform mb-2 ${
                isCoursesExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isCoursesExpanded && (
            <div className="mt-2 space-y-1">
              {resoursesNames.map((resourse, index) => (
                <Link
                  key={index}
                  href={`/courses/${resourse.type.toLowerCase()}/${
                    resourse.name
                  }`}
                  className="flex items-center py-2 px-3 font-semibold text-sm text-gray-600 transition-transform duration-300 ease-in-out  hover:text-global hover:font-bold hover:scale-105  rounded-lg  "
                >
                  <span>{resourse.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
