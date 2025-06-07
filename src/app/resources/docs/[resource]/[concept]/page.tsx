import ConceptsSection from "@/components/resources/section/ConceptsSection";
import ConceptsListSidebar from "@/components/resources/sidebar/ConceptsListSidebarServer";
import React from "react";

type Props = {
  resource: string;
  concept: string;
};

export default function page({ params }: { params: Props }) {
  const { resource, concept } = params;
  return (
    <div className="grid grid-cols-[1fr_3fr]  min-h-screen  max-w-[1300px] mx-auto py-10">
      <ConceptsListSidebar />
      <ConceptsSection concept={concept} resource={resource} />
    </div>
  );
}
