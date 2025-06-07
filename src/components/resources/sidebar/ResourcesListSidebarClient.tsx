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

type Props = {
  name: string;
  type: ResourceType;
};

type GroupedResources = {
  [key in ResourceType]: Props[];
};

export default function ResourcesListSidebarClient({
  resources,
}: {
  resources: Props[];
}) {
  const grouped: GroupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) acc[resource.type] = [];
    acc[resource.type].push(resource);
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
            <ChevronDown className="ml-2 h-6 w-6  " />
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {items.map((res) => (
                <li key={res.name}>
                  <Link
                    href={`/resources/docs/${res.name.toLocaleLowerCase()}`}
                  >
                    {res.name}
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
