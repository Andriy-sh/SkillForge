import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  unitName: string;
  unitIndex: number;
  totalUnits: number | null;
  moduleIndex: number;
  totalModules: number | null;
  courseId: string;
};

export default function NextStepControllerButton({
  unitName,
  unitIndex,
  totalUnits,
  moduleIndex,
  totalModules,
  courseId,
}: Props) {
  return (
    <div className="flex justify-between mt-12">
      <div>
        <p>Unit name {unitName}</p>
        <p>Unit index {unitIndex}</p>
        <p>Total Unit {totalUnits}</p>
        <p>Module index {moduleIndex}</p>
        <p>Total Module {totalModules}</p>
        <p>Course id {courseId}</p>
      </div>
      <Button
        variant="ghost"
        className="rounded-none border border-black px-6 py-2 text-base font-bold uppercase shadow-[2px_2px_0px_#000]"
        disabled={unitIndex === 0}
      >
        Back
      </Button>
      <Button
        variant="ghost"
        className="rounded-none border border-black px-6 py-2 text-base font-bold uppercase shadow-[2px_2px_0px_#000]"
        disabled={unitIndex + 1 >= totalUnits!}
      >
        Next
      </Button>
    </div>
  );
}
