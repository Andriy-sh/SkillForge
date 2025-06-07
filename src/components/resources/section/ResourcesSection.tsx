import React from "react";
import SectionResourcesInfo from "./SectionResourcesInfo";
import SectionResourcesTranding from "@/components/resources/section/SectionRosourcesTranding";
import SectionResourcesBrowseAll from "./SectionResourcesBrowseAll";

export default function ResourcesSection() {
  return (
    <div className="space-y-10">
      <SectionResourcesInfo />
      <SectionResourcesTranding />
      <SectionResourcesBrowseAll />
    </div>
  );
}
