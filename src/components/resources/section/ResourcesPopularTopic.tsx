import { slugify } from "@/lib/utils/strings";
import Link from "next/link";
import React from "react";

export default function ResourcesPopularTopic() {
  const pupulartopics = [
    { name: "HTML & CSS" },
    { name: "Python" },
    { name: "JavaScript" },
    { name: "SQL" },
    { name: "C++" },
  ];
  return (
    <div className="p-5 border-2 border-black shadow-[10px_10px_0px]  hover:shadow-[15px_15px_0px] transition-all duration-300 ease-in-out">
      <h1 className="text-lg font-bold">Popular topics</h1>
      <ul className="list-disc list-inside">
        {pupulartopics.map((topic) => (
          <li key={topic.name}>
            <Link
              className="underline hover:text-global hover:font-semibold hover:no-underline transition-all duration-300"
              href={`/resources/docs/${slugify(topic.name)}`}
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
