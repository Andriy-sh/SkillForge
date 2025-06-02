"use client";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils/strings";
import { ModuleInterface } from "@/types/modules";
import { Unit } from "@/types/units";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

// 🔧 Заглушки (заміни на справжні імпорти)
async function completeUnit(unitId: string) {
  console.log("✅ Unit completed:", unitId);
}
async function completeModule(moduleId: string) {
  console.log("✅ Module completed:", moduleId);
}
async function completeCourse(courseId: string) {
  console.log("🎓 Course completed:", courseId);
}

type Props = {
  unitIndex: number;
  totalUnits: number | null;
  moduleIndex: number;
  totalModules: number | null;
  courseId: string;
  modules?: ModuleInterface[] | null;
};

export default function NextStepControllerButton({
  unitIndex,
  totalUnits,
  moduleIndex,
  totalModules,
  courseId,
  modules,
}: Props) {
  const router = useRouter();

  const sortedModules = useMemo(() => {
    if (!modules) return [];
    return modules.slice().sort((a, b) => a.order - b.order);
  }, [modules]);

  const getSortedUnits = (moduleIndex: number): Unit[] => {
    const currentModuleData = sortedModules[moduleIndex];
    if (!currentModuleData?.units) return [];
    return currentModuleData.units.slice().sort((a, b) => a.order - b.order);
  };

  const handleBack = async () => {
    const units = getSortedUnits(moduleIndex);

    if (unitIndex > 0) {
      const prevUnit = units[unitIndex - 1]?.title;
      const currentModule = sortedModules?.[moduleIndex]?.title;
      if (prevUnit && currentModule) {
        router.push(
          `/learn/module/${slugify(currentModule)}/unit/${slugify(prevUnit)}`
        );
      }
      return;
    }

    if (moduleIndex > 0) {
      const prevModuleUnits = getSortedUnits(moduleIndex - 1);
      const prevModule = sortedModules?.[moduleIndex - 1];
      const prevUnit = prevModuleUnits[prevModuleUnits.length - 1]?.title;
      if (prevModule && prevUnit) {
        router.push(
          `/learn/module/${slugify(prevModule.title)}/unit/${slugify(prevUnit)}`
        );
      }
      return;
    }

    alert("Це перший юніт першого модуля");
  };

  const handleNext = async () => {
    const units = getSortedUnits(moduleIndex);
    const currentUnit = units[unitIndex];
    const currentModule = sortedModules[moduleIndex];

    if (currentUnit) {
      await completeUnit(currentUnit.id);
    }

    if (unitIndex + 1 < units.length) {
      const nextUnit = units[unitIndex + 1]?.title;
      if (nextUnit && currentModule) {
        router.push(
          `/learn/module/${slugify(currentModule.title)}/unit/${slugify(
            nextUnit
          )}`
        );
      }
      return;
    }

    if (currentModule) {
      await completeModule(currentModule.id);
    }

    if (moduleIndex + 1 < sortedModules.length) {
      const nextModuleUnits = getSortedUnits(moduleIndex + 1);
      const nextModule = sortedModules[moduleIndex + 1];
      if (nextModule && nextModuleUnits.length > 0) {
        const nextUnit = nextModuleUnits[0].title;
        router.push(
          `/learn/module/${slugify(nextModule.title)}/unit/${slugify(nextUnit)}`
        );
      }
      return;
    }

    alert("Ви завершили всі модулі 🎉");
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
    alert("🎉 Курс завершено!");
    router.push("/dashboard"); 
  };

  const isCourseCompleted =
    unitIndex + 1 >= (totalUnits ?? 0) &&
    moduleIndex + 1 >= (totalModules ?? 0);

  return (
    <div className="flex flex-col items-start gap-4 mt-12">
      <div className="flex gap-4">
        <Button
          variant="ghost"
          className="rounded-none border border-black px-6 py-2 text-base font-bold uppercase shadow-[2px_2px_0px_#000]"
          disabled={unitIndex === 0 && moduleIndex === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        {isCourseCompleted ? (
          <Button
            variant="ghost"
            className="rounded-none border border-green-600 px-6 py-2 text-base font-bold uppercase shadow-[2px_2px_0px_#000] text-green-700"
            onClick={handleCompleteCourse}
          >
            Complete Course
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="rounded-none border border-black px-6 py-2 text-base font-bold uppercase shadow-[2px_2px_0px_#000]"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
