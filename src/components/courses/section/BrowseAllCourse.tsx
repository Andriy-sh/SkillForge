import { getAllCoursesWithResourceByName } from "@/lib/actions/courses/getCourses";
import React from "react";
import { CourseCard } from "../cards/CourseCard";
import { CoursesInterface } from "@/types/courses";

type Props = {
  className?: string;
};

export default async function BrowsAllCourse({ className }: Props) {
  const courses: CoursesInterface[] = await getAllCoursesWithResourceByName();
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return (
    <div className={`${className} flex flex-col  `}>
      <h1 className="text-2xl font-bold">
        Browse the full catalog{" "}
        <span className="text-lg font-medium">{courses.length} results</span>
      </h1>
      <div className="grid grid-cols-3 gap-6 auto-rows-[1fr]">
        {courses.map((course) => (
          <CourseCard
            key={course.course.id}
            level={course.course.level}
            title={course.course.name}
            description={course.course.description}
            href={`/learn/${course.course.name.replace(/\s/g, "-")}`}
            durationHours={course.course.duration}
            category={course.course.category}
          />
        ))}
      </div>
    </div>
  );
}
