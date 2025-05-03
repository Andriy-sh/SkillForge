import Link from "next/link";
import React from "react";

export default function LearnNav() {
  return (
    <div className="flex flex-col space-y-4 p-4   bg-gray-50 h-screen overflow-y-auto sticky top-18 ">
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
        <span className="text-2xl">📂</span>
        <h3 className="text-lg font-semibold text-purple-600">Dashboard</h3>
      </div>
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
        <span className="text-2xl">📖</span>
        <Link href={"/learn/my-learning"} className="text-lg font-semibold">
          My learning
        </Link>
      </div>
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
        <span className="text-2xl">📅</span>
        <h3 className="text-lg font-semibold">Events</h3>
      </div>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">🧩</span>
          <h3 className="text-lg font-semibold">Projects</h3>
        </div>
        <span className="px-2 py-1 text-sm font-medium text-white bg-gray-800 rounded">
          Upgrade
        </span>
      </div>
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
        <span className="text-2xl">📁</span>
        <h3 className="text-lg font-semibold">Workspaces</h3>
      </div>
      <div className="p-4 bg-yellow-100 rounded-lg shadow">
        <p className="text-lg font-bold">
          Try Plus or Pro with a 7-day free trial
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Go deeper and learn job-ready skills. Practice with real-world
          projects, take assessments, and earn certificates.
        </p>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
          Try for free
        </button>
      </div>
    </div>
  );
}
