import CourseTemplate from "@/components/courses/CourseTemplate";
import React from "react";

type Props = { type: string; name: string };

export default function page({ params }: { params: Props }) {
  const decodedName = decodeURIComponent(params.name);
  return <CourseTemplate name={decodedName} />;
}
