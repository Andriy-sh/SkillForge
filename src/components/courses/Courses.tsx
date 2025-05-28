import React from "react";
import { CourseList } from "./explore/CourseList";
import { getResourcesNames } from "@/lib/actions/resourses/getResources";
import SidebarCourses from "./sidebars/SidebarCourses";

export default async function Courses() {
  const resoursesNames = await getResourcesNames();
  return (
    <div className="flex min-h-screen  max-w-[1300px] mx-auto">
      <div className="grid grid-cols-[1fr_4fr]">
        <SidebarCourses resoursesNames={resoursesNames} />
        <CourseList />
      </div>
    </div>
  );
}
