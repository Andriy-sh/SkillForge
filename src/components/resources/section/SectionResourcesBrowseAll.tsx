import React from "react";
import ResourceCard from "../card/ResourceCard";
import { info } from "./SectionRosourcesTranding";

export default function SectionResourcesBrowseAll() {
  return (
    <section className="flex flex-col gap-5">
      <div className="text-2xl font-bold">Browse all articles</div>
      <ResourceCard info={info} />
    </section>
  );
}
