import { getAllConcepts } from "@/lib/actions/concepts/getConcept";
import Link from "next/link";
import React from "react";
interface Concept {
  doc: {
    slug: string;
    title: string;
  };
  id: string;
  docId: string;
  title: string;
  slug: string;
  order: number;
}
export default async function SectionDocsConcepts() {
  const concepts: Concept[] = await getAllConcepts();
  const sortedConcepts = concepts.sort((a, b) => a.order - b.order);

  const doc = sortedConcepts[0].doc.title;
  return (
    <div>
      <h2 className="text-3xl font-bold">{doc} Concepts</h2>
      <div className="grid grid-cols-4 mt-4">
        {sortedConcepts.map((concept) => (
          <Link
            href={`${concept.doc.slug}/${concept.slug}`}
            key={concept.id}
            className="text-global text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden"
            title={concept.title}
          >
            {concept.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
