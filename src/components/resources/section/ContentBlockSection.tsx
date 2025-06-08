import React from "react";
import { SectionContentBlock } from "./SectionContentBlock";
import { getContentBlocks } from "@/lib/actions/contentBlock/getContentBlock";

export default async function ContentBlockSection({
  topicId,
}: {
  topicId: string;
}) {
  const contentBlocks = await getContentBlocks(topicId);
  return <SectionContentBlock blocks={contentBlocks} />;
}
