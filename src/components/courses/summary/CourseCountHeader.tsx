import { getCoursesByResourseName } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";
import React from "react";

type Props = {
  name: string;
};

export default async function CourseCountHeader({ name }: Props) {
  const courses: CourseWithResourceInterface[] = await getCoursesByResourseName(
    name
  );
  return (
    <div className="col-span-2 text-lg w-full border-b-1 border-slate-800">
      <span className="mr-2 text-lg font-bold">{name} courses</span>
      <span>
        {courses.length === 1
          ? `${courses.length} result`
          : `${courses.length} results`}
      </span>
    </div>
  );
}
