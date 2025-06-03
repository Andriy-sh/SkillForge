import { getCoursesAll } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";
import { CourseCard } from "../cards/CourseCard";

export async function CourseList() {
  const courseResources: CourseWithResourceInterface[] = await getCoursesAll();

  return (
    <div className="space-y-12 p-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseResources.map(({ course }) => (
            <CourseCard
              key={course.id}
              level={course.level}
              title={course.name}
              description={course.description}
              href={`/learn/${course.name.replace(/\s/g, "-")}`}
              durationHours={course.duration}
              category={course.category}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
