import React from "react";
import SideBarCourses from "./SideBarCourses";
import { CourseList } from "./CourseList";
import { getResourcesNames } from "@/lib/actions/resourses/getResources";

export default async function Courses() {
  const resoursesNames = await getResourcesNames();
  return (
    <div className="flex min-h-screen  max-w-[1300px] mx-auto">
      <div className="grid grid-cols-[1fr_4fr]">
        <SideBarCourses resoursesNames={resoursesNames} />
        <CourseList />
      </div>
    </div>
  );
}
