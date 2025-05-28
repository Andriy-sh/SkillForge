import { getCourseByName } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";
import {
  BarChart,
  Clock,
  ListCheck,
  Notebook,
  Puzzle,
  ShieldCheck,
  StarIcon,
} from "lucide-react";
import React from "react";
import Certificate from "./Certificate";

export default async function CourseInfo({ name }: { name: string }) {
  const namee = name?.replaceAll("-", " ") || name;
  const course: CourseWithResourceInterface[] = await getCourseByName(namee);
  return (
    <div>
      {course.map((course) => (
        <div key={course.course.id} className=" relative">
          <div className="relative  flex justify-center items-center flex-col">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 bottom-14"
              style={{
                backgroundImage:
                  "radial-gradient(#10162f 0.2px, transparent 1px)",
                backgroundSize: "5px 5px",
                backgroundPosition: "0 0",
                opacity: 1,
              }}
            />
            <div className="grid grid-cols-[6fr_4fr] max-w-[1000px] mb-20 mt-20 z-10 bg-background p-7 space-x-4 ">
              <div>
                <div className="space-y-5">
                  <p className="">
                    {course.course.category === "FREE" ? (
                      <div>
                        <span className="bg-[#10162f] text-white text-sm rounded-full inline-block  px-2 py-1">
                          {(course.course.category ?? "")
                            .charAt(0)
                            .toUpperCase() +
                            (course.course.category ?? "")
                              .slice(1)
                              .toLowerCase()
                              .replaceAll("_", " ")}
                        </span>{" "}
                        course
                      </div>
                    ) : (
                      <div className="bg-[#10162f] text-white text-sm rounded-full inline-block  px-2 py-1">
                        {(course.course.category ?? "")
                          .charAt(0)
                          .toUpperCase() +
                          (course.course.category ?? "")
                            .slice(1)
                            .toLowerCase()
                            .replaceAll("_", " ")}
                      </div>
                    )}
                  </p>
                  <h1 className="font-bold text-5xl">{course.course.name}</h1>
                  <p className="text-ellipsis whitespace-wrap">
                    {course.course.description}
                  </p>
                  <div>Ratting</div>
                  <div className="grid grid-cols-2 space-x-4">
                    <button className="bg-[#5533ff] text-white p-3 rounded-sm">
                      Start
                    </button>
                    <p className="p-3 text-center font-semibold">
                      1 870 301 learners enrolled
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-1 border-black my-3 ">
                <div className="grid p-5 gap-4">
                  <p className="font-bold text-2xl">This course includes</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <StarIcon />
                      AI assistance for guided coding help
                    </li>
                    <p className="border-b-1 mt-1 border-black"></p>
                    <li className="flex items-center gap-2">
                      <Puzzle />
                      Projects to apply new skills
                    </li>
                    <p className="border-b-1 mt-1 border-black"></p>
                    <li className="flex items-center gap-2">
                      <ListCheck />
                      Quizzes to test your knowledge
                    </li>
                    <p className="border-b-1 mt-1 border-black"></p>
                    <li className="flex items-center gap-2">
                      <ShieldCheck /> A certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 max-w-[1000px] min-w-[1000px] z-10  bg-background p-7 border-1 border-black  text-start">
              <div className="flex space-x-3 justify-center items-center text-lg">
                <BarChart className="w-10 h-10 text-global" />
                <div>
                  <p>Skill level</p>
                  <span className="font-bold">
                    {(course.course.level ?? "").charAt(0).toUpperCase() +
                      (course.course.level ?? "").slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3 justify-center items-center text-lg">
                <Clock className="w-10 h-10 text-global" />
                <div>
                  <p>Time to complete</p>
                  <span className="font-bold">
                    {course.course.duration} hours
                  </span>
                </div>
              </div>
              <div className="flex space-x-3 justify-center items-center text-lg">
                <Puzzle className="w-10 h-10 text-global" />
                <div>
                  <p>Lessons</p>
                  <span className="font-bold">14</span>
                </div>
              </div>
              <div className="flex space-x-3 justify-center items-center text-lg">
                <Notebook className="w-10 h-10  text-global" />
                <div>
                  <p>Prerequisites</p>
                  <span className="font-bold">None</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Certificate />
    </div>
  );
}
