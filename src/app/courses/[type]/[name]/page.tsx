import CourseFilter from "@/components/courses/explore/CourseExplore";
import CourseIntroSection from "@/components/courses/explore/CourseIntroSection";
import CourseSidebar from "@/components/courses/sidebars/CourseSidebar";
import CourseSidebarFilter from "@/components/courses/sidebars/CourseSidebarFilter";
import CourseCountHeader from "@/components/courses/summary/CourseCountHeader";
import React from "react";

type Props = { type: string; name: string };

export default function page({ params }: { params: Props }) {
  const decodedName = decodeURIComponent(params.name);
  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-2 min-h-screen  max-w-[1300px] mx-auto pb-10">
      <CourseSidebar />
      <CourseIntroSection name={decodedName} type={params.type} />
      <div className="col-span-2 grid grid-cols-[1fr_3fr] gap-4 ">
        <CourseCountHeader name={decodedName} />
        <CourseSidebarFilter />
        <CourseFilter name={decodedName} />
      </div>
    </div>
  );
}
