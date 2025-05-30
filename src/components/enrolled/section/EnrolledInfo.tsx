import EnrollButton from "@/components/learn/button/EnrollButton";
import { getFullCourseByName } from "@/lib/actions/courses/getCourses";
import { slugify } from "@/lib/utils/strings";
import { CoursesInterface } from "@/types/courses";
import { ModuleInterface } from "@/types/modules";
import {
  Book,
  FileText,
  GraduationCap,
  ListChecks,
  Puzzle,
} from "lucide-react";
import React, { JSX } from "react";

type Props = {
  courseName: string;
};
const unitIcons: Record<string, JSX.Element> = {
  lesson: <Book className="w-6 h-6" />,
  article: <FileText className="w-6 h-6" />,
  exercise: <ListChecks className="w-6 h-6 " />,
  project: <Puzzle className="w-6 h-6" />,
  quiz: <GraduationCap className="w-6 h-6" />,
};
export default async function EnrolledInfo({ courseName }: Props) {
  const course: CoursesInterface[] = await getFullCourseByName(courseName);
  const counts = course.reduce(
    (acc, courseItem) => {
      courseItem.course.module?.forEach((module) => {
        module.units.forEach((u) => {
          const key = u.type.toLowerCase() as
            | "information"
            | "lesson"
            | "article"
            | "exercise"
            | "project"
            | "quiz";
          acc[key]++;
        });
      });
      return acc;
    },
    { information: 0, lesson: 0, article: 0, exercise: 0, project: 0, quiz: 0 }
  );
  const modules = course.reduce<ModuleInterface[]>((acc, courseItem) => {
    courseItem.course.module?.forEach((module) => {
      acc.push(module);
    });
    return acc;
  }, []);
  const nextTask = modules.find((module) => {
    if (!module.isCompleted) {
      return module.units.some((unit) => {
        return !unit.isCompleted;
      });
    }
    return false;
  });
  return (
    <div className=" mt-10">
      {course.map((course) => (
        <div key={course.course.id}>
          <div className="grid grid-cols-[5fr_3fr]">
            <div className=" flex flex-col p-8 space-y-5">
              <h1 className="text-5xl font-bold">{course.course.name}</h1>
              <EnrollButton
                courseId={course.course.id}
                enrollment={course ? true : false}
                clasName="w-[200px] "
                moduleName={nextTask?.title ? slugify(nextTask.title) : ""}
                unitName={
                  nextTask?.units[0].title
                    ? slugify(nextTask?.units[0].title)
                    : ""
                }
              />
              <span className="text-ellipsis">{course.course.description}</span>
              <p className="text-2xl font-semibold">Course Progress </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "23%" }}
                ></div>
              </div>
              <span className="text-sm text-gray-500">23% Complete</span>
            </div>
            <div className="bg-blue-50 rounded-md px-4 py-4 flex-col  flex space-y-4 justify-center">
              {Object.entries(counts)
                .filter(([, count]) => count > 0)
                .map(([type, count]) => (
                  <div
                    key={type}
                    className="flex items-center border-b border-global gap-4 pb-2"
                  >
                    {unitIcons[type]}
                    <span className="text-gray-700">
                      <strong>{count}</strong>{" "}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                      {count > 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              <div className="flex items-center border-b border-global gap-4 pb-2">
                <GraduationCap className="w-6 h-6 " />
                <span className="text-gray-700">
                  {(course.course.level || "").charAt(0).toUpperCase() +
                    course.course.level?.slice(1).toLowerCase()}
                </span>
              </div>
              <div className="flex items-center border-b  gap-4 border-global pb-2">
                <Book className="w-6 h-6" />
                <span className="text-gray-700">Course</span>
              </div>
            </div>
          </div>
          <div>3</div>
        </div>
      ))}
    </div>
  );
}
