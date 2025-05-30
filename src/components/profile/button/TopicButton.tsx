import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function TopicButton({
  resourseType,
  resourseName,
}: {
  resourseType: string;
  resourseName: string;
}) {
  return (
    <Link
      href={`/courses/${resourseType}/${resourseName}`}
      className="text-[#a39bf2] flex p-6 z-20"
    >
      View All Topic <ChevronRight />
    </Link>
  );
}
