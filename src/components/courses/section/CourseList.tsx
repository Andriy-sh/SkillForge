// components/lists/CourseList.tsx

import { getLast15Courses } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";
import { CourseCarousel } from "./CourseCarousel";
import { ResoursCarousel } from "./ResoursCarousel";

export async function CourseList() {
  const courseResources: CourseWithResourceInterface[] =
    await getLast15Courses();

  return (
    <div className="flex flex-col">
      <ResoursCarousel
        names={["name", "name1", "name2", "name4", "name5", "name6"]}
      />

      <CourseCarousel courseResources={courseResources} />
    </div>
  );
}
