import React from "react";
import SideBarCourses from "./SideBarCourses";
import { CourseList } from "./CourseList";
import { getCoursesNames } from "@/lib/actions/courses/getCourses";

export default async function Courses() {
  const coursesNames = await getCoursesNames();
  return (
    <div className="flex min-h-screen  max-w-[1300px] mx-auto">
      <div className="grid grid-cols-[1fr_4fr]">
        <SideBarCourses coursesNames={coursesNames} />
        <CourseList />
      </div>
    </div>
  );
}
