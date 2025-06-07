import ConceptsListSidebarClient from "./ConceptsListSidebarClient";
import { getNavConcepts } from "@/lib/actions/concepts/getConcept";

export default async function ConceptsListSidebar() {
  const concepts = await getNavConcepts();
  return <ConceptsListSidebarClient concepts={concepts} />;
}
