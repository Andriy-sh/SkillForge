import React from "react";
import SectionDocsInfo from "./SectionDocsInfo";

export default function DocsSection({ slug }: { slug: string }) {
  return (
    <div>
      <SectionDocsInfo slug={slug} />
    </div>
  );
}
