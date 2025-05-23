import CourseForm from "@/components/admin/Courses/CoursesForm";
import React from "react";
import { prisma } from "../../../../prisma";

export default async function page() {
  const resourses = await prisma.resource.findMany();
  // rende
  return (
    <div>
      <CourseForm resourses={resourses} />
    </div>
  );
}
