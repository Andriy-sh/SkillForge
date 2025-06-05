"use client";

import RecentCourses from "@/components/profile/section/services/RecentCourses";
import { Enrollment } from "@/types/enrollmets";
import { useState } from "react";

export default function ProgressChoice({
  enrollment,
}: {
  enrollment: Enrollment[];
}) {
  const [progress, setProgress] = useState("in-progress");
  const compelteCourse = enrollment.filter(
    (course) => course.completedModulesCount === course.course.module?.length
  );
  const inprogressCourse = enrollment.filter(
    (course) =>
      (course.completedModulesCount ?? 0) < (course.course.module?.length ?? 0)
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 p-1 border-b border-black">
        <button
          onClick={() => setProgress("in-progress")}
          className={`relative flex-1 px-4 py-2 text-md transition-all duration-300 ${
            progress === "in-progress"
              ? "font-bold text-black"
              : "text-gray-700 hover:bg-[#f5e0d0]"
          }`}
        >
          In progress
          <span
            className={`absolute bottom-0 left-1/2 w-full -mb-1 h-[5px] bg-global origin-center transition-transform duration-300 ${
              progress === "in-progress"
                ? "scale-x-100 -translate-x-1/2"
                : "scale-x-0 -translate-x-1/2"
            }`}
          />
        </button>

        <button
          onClick={() => setProgress("completed")}
          className={`relative flex-1 px-4 py-2 text-md transition-all duration-300 ${
            progress === "completed"
              ? "font-bold text-black"
              : "text-gray-700 hover:bg-[# f5e0d0]"
          }`}
        >
          Completed
          <span
            className={`absolute bottom-0 left-1/2 w-full -mb-1 h-[5px] bg-global origin-center transition-transform duration-300 ${
              progress === "completed"
                ? "scale-x-100 -translate-x-1/2"
                : "scale-x-0 -translate-x-1/2"
            }`}
          />
        </button>
      </div>

      {progress === "in-progress" ? (
        <div className="space-y-4">
          <RecentCourses enrollment={inprogressCourse} topicButton={false} />
        </div>
      ) : (
        <div className="space-y-4">
          <RecentCourses enrollment={compelteCourse} topicButton={false} />
        </div>
      )}
    </div>
  );
}
