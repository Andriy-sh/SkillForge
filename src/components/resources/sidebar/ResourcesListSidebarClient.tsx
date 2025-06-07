"use client";
import React from "react";
import Link from "next/link";
import { ResourceType } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

type DocsInterface = {
  id: string;
  title: string;
  description: string;
  slug: string;
  resourceId: string;
  createdAt: Date;
  updatedAt: Date;
  resource?: { name: string; type: ResourceType };
};

type GroupedResources = {
  [key: string]: DocsInterface[];
};

export default function ResourcesListSidebarClient({
  resources,
}: {
  resources: DocsInterface[];
}) {
  const grouped: GroupedResources = resources.reduce((acc, resource) => {
    if (!resource.resource?.type) return acc;
    const type = resource.resource.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(resource);
    return acc;
  }, {} as GroupedResources);

  return (
    <Accordion
      type="multiple"
      defaultValue={Object.keys(grouped)}
      className="w-full"
    >
      {Object.entries(grouped).map(([type, items]) => (
        <AccordionItem key={type} value={type}>
          <AccordionTrigger className="flex justify-start items-center">
            <span className="font-bold text-xl">
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </span>
            <ChevronDown className="ml-2 h-6 w-6" />
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {items.map((res) => (
                <li key={res.id}>
                  <Link
                    href={`/resources/docs/${res.slug}`}
                    className="hover:text-primary"
                  >
                    {res.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
