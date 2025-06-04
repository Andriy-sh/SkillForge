"use client";

import { useState } from "react";
import ResourceCard from "../cards/ResourceCard";

interface Resource {
  name: string;
  type: string;
}

interface CourseCarouselProps {
  names: Resource[];
}

export function ResourceCarousel({ names }: CourseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < names.length) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  const visibleNames = names.slice(currentIndex, currentIndex + itemsPerPage);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + itemsPerPage >= names.length;

  return (
    <div className="space-y-12 ">
      <section className="flex flex-col items-center w-full px-10 py-6">
        <div className="flex justify-between items-center w-full max-w-6xl mb-6">
          <h2 className="text-2xl font-bold">Trending subjects & languages</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {visibleNames.map((item) => (
            <ResourceCard
              key={item.name}
              name={item.name}
              href={`/courses/${item.type.toLocaleLowerCase()}/${item.name}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
