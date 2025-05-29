import CourseInfo from "@/components/learn/section/CourseInfo";
import CourseModule from "@/components/learn/section/CourseModule";
import React from "react";

type Props = { course: string };

export default function page({ params }: { params: Props }) {
  return (
    <div className="flex flex-col ">
      <CourseInfo name={params.course} />
      <CourseModule name={params.course} />
    </div>
  );
}
