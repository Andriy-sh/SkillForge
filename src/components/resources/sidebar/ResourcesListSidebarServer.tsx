import ResourcesListSidebarClient from "./ResourcesListSidebarClient";
import { getAllDocs } from "@/lib/actions/resourcesDoc/getDoc";

export default async function ResourcesListSidebar() {
  const docs = await getAllDocs();
  return <ResourcesListSidebarClient resources={docs} />;
}
