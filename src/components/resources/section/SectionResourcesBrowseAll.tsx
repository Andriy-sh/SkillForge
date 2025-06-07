import React from "react";
import ResourceCard from "../card/ResourceCard";
import { getAllDocs } from "@/lib/actions/resourcesDoc/getDoc";

export default async function SectionResourcesBrowseAll() {
  const info = await getAllDocs();
  return (
    <section className="flex flex-col gap-5">
      <div className="text-2xl font-bold">Browse all articles</div>
      <ResourceCard info={info} />
    </section>
  );
}
