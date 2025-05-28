import { getCoursesAll } from "@/lib/actions/courses/getCourses";
import { CourseWithResourceInterface } from "@/types/courses";

export async function CourseList() {
  const courseResources: CourseWithResourceInterface[] = await getCoursesAll();

  return (
    <div className="space-y-12 p-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseResources.map(({ course, resource }) => (
            <div
              key={course.id}
              className="border rounded-xl p-6 bg-white hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  {course.type}
                </span>
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-gray-600">{resource.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{course.level}</span>
                  <span>{course.duration}h</span>
                </div>
                {course.price !== null && (
                  <div className="text-sm text-gray-600">
                    Price: ${course.price}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
