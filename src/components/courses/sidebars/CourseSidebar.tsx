// components/courses/CourseSidebar.tsx
import React from "react";

const CourseSidebar = () => {
  return (
    <div className="w-64 space-y-4 p-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Related topics
        </h3>
        <ul className="list-none p-0">
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Web development
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Game development
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              HTML & CSS
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Code foundations
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              React
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Angular
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Top languages & subjects
        </h3>
        <ul className="list-none p-0">
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Python
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              JavaScript
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              AI
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              SQL
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              C++
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Java
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Cybersecurity
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Data science
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              C#
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm block py-1"
            >
              Web design
            </a>
          </li>
        </ul>
      </div>

      <button className="w-full bg-white border border-blue-500 text-blue-500 rounded-md py-2 text-sm font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        View full catalog
      </button>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Where do I begin?
        </h3>
      </div>
    </div>
  );
};

export default CourseSidebar;
