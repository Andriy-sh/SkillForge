"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Props = {
  link: {
    label: string;
    href: string;
    dropdown?: boolean;
    dropdownItems?: {
      label: string;
      href: string;
    }[];
  };
};

export default function NavItemWithDropdown({ link }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1  cursor-pointer text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200 dark:text-gray-200 dark:hover:text-white ease-in-out  dark:hover:bg-gray-800 rounded-md"
      >
        <span>{link.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-9 left-0 mt-2 w-[600px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out animate-fadeIn">
          <div className="grid grid-cols-3 gap-4 p-4">
            {link.dropdownItems?.map((dropdown, index) => (
              <Link
                key={index}
                href={dropdown.href}
                className="flex  items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-full">
                  <div className="font-medium  text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {dropdown.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                    Click to learn more
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
