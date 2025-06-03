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
  category,
}: CareerPathCardProps) {
  const categorySlug = (word: string) => {
    if (!word) return "";

    const replaced = word.replace(/_/g, " ");

    const lower = replaced.toLowerCase();

    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const categoryColors: Record<CourseCategory, { bg: string; text: string }> = {
    FREE: { bg: "bg-green-200", text: "text-black" },
    SKILL_PATH: { bg: "bg-[#ffd300]", text: "text-black" },
    CAREER_PATH: { bg: "bg-[#10162f]", text: "text-white" },
  };

  const colors = category
    ? categoryColors[category] ?? { bg: "bg-gray-200", text: "text-black" }
    : { bg: "bg-gray-200", text: "text-black" };

  return (
    <Link href={href}>
      <div className="flex h-[280px] w-[300px] p-2 flex-col rounded-sm border border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.9)] hover:-translate-y-2 hover:-translate-x-2 transition-all max-w-sm justify-between duration-300">
        <div>
          <p
            className={`${colors.bg} ${colors.text} text-md rounded-sm font-semibold pl-5 p-1`}
          >
            {categorySlug(category ?? "")}
          </p>
          <div className="p-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-wrap">
              {description}
            </p>
          </div>
        </div>
        <div className="border-t mt-4 border-dotted border-slate-800 pt-4 pb-4">
          <p className="flex items-end justify-between text-sm text-gray-700">
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
