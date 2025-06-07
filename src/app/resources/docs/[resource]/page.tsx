import DocsSection from "@/components/resources/section/DocsSection";
import ResourcesListSidebar from "@/components/resources/sidebar/ResourcesListSidebarServer";
import React from "react";
type Props = {
  resource: string;
};

export default function page({ params }: { params: Props }) {
  const { resource } = params;
  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-2 min-h-screen  max-w-[1300px] mx-auto py-10">
      <ResourcesListSidebar />
      <DocsSection slug={resource} />
      
    </div>
  );
}
