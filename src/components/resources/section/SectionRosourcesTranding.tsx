import React from "react";
import ResourceCard from "../card/ResourceCard";
import { getAllDocs } from "@/lib/actions/resourcesDoc/getDoc";

export default async function SectionResourcesTranding() {
  const allDocs = await getAllDocs();
  const trendingDocs = allDocs.slice(0, 3);

  return (
    <section className="flex gap-5 flex-col">
      <div className="text-2xl font-bold">Trending</div>
      <ResourceCard info={trendingDocs} />
    </section>
  );
}
