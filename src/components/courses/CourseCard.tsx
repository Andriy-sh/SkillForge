import React from "react";
import Link from "next/link";

interface CourseCardProps {
  type: "AI" | "Python" | "JavaScript" | string;
  color?: string;
  href: string;
}

export function CourseCard({
  type,
  color = "bg-green-500",
  href,
}: CourseCardProps) {
  return (
    <Link href={href}>
      <div
        className={`relative overflow-hidden rounded-xl border border-gray-800  p-6 transition-all hover:shadow-lg`}
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-10 rounded-full transform translate-x-16 -translate-y-16`}
        />
        <div className="relative z-10">
          <p className="text-sm text-gray-500">Explore all</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">{type}</h3>
        </div>
      </div>
    </Link>
  );
}
