import React from "react";
import SideBarCourses from "./SideBarCourses";
import { CourseList } from "./CourseList";

export default function Courses() {
  return (
    <div className="flex min-h-screen  max-w-[1300px] mx-auto">
      <div className="grid grid-cols-[1fr_4fr]">
        <SideBarCourses />
        <CourseList />
      </div>
    </div>
  );
}
