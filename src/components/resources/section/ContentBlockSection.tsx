import React from "react";
import { SectionContentBlock } from "./SectionContentBlock";
import { getContentBlocks } from "@/lib/actions/contentBlock/getContentBlock";

export default async function ContentBlockSection({
  topicId,
}: {
  topicId: string;
}) {
  const contentBlocks = await getContentBlocks(topicId);
  const normalizedBlocks = contentBlocks.map((block) => ({
    ...block,
    title: block.title ?? undefined,
    description: block.description ?? undefined,
  }));

  return <SectionContentBlock blocks={normalizedBlocks} />;
}
