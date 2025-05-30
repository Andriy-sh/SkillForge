import { getUnit } from "@/lib/actions/units/getUnits";
import { UnitTasks } from "@/types/units";
import { BookOpen, CheckCircle, CirclePlay } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  unitName: string;
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

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {unit.title}
        </h1>
        {unit.description && (
          <p className="text-lg text-gray-600 leading-relaxed">
            {unit.description}
          </p>
        )}
      </header>

      <div className="grid gap-8">
        {unit.task.map((task, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-white border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex justify-center gap-4 flex-col">
                <h2 className="text-2xl font-medium text-[#1a1a1a] flex items-center gap-4">
                  {getTaskIcon(task.type)}
                  {task.title}
                </h2>
                {task.description && (
                  <p className="text-gray-600">{task.description}</p>
                )}
              </div>
              {task.isCompleted ? (
                <span className="text-green-600 flex items-center gap-2 text-sm font-medium">
                  <CheckCircle className="h-4 w-4" /> Completed
                </span>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full px-5 py-1.5 text-sm font-semibold"
                >
                  Start
                </Button>
              )}
            </div>

            <div className="space-y-4 text-[#333] text-base leading-relaxed">
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
    </section>
  );
}
