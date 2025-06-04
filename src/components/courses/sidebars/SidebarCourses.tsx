"use client";
import React from "react";
import Link from "next/link";
import { CourseType } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const groupByType = (resources: { name: string; type: CourseType }[]) => {
  return resources.reduce((acc, res) => {
    const type = res.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(res);
    return acc;
  }, {} as Record<CourseType, { name: string; type: CourseType }[]>);
};

export default function SidebarCourses({
  resourcesNames,
}: {
  resourcesNames: { name: string; type: CourseType }[];
}) {
  const grouped = groupByType(resourcesNames);

  return (
    <div className="w-64 border-r border-gray-200 h-full">
      <div className="p-4 space-y-6">
        <h3 className="text-xl  text-gray-900 mb-4 font-bold">
          Explore Courses
        </h3>

        <Accordion
          type="multiple"
          defaultValue={Object.keys(grouped)}
          className="space-y-2"
        >
          {Object.entries(grouped).map(([type, courses]) => (
            <AccordionItem key={type} value={type}>
              <AccordionTrigger className="flex justify-between font-semibold text-lg items-center capitalize  text-gray-700 hover:text-gray-900">
                <span>
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                </span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 accordion-trigger-icon" />
              </AccordionTrigger>

              <AccordionContent className="ml-4 space-y-1">
                {courses.map((course) => (
                  <Link
                    key={course.name}
                    href={`/courses/${course.type.toLowerCase()}/${
                      course.name
                    }`}
                    className="block py-1 px-2 text-sm text-gray-600 hover:text-global hover:font-bold hover:scale-[1.03] transition-transform duration-300 rounded"
                  >
                    {course.name}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
