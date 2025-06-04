import React from "react";

export default function CourseSidebarFilter() {
  return (
    <aside className=" p-4 text-sm space-y-6 mt-5">
      <div className="flex justify-between items-center font-semibold text-lg">
        <span>Filters</span>
        <button className="text-gray-500 hover:underline text-sm">
          Clear filters
        </button>
      </div>

      {/* Level */}
      <div>
        <h3 className="font-semibold mb-2">Level</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Beginner
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Intermediate
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Advanced
          </label>
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          Price{" "}
          <a
            href="#"
            className="text-purple-700 hover:underline text-xs font-normal"
          >
            View plans
          </a>
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Free
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Paid
          </label>
        </div>
      </div>

      {/* Type */}
      <div>
        <h3 className="font-semibold mb-2">Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Career path <span title="A full learning journey">ⓘ</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Skill path <span title="Focused skills development">ⓘ</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Certification path <span title="Prepare for certification">ⓘ</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Course <span title="Individual course">ⓘ</span>
          </label>
        </div>
      </div>

      {/* Time to complete */}
      <div>
        <h3 className="font-semibold mb-2">
          Average time to complete <span title="Estimated time">ⓘ</span>
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Less than 5 hours
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            5–10 hours
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            10–20 hours
          </label>
        </div>
      </div>
    </aside>
  );
}
