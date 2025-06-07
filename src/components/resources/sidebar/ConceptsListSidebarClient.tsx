"use client";
import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

interface ConceptsInterface {
  id: string;
  title: string;
  slug: string;
  order: number;
}

export default function ConceptsListSidebarClient({
  concepts,
}: {
  concepts: ConceptsInterface[];
}) {
  // Sort concepts by order
  const sortedConcepts = [...concepts].sort((a, b) => a.order - b.order);

  return (
    <Accordion type="multiple" defaultValue={["concepts"]} className="w-full">
      <AccordionItem value="concepts">
        <AccordionTrigger className="flex justify-start items-center">
          <span className="font-bold text-xl">Concepts</span>
          <ChevronDown className="ml-2 h-6 w-6" />
        </AccordionTrigger>
        <AccordionContent>
          <ul className="w-[100px]">
            {sortedConcepts.map((concept) => (
              <li key={concept.id}>
                <Link
                  href={`${concept.slug}`}
                  className="hover:text-primary text-ellipsis whitespace-nowrap overflow-hidden "
                  title={concept.title}
                >
                  {concept.title}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
