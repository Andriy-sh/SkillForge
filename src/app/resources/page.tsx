import ResourcesSection from "@/components/resources/section/ResourcesSection";
import ResourcesListSidebar from "@/components/resources/sidebar/ResourcesListSidebarServer";

export default function Page() {
  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-2 min-h-screen  max-w-[1300px] mx-auto py-10">
      <ResourcesListSidebar />
      <ResourcesSection />
    </div>
  );
}
