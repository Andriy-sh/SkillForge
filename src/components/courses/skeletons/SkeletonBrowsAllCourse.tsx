import React from "react";

function CourseCardSkeleton() {
  return (
    <div className="h-[280px] w-[300px] p-2 flex flex-col rounded-sm border border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.3)] max-w-sm justify-between animate-pulse">
      <div>
        <div className="bg-gray-300 rounded-sm h-6 w-24 mb-2"></div>

        <div className="p-2 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded-full w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded-full w-2/3"></div>
        </div>
      </div>

      <div className="border-t mt-4 border-dotted border-slate-800 pt-4 pb-4">
        <div className="flex items-end justify-between text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 rounded-full h-4 w-4"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-14"></div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCardSkeletonGrid() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Browse the full catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {[...Array(9)].map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
