import EnrolledInfo from "@/components/enrolled/section/EnrolledInfo";
import CourseModule from "@/components/learn/section/CourseModule";
import React from "react";

type Props = {
  course: string;
};

export default function page({ params }: { params: Props }) {
  const course = params.course;
  const decodedCourse = decodeURIComponent(course);
  const name = decodedCourse.replace(/-/g, " ");
  return (
    <div className="flex flex-col  px-30 min-h-screen  bg-white">
      <div>
        <EnrolledInfo courseName={name} />
        <CourseModule name={name} />
      </div>
    </div>
  );
}
