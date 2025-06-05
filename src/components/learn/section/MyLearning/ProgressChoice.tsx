"use client";

import { useState } from "react";

export default function ProgressChoice() {
  const [progress, setProgress] = useState("in-progress");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-lg bg-[#FDF6F4] p-1">
        <button
          onClick={() => setProgress("in-progress")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            progress === "in-progress"
              ? "bg-violet-600 text-white"
              : "text-gray-700 hover:text-violet-600"
          }`}
        >
          In progress
        </button>
        <button
          onClick={() => setProgress("completed")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            progress === "completed"
              ? "bg-violet-600 text-white"
              : "text-gray-700 hover:text-violet-600"
          }`}
        >
          Completed
        </button>
      </div>

      {progress === "in-progress" ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">In Progress Content</h2>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Completed Content</h2>
        </div>
      )}
    </div>
  );
}
