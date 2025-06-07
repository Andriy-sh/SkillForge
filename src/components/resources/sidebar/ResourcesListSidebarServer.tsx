import { getResourcesNames } from "@/lib/actions/resources/getResources";
import ResourcesListSidebarClient from "./ResourcesListSidebarClient";

export default async function ResourcesListSidebar() {
  const resources = await getResourcesNames();
  return <ResourcesListSidebarClient resources={resources} />;
}
