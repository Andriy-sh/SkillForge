import { getCoursesByResourseName } from "@/lib/actions/courses/getCourses";
import React from "react";
import { CourseCard } from "../cards/CourseCard";
import { CoursesInterface } from "@/types/courses";

type Props = {
  name: string;
};

export default async function CourseExplore({ name }: Props) {
  const courses: CoursesInterface[] = await getCoursesByResourseName(name);
  if (!courses) return <div>Courses not found</div>;
  return (
    <div className="grid grid-cols-3 gap-6 auto-rows-[1fr] ">
      {courses.map((course) => (
        <CourseCard
          key={course.course.id}
          level={course.course.level}
          title={course.course.name}
          description={course.course.description}
          href={`/learn/paths/${course.course.id}`}
          durationHours={course.course.duration}
          category={course.course.category}
        />
      ))}
    </div>
  );
}
