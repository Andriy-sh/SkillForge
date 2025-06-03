"use client";

import { useState } from "react";
import { CourseWithResourceInterface } from "@/types/courses";
import { CourseCard } from "../cards/CourseCard";

interface CourseCarouselProps {
  courseResources: CourseWithResourceInterface[];
}

export function CourseCarousel({ courseResources }: CourseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < courseResources.length) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  const visibleCourses = courseResources.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + itemsPerPage >= courseResources.length;

  return (
    <div className="space-y-12 px-10 py-6">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Courses</h2>
          <div className="space-x-2">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`px-3 py-1 border rounded ${
                isPrevDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              ← Prev
            </button>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`px-3 py-1 border rounded ${
                isNextDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleCourses.map(({ course }) => (
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
