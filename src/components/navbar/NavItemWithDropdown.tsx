"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Course = {
  name: string;
  type: string;
};

export default function NavItemWithDropdown({
  courses,
}: {
  courses: Course[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const dropdownElement = containerRef.current.querySelector(
        ".dropdown-menu"
      ) as HTMLDivElement | null;
      if (dropdownElement) {
        const rect = dropdownElement.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          dropdownElement.style.left = `calc(100% - ${rect.width}px)`;
        }
        if (rect.left < 0) {
          dropdownElement.style.left = "0px";
        }
      }
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 cursor-pointer text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200"
      >
        <span>Courses</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu border-1 flex absolute top-11 left-0 mt-2 w-[900px] bg-white shadow-lg z-50">
          <div className="w-80 bg-[#0A0E23] text-white p-8 flex flex-col justify-between">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold mb-3">
                  Popular course topics
                </h3>
                <p className="text-gray-300 text-md mb-8">
                  Explore free or paid courses in topics that interest you.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors text-center w-full"
              >
                Explore all courses
              </Link>
            </div>
          </div>
          <div className="flex-1 p-8">
            <div className="grid grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Link
                  key={index}
                  href={`/courses/${course.type.toLowerCase()}/${course.name.toLowerCase()}`}
                  className="flex items-start group hover:bg-gray-100 transition-all duration-200 p-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-full">
                    <div className="font-medium text-sm text-gray-900 group-hover:text-[#3a10e5] transition-colors duration-200 mb-1">
                      {course.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
