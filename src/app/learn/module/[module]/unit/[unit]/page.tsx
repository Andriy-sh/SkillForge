import UnitSection from "@/components/learn/section/UnitSection";
import { deslugify } from "@/lib/utils/strings";
import React from "react";

type Params = {
  module: string;
  unit: string;
};

export default function page({ params }: { params: Params }) {
  const { module, unit } = params;
  console.log(module, unit);
  const moduleName = deslugify(module);
  const unitName = deslugify(unit);
  console.log(moduleName, unitName);
  return <UnitSection unitName={unitName} moduleName={moduleName} />;
}
