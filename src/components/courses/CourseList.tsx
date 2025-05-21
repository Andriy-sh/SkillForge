import { CourseCard } from "./CourseCard";

interface Course {
  title: string;
  description: string;
  type: string;
  level: string;
  duration: string;
  courseCount?: number;
  certification?: string;
}

export function CourseList() {
  const trendingSubjects = [
    {
      title: "AI Fundamentals",
      type: "AI",
      href: "/courses/ai",
      color: "bg-green-500",
    },
    {
      title: "Python Basics",
      type: "Python",
      href: "/courses/python",
      color: "bg-blue-500",
    },
    {
      title: "JavaScript",
      type: "JavaScript",
      href: "/courses/javascript",
      color: "bg-purple-500",
    },
  ];

  const featuredCourses: Course[] = [
    {
      title: "Introduction to Cybersecurity",
      description:
        "Learn about the fast-growing field of cybersecurity and how to protect your data and information from digital attacks.",
      type: "Free course",
      level: "Beginner Friendly",
      duration: "3 hours",
    },
    {
      title: "Full-Stack Engineer",
      description:
        "A full-stack engineer can get a project done from start to finish, back-end to front-end.",
      type: "Career path",
      level: "Beginner Friendly",
      duration: "150 hours",
      courseCount: 51,
      certification: "With Professional Certification",
    },
    {
      title: "Code Foundations",
      description:
        "Start your programming journey with an introduction to the world of code and basic concepts.",
      type: "Skill path",
      level: "Beginner Friendly",
      duration: "4 hours",
      courseCount: 5,
      certification: "With Certificate",
    },
  ];

  return (
    <div className="space-y-12 p-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending subjects & languages</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-700">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingSubjects.map((subject, index) => (
            <CourseCard key={index} {...subject} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured courses and paths</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 bg-white hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  {course.type}
                </span>
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                </div>
                {course.courseCount && (
                  <div className="text-sm text-gray-600">
                    Includes {course.courseCount} Courses
                  </div>
                )}
                {course.certification && (
                  <div className="text-sm text-gray-600">
                    {course.certification}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
