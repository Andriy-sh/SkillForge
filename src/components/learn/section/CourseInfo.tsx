import { getFullCourseByName } from "@/lib/actions/courses/getCourses";
import { CoursesInterface } from "@/types/courses";
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
import EnrollButton from "../button/EnrollButton";
import { ModuleInterface } from "@/types/modules";
import { slugify } from "@/lib/utils/strings";
import { getEnrollment } from "@/lib/actions/enrollment/getEnrollments";
import { auth } from "../../../../auth";

export default async function CourseInfo({ name }: { name: string }) {
  const namee = name?.replaceAll("-", " ") || name;
  const course: CoursesInterface[] = await getFullCourseByName(namee);
  const session = await auth();
  const totalUnits = course.reduce((acc, course) => {
    return (
      acc +
      (course.course.module?.reduce(
        (sum, mod) => sum + (mod._count?.units ?? 0),
        0
      ) ?? 0)
    );
  }, 0);
  const modules = course.reduce<ModuleInterface[]>((acc, courseItem) => {
    courseItem.course.module?.forEach((module) => {
      acc.push(module);
    });
    return acc;
  }, []);
  const nextTask = modules.find((module) => {
    if (!module.isCompleted) {
      return module.units?.some((unit) => {
        return !unit.isCompleted;
      });
    }
    return false;
  });
  const enrollment = await getEnrollment({
    courseId: course[0].course.id,
    userId: session?.user?.id ?? "",
  });
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
                    <EnrollButton
                      courseId={course.course.id}
                      enrollment={enrollment ? true : false}
                      clasName="w-[200px] "
                      moduleName={
                        nextTask?.title ? slugify(nextTask.title) : ""
                      }
                      unitName={
                        nextTask?.units?.[0]?.title
                          ? slugify(nextTask?.units[0].title)
                          : ""
                      }
                    />
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
                  <span className="font-bold">{totalUnits}</span>
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
    </div>
  );
}
