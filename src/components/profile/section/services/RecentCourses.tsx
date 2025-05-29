"use client";

import { Enrollment } from "@/types/enrollmets";

export default function RecentCourses({
  enrollment,
}: {
  enrollment: Enrollment[];
}) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Latest Courses</h2>
      {enrollment.map((item) => (
        <div
          key={item.course.id}
          className="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-gray-500">Course</p>
            <h3 className="text-lg font-semibold">{item.course.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{item.progress}%</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <button className="text-blue-600 hover:underline">{">"}</button>
          </div>
        </div>
      ))}
    </section>
  );
}
