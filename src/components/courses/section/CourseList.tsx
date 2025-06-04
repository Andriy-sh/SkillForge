// components/lists/CourseList.tsx

import { getLast15Courses } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";
import { CourseCarousel } from "./CourseCarousel";
import { ResourceCarousel } from "./ResourceCarousel";
import { get15NamesOfMostPopularResources } from "@/lib/actions/resources/getResources";

export async function CourseList() {
  const courseResources: CourseWithResourceInterface[] =
    await getLast15Courses();
  const resources = await get15NamesOfMostPopularResources();
  return (
    <div className="flex flex-col">
      <ResourceCarousel names={resources} />

      <CourseCarousel courseResources={courseResources} />
    </div>
  );
}
