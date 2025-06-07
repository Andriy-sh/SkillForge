import { getDocsBySlug } from "@/lib/actions/resourcesDoc/getDoc";
import { DocsInterface } from "@/types/docs";
import React from "react";

export default async function SectionDocsInfo({ slug }: { slug: string }) {
  const info: DocsInterface | null = await getDocsBySlug(slug);
  if (!info) throw new Error("Doc not found");
  return (
    <section className="flex flex-col gap-5">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">{info.title}</h1>
        <span className="text-sm">
          Published {new Date(info.createdAt).toLocaleDateString()} •{" "}
          <b>Updated {new Date(info.updatedAt).toLocaleDateString()}</b>
        </span>
        <div className="mt-5">{info.description}</div>
      </div>
    </section>
  );
}
