import Link from "next/link";
import React from "react";

export default function AddingResourses() {
  return (
    <div className="flex flex-col ">
      <h1 className="text-2xl font-bold">Adding Resourses</h1>
      <Link href="/admin/resources">Adding Resources</Link>
      <Link href="/admin/courses">Adding Courses</Link>
    </div>
  );
}
