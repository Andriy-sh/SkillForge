import React from "react";
import SectionDocsInfo from "./SectionDocsInfo";
import SectionDocsConcepts from "./SectionDocsConcepts";

export default function DocsSection({ slug }: { slug: string }) {
  return (
    <div className="space-y-10">
      <SectionDocsInfo slug={slug} />
      <SectionDocsConcepts />
    </div>
  );
}
