import { getCoursesByType } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";
import React from "react";
import CourseSidebar from "./CourseSidebar";
import { getResourseByName } from "@/lib/actions/resourses/getResources";
import { ResourceInterface } from "@/types/resourses";
import { Footprints } from "lucide-react";

interface CourseTemplateProps {
  name: string;
}

export default async function CourseTemplate({ name }: CourseTemplateProps) {
  const resourse: ResourceInterface | null = await getResourseByName(name);
  if (!resourse) {
    return <div>Not found resourse</div>;
  }
  const courses: CourseWithResourceInterface[] = await getCoursesByType(
    resourse.name
  );

  const optimalCourse = courses.filter(
    (course) => course.course.optimal === true
  );

  const resourseType =
    resourse?.type.charAt(0).toUpperCase() +
    resourse?.type.slice(1).toLowerCase();
  return (
    <div className="font-sans  flex min-h-screen  max-w-[1300px] mx-auto">
      <CourseSidebar />
      <div className="flex-1 ml-8">
        <div className="mb-8 relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 -left-9 -bottom-10.5"
            style={{
              backgroundImage:
                "radial-gradient(#1f1f1f 0.2px, transparent 1px)",
              backgroundSize: "10px 10px",
              backgroundPosition: "0 0",
              opacity: 1,
            }}
          />

          <div className="grid grid-cols-[5fr_2.2fr] ">
            <div className="max-w-[600px] space-y-3 relative z-10 bg-background p-4">
              <h1 className="text-gray-600">{resourseType}</h1>
              <p className="text-3xl font-bold">{resourse.name}</p>
              <p className="text-sm">{resourse.description}</p>
            </div>
            <div className="flex-1 border-1 border-black p-4 relative z-10 bg-background mr-10 mt-4">
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
          </div>
        </div>

        <div className="mb-10 mt-20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Get started with {name}
          </h2>
          <div className="grid grid-cols-[6fr_3fr] space-x-4">
            {optimalCourse.map((course) => (
              <div
                key={course.course.id}
                className="bg-white rounded-sm border-1 border-black"
              >
                <div className="space-y-2 ">
                  <div className="bg-[#eafdc6] rounded-t-sm p-1 text-md pl-2">
                    {course.course.price === 0 ? "Free course" : "Paid course"}
                  </div>
                  <div className=" text-lg text-gray-800  p-2 space-y-1">
                    <p className="font-bold">{course.course.name}</p>
                    {course.course.description && (
                      <p className="text-gray-700 text-sm">
                        {course.course.description}
                      </p>
                    )}
                  </div>
                  <div className="border-b border-dashed border-black opacity-50 mx-2"></div>
                  <div className="px-2 pb-2 flex items-center  justify-between text-sm opacity-75">
                    <div className="flex items-center ">
                      <Footprints width={20} height={20} />

                      {course.course.level === "BEGINNER" ? (
                        <div className="ml-2">
                          <span className="font-bold">
                            {course.course.level.charAt(0).toUpperCase() +
                              course.course.level.slice(1).toLocaleLowerCase()}
                          </span>{" "}
                          Frendly
                        </div>
                      ) : (
                        `${
                          course.course.level
                            ? course.course.level.charAt(0).toUpperCase() +
                              course.course.level.slice(1).toLocaleLowerCase()
                            : ""
                        }`
                      )}
                    </div>
                    <div>
                      <span className="font-bold">
                        {course.course.duration} hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-1 rounded-sm border-black">
              <p>Blog Post</p>
              <h1>What is {name} user for</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
