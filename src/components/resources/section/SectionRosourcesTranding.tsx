import React from "react";
import ResourceCard from "../card/ResourceCard";
export const info = [
  {
    title: "Getting Started with Visual Studio Code and Building HTML Websites",
    type: "Type",
    description:
      "Visual Studio Code is one of the most popular and powerful text editors used by software engineers today.",
  },
  {
    title: "Getting Started with Visual Studio Code and Building HTML Websites",
    type: "Type",
    description:
      "Visual Studio Code is one of the most popular and powerful text editors used by software engineers today.",
  },
  {
    title: "Getting Started with Visual Studio Code and Building HTML Websites",
    type: "Type",
    description:
      "Visual Studio Code is one of the most popular and powerful text editorsssssssssssssssssssssssssssssssssssssssssss used by software engineers today.",
  },
];
export default function SectionResourcesTranding() {
  return (
    <section className="flex gap-5 flex-col">
      <div className="text-2xl font-bold">Trending</div>
      <ResourceCard info={info} />
    </section>
  );
}
