import React from "react";
import Breadcrumbs from "../ui/CurrentPathIndicator";
import { getConcept } from "@/lib/actions/concepts/getConcept";

interface ConceptInterface {
  id: string;
  docId: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function ConceptsSection({
  resource,
  concept,
}: {
  resource: string;
  concept: string;
}) {
  const info: ConceptInterface | null = await getConcept({
    concept: concept,
    resource: resource,
  });
  if (!info) throw new Error("Concept not found");
  return (
    <section className="flex flex-col gap-5">
      <div className="space-y-5">
        <Breadcrumbs />
        <h1 className="text-5xl font-bold">{info.title}</h1>
        <span className="text-sm">
          Published {new Date(info.createdAt).toLocaleDateString()} •{" "}
          <b>Updated {new Date(info.updatedAt).toLocaleDateString()}</b>
        </span>
        <div className="mt-5">{info.description}</div>
      </div>
    </section>
  );
}
