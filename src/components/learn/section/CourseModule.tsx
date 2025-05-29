import { getModulesByCourseName } from "@/lib/actions/modules/getModules";
import React, { JSX } from "react";

export default async function CourseModule({
  name,
}: {
  name: string;
}): Promise<JSX.Element> {
  const courseName = name.replace(/-/g, " ");
  const modules = await getModulesByCourseName(courseName);

  if (modules.length === 0) {
    return <p className="text-center py-10">No modules found.</p>;
  }

  const counts = modules.reduce(
    (acc, module) => {
      module.units.forEach((u) => {
        const key = u.type.toLowerCase() as
          | "lesson"
          | "article"
          | "exercise"
          | "project"
          | "quiz";
        acc[key]++;
      });
      return acc;
    },
    { lesson: 0, article: 0, exercise: 0, project: 0, quiz: 0 }
  );

  return (
    <section className="w-5xl my-10 bg-white mx-auto p-6 space-y-8 border-1 border-black">
      <header>
        <h1 className="text-3xl font-bold mb-4">Syllabus for {courseName}</h1>
        <ul className="flex space-x-4 text-sm text-gray-600">
          <li>Lessons: {counts.lesson}</li>
          <li>Articles: {counts.article}</li>
          <li>Exercises: {counts.exercise}</li>
          <li>Projects: {counts.project}</li>
          <li>Quizzes: {counts.quiz}</li>
        </ul>
      </header>

      {modules.map((module) => (
        <article
          key={module.id}
          className="border rounded-lg p-4 shadow-sm space-y-2 flex items-center gap-4"
        >
          <span className="w-10 h-10 text-center flex justify-center items-center bg-global rounded-full text-white font-bold">
            {module.order}
          </span>
          <div>
            <h2 className="text-xl font-semibold">{module.title}</h2>
            <p className="text-gray-600">{module.description}</p>
            <ul className="list-disc pl-5 space-y-1">
              {module.units.map((u) => (
                <li key={u.id}>
                  <span className="font-medium">{u.type}</span>
                  {u.title && <>: {u.title}</>}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
