import React from "react";
import ResourcesPopularTopic from "./ResourcesPopularTopic";

export default function SectionResourcesInfo() {
  return (
    <section className="grid grid-cols-[4fr_2fr] ">
      <div className=" flex  flex-col justify-between">
        <h1 className="text-5xl font-bold ">Resources</h1>
        <p className="text-md font-medium mr-10">
          Resources are concise references and mini-documentations for a wide
          range of technologies, programming languages, and libraries. Here
          you’ll find quick overviews, syntax summaries, and essential concepts
          to help you refresh your knowledge or get up to speed with something
          new. Think of it as your handy developer cheat sheet for everyday
          coding.
        </p>
      </div>
      <ResourcesPopularTopic />
    </section>
  );
}
