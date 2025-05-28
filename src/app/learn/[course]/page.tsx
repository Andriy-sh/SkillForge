import CourseInfo from "@/components/learn/explore/CourseInfo";
import React from "react";

type Props = { course: string };

export default function page({ params }: { params: Props }) {
  return <CourseInfo name={params.course} />;
}
