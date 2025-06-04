import React from "react";
import { CourseList } from "./section/CourseList";
import { getResourcesNames } from "@/lib/actions/resources/getResources";
import SidebarCourses from "./sidebars/SidebarCourses";
import CatalogAssistant from "./section/CourseAssistant";

export default async function Courses() {
  const resourcesNames = await getResourcesNames();
  return (
    <div className="flex  flex-col ">
      <CatalogAssistant />
      <div className="grid grid-cols-[1fr_4fr] min-h-screen mt-5  max-w-[1300px] mx-auto">
        <SidebarCourses resourcesNames={resourcesNames} />
        <CourseList />
      </div>
    </div>
  );
}
