import React from "react";
import { CourseList } from "./section/CourseList";
import { getResourcesNames } from "@/lib/actions/resourses/getResources";
import SidebarCourses from "./sidebars/SidebarCourses";
import CatalogAssistant from "./section/CourseAssistant";

export default async function Courses() {
  const resoursesNames = await getResourcesNames();
  return (
    <div className="flex  flex-col">
      <CatalogAssistant />
      <div className="grid grid-cols-[1fr_4fr] min-h-screen   max-w-[1300px] mx-auto">
        <SidebarCourses resoursesNames={resoursesNames} />
        <CourseList />
      </div>
    </div>
  );
}
