import React from "react";
import { CourseList } from "./section/CourseList";
import { getResourcesNames } from "@/lib/actions/resources/getResources";
import SidebarCourses from "./sidebars/SidebarCourses";
import CatalogAssistant from "./section/CourseAssistant";
import CourseSidebarFilter from "./sidebars/CourseSidebarFilter";
import CourseFilter from "@/components/courses/section/CourseExplore";

export default async function Courses() {
  const resourcesNames = await getResourcesNames();
  return (
    <div className="flex  flex-col ">
      <CatalogAssistant />
      <div className="grid grid-cols-[1fr_3fr] min-h-screen mt-5  max-w-[1300px] mx-auto gap-4">
        <SidebarCourses resourcesNames={resourcesNames} />
        <CourseList />
        <div className="col-span-2 grid grid-cols-[1fr_3fr] gap-4 my-10 ">
          <CourseSidebarFilter />
          <CourseFilter name={"Docker"} />
        </div>
      </div>
    </div>
  );
}
