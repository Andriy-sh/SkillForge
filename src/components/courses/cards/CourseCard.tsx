import React from "react";
import { BarChart } from "lucide-react";
import { CourseLevel, CourseCategory } from "@prisma/client";
import Link from "next/link";

interface CareerPathCardProps {
  title: string;
  description: string;
  href: string;
  level: CourseLevel | null;
  durationHours: number | null;
  category: CourseCategory | null;
}

export function CourseCard({
  title,
  description,
  href,
  level,
  durationHours,
}: // category,
CareerPathCardProps) {
  return (
    <Link href={href}>
      <div className="h-full flex flex-col rounded-sm border border-black bg-white hover:shadow-lg transition-all w-full max-w-sm justify-between">
        <div>
          <p className="text-md rounded-sm font-semibold text-black pl-5 p-1 bg-red-100">
            Career path
          </p>
          <div className="p-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-wrap">
              {description}
            </p>
          </div>
        </div>
        <div className="border-t mt-4 border-dotted border-slate-800 pt-4 pb-4">
          <p className="flex items-end justify-between text-sm  text-gray-700">
            <div className="flex">
              <BarChart className="w-4 h-4 mr-1 mt-0.6" />
              <strong className="mr-2">{level}</strong> Friendly
            </div>
            <span>
              <strong>{durationHours}</strong> hours
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
