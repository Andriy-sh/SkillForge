import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getModulesByCourseName } from "@/lib/actions/modules/getModules";
import {
  Book,
  ChevronDown,
  FileText,
  GraduationCap,
  ListChecks,
  Puzzle,
} from "lucide-react";
import React, { JSX } from "react";

const unitIcons: Record<string, JSX.Element> = {
  lesson: <Book className="w-6 h-6" />,
  article: <FileText className="w-6 h-6" />,
  exercise: <ListChecks className="w-6 h-6 " />,
  project: <Puzzle className="w-6 h-6" />,
  quiz: <GraduationCap className="w-6 h-6" />,
};

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
    <section className="w-5xl my-10 bg-white mx-auto space-y-8 ">
      <header className="p-6 border-x-2 border-y  border-t-2 border-black mb-0  ">
        <h1 className="text-3xl font-bold mb-4">Syllabus for {courseName}</h1>
        <ul className="flex space-x-4 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            {unitIcons.lesson} Lessons: {counts.lesson}
          </li>
          <li className="flex items-center gap-2">
            {unitIcons.article} Articles: {counts.article}
          </li>
          <li className="flex items-center gap-2">
            {unitIcons.exercise} Exercises: {counts.exercise}
          </li>
          <li className="flex items-center gap-2">
            {unitIcons.project} Projects: {counts.project}
          </li>
          <li className="flex items-center gap-2">
            {unitIcons.quiz} Quizzes: {counts.quiz}
          </li>
        </ul>
      </header>
      <ul>
        {modules.map((module, index) => (
          <li
            key={module.id}
            className={`border border-x-2 ${
              index === modules.length - 1 ? "border-b-2" : "border-b"
            } border-black p-4 shadow-sm space-y-2 flex items-center gap-4 w-full`}
          >
            <div className="w-auto flex flex-col">
              <Accordion type="single" collapsible>
                <AccordionItem value={module.id}>
                  <AccordionTrigger className="cursor-pointer w-full">
                    <div className="flex items-start w-full gap-4">
                      <div className="w-10 h-10 flex-none shrink-0 flex justify-center items-center bg-global rounded-full text-white font-bold">
                        {module.order}
                      </div>

                      <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col">
                          <h2 className="text-xl font-semibold">
                            {module.title}
                          </h2>
                          <p className="text-gray-600">{module.description}</p>
                        </div>
                        <ChevronDown className="w-6 h-6 ml-4 shrink-0" />
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {module.units.map((u) => (
                      <div
                        key={u.id}
                        className="grid grid-cols-3 gap-x-6 px-4 py-3 items-center border-b hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-4 text-gray-800">
                          {unitIcons[u.type.toLowerCase()]}
                          <span className="capitalize">
                            {" "}
                            {u.type.charAt(0).toUpperCase() +
                              u.type.slice(1).toLowerCase()}
                          </span>
                        </div>
                        <div className="text-gray-900 font-medium">
                          {u.title}
                        </div>
                        <div></div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
