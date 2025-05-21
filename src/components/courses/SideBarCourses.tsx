"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Topic {
  name: string;
  href: string;
  isNew?: boolean;
}

const topics: Topic[] = [
  { name: "AI", href: "/courses/ai" },
  { name: "Bash/Shell", href: "/courses/bash" },
  { name: "C", href: "/courses/c" },
  { name: "C#", href: "/courses/csharp" },
  { name: "C++", href: "/courses/cpp" },
  { name: "Certification prep", href: "/courses/certification", isNew: true },
  { name: "Cloud computing", href: "/courses/cloud" },
  { name: "Code foundations", href: "/courses/foundations" },
  { name: "Computer science", href: "/courses/cs" },
  { name: "Cybersecurity", href: "/courses/security" },
  { name: "Data analytics", href: "/courses/analytics" },
  { name: "Data engineering", href: "/courses/data-engineering" },
  { name: "Data science", href: "/courses/data-science" },
  { name: "Data visualization", href: "/courses/visualization" },
  { name: "DevOps", href: "/courses/devops" },
  { name: "Developer tools", href: "/courses/tools" },
  { name: "Game development", href: "/courses/game-dev" },
  { name: "Go", href: "/courses/go" },
  { name: "HTML & CSS", href: "/courses/html-css" },
  { name: "IT", href: "/courses/it" },
  { name: "Interview prep", href: "/courses/interview" },
  { name: "Java", href: "/courses/java" },
];

export default function SideBarCourses() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-gray-600"
        >
          <span>All topics</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
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

        {isExpanded && (
          <div className="mt-4 space-y-2">
            {topics.map((topic, index) => (
              <Link
                key={index}
                href={topic.href}
                className="flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg group"
              >
                <span>{topic.name}</span>
                {topic.isNew && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
