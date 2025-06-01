import { getUnit } from "@/lib/actions/units/getUnits";
import { UnitTasks } from "@/types/units";
import { BookOpen, CheckCircle, CirclePlay, X } from "lucide-react";
import React from "react";
import NextStepControllerButton from "../button/NextStepControllerButton";

type Props = {
  unitName: string;
  unitIndex?: number;
  totalUnits?: number;
  moduleName: string;
};

const getTaskIcon = (type: string) => {
  switch (type) {
    case "READ":
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case "WATCH":
      return <CirclePlay className="h-5 w-5 text-purple-500" />;
    default:
      return <BookOpen className="h-5 w-5 text-gray-400" />;
  }
};

export default async function UnitSection({ unitName }: Props) {
  const units: UnitTasks[] = await getUnit(unitName);
  const unit = units[0];
  const unitIndex = unit.order;
  const { module } = unit;
  const totalUnits =
    unit.module.course.module?.[module.order].units?.length ?? null;
  console.log("module", unit);
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 font-pixel bg-background text-foreground">
      <header className="mb-10">
        <h1 className="text-5xl font-bold uppercase tracking-widest mb-4 border-b-4 border-black inline-block pb-2">
          {unit.title}
        </h1>
        {unit.description && (
          <p className="text-xl leading-relaxed text-foreground/80">
            {unit.description}
          </p>
        )}
      </header>
      <div className="grid gap-8">
        {unit.task.map((task, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 p-6 bg-background text-foreground shadow-[4px_4px_0px_#000] transition-none"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold uppercase flex items-center gap-3">
                  {getTaskIcon(task.type)}
                  {task.title}
                </h2>
                {task.description && (
                  <p className="text-lg text-foreground/70">
                    {task.description}
                  </p>
                )}
              </div>
              <span
                className={`flex items-center gap-2 text-base font-bold uppercase ${
                  task.isCompleted ? "text-green-600" : "text-red-600"
                }`}
              >
                {task.isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <X className="h-5 w-5" />
                )}
              </span>
            </div>

            <div className="space-y-4 text-lg leading-relaxed">
              {task.paragraph?.map((p, idx) => (
                <div key={idx}>
                  <p>{p.content}</p>
                  {p.bulletList && p.bulletList.length > 0 && (
                    <ul className="list-disc pl-6 mt-2">
                      {p.bulletList.map((b) => (
                        <li key={b.id}>{b.content}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <NextStepControllerButton
        courseId={module?.courseId}
        moduleIndex={module.order}
        totalModules={unit.module.course.module?.length ?? null}
        totalUnits={totalUnits}
        unitIndex={unitIndex}
        unitName={unitName}
      />
    </section>
  );
}
