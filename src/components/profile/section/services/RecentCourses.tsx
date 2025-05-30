import { Enrollment } from "@/types/enrollmets";
import TopicButton from "../../button/TopicButton";
import Link from "next/link";

export default function RecentCourses({
  enrollment,
}: {
  enrollment: Enrollment[];
}) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Latest Courses</h2>
      {enrollment.map((course) => (
        <div key={course.course.id} className="p-4 grid grid-cols-[4fr_7fr]">
          <div className="bg-[#2c2760] text-white rounded-lg ">
            <div className="flex flex-col p-6">
              <p className="text-[#625c9e]">Course</p>
              <h1 className="text-2xl font-light text-ellipsis">
                {course.course.name}
              </h1>
            </div>
            <TopicButton
              resourseName={
                course.course.resources?.[0]?.resource.name || "tttt"
              }
              resourseType={
                course.course.resources?.[0]?.resource.type.toLowerCase() ||
                "tttt"
              }
            />
          </div>
          <div className="bg-white grid grid-cols-[5fr_3fr]">
            <div className="p-6 font-normal">
              <h1 className="opacity-75 text-[#5c5c76] p-2">
                Module {course.course.currentModule}
              </h1>
              <p className="text-lg font-normal text-global p-2">
                {course.course.module?.find(
                  (m) => m.order === course.course.currentModule
                )?.title || "Module not found"}
              </p>
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        ((course.course.currentModule ?? 0) /
                          (course.course.module?.length || 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {course.course.currentModule} of{" "}
                  {course.course.module?.length} modules completed
                </div>
              </div>
              <Link
                href={`/enrolled/courses/${course.course.name.replace(
                  / /g,
                  "-"
                )}`}
                className="px-4 py-2  rounded-3xl bg-[#2c2760] text-white mx-auto font-extralight"
              >
                Resume course
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
