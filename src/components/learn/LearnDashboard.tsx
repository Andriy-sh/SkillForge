import React from "react";

export default function LearnDashboard({ course }: { course: string[] }) {
  return (
    <div className="min-h-screen ">
      <h1 className="text-2xl font-bold mb-6">Welcome to your dashboard!</h1>

      <h2 className="text-xl font-semibold mb-4">Latest Courses</h2>
      {course.map((courseName) => (
        <div key={courseName} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{courseName}</h2>
          <div className="bg-white shadow-md rounded-lg ">
            <h3 className="text-lg font-semibold mb-2">Course Progress</h3>
            <p className="text-sm text-gray-500 mb-4">0% completed</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
            <button className="text-blue-500 hover:underline">Continue</button>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Subjects and languages</h3>
          <p className="text-sm text-gray-500 mb-4">
            Take action to stay motivated
          </p>
          <button className="text-blue-500 hover:underline">
            Continue in Learn TypeScript
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Work toward your goal</h3>
          <p className="text-sm text-gray-500 mb-4">
            By having a goal, you can increase your chances of success by up to
            42%!
          </p>
          <button className="text-blue-500 hover:underline">
            Choose a goal
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Explore recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Not sure where to start?</h4>
            <p className="text-sm text-gray-500 mb-4">
              Answer 3 quick questions and get recommendations just for you.
            </p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Start
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Learn to Code with Blockly</h4>
            <p className="text-sm text-gray-500 mb-4">
              Beginner Friendly - 2 hours
            </p>
            <button className="text-blue-500 hover:underline">View</button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Code Foundations</h4>
            <p className="text-sm text-gray-500 mb-4">
              Beginner Friendly - Includes 6 Courses
            </p>
            <button className="text-blue-500 hover:underline">View</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="font-semibold mb-2">Interview Simulator</h4>
          <p className="text-sm text-gray-500 mb-4">
            Practice your interviewing skills and get real-time, AI-powered
            feedback.
          </p>
          <button className="text-blue-500 hover:underline">Try now</button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="font-semibold mb-2">Job-readiness checker</h4>
          <p className="text-sm text-gray-500 mb-4">
            Analyze job postings to check for the skills you need to advance
            your career.
          </p>
          <button className="text-blue-500 hover:underline">Check now</button>
        </div>
      </div>
    </div>
  );
}
