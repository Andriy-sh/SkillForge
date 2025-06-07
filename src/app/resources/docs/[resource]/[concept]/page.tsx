import ResourcesListSidebar from "@/components/resources/sidebar/ResourcesListSidebarServer";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-2 min-h-screen  max-w-[1300px] mx-auto py-10">
      <ResourcesListSidebar />
    </div>
  );
}
