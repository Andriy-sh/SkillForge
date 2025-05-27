// components/courses/CourseTemplate.tsx
import { getCoursesByType } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";
import React from "react";
import CourseSidebar from "./CourseSidebar"; // Import the new sidebar component

interface CourseTemplateProps {
  name: string;
  type: string;
}

export default async function CourseTemplate({
  name,
  type,
}: CourseTemplateProps) {
  const courses: CourseWithResourceInterface[] = await getCoursesByType(name);
  console.log(`${type}:`, courses);

  return (
    <div className="font-sans p-6 flex">
      <CourseSidebar/>
      <div className="flex-1 ml-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">{type}</h1>
          <p className="text-gray-600">{name}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Get started with {type}
          </h2>
          {courses.map((course) => (
            <div
              key={course.course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
            >
              <div className="bg-lime-100 p-6">
                <div className="font-semibold text-lg text-gray-800 mb-2">
                  {course.course.name}
                </div>
                {course.course.description && (
                  <p className="text-gray-700 text-sm mb-4">
                    {course.course.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 inline mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Beginner Friendly
                  </span>{" "}
                  <span>{course.course.duration || "15 hours"}</span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex gap-8">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Related resources
            </h2>
            <ul className="list-none p-0">
              <li>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Docs: JavaScript
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Cheatsheets
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Projects
                </a>
              </li>
            </ul>
          </div>
          <div className="w-64">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Blog Post
            </h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="font-semibold text-gray-800 text-sm mb-1">
                What is JavaScript used for?
              </div>
              <div className="text-gray-500 text-xs">2 November 2022</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
