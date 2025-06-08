"use client";
import { ContentBlockType } from "@prisma/client";
import React, { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

type ContentBlock = {
  id: string;
  title: string;
  topicId: string;
  type: ContentBlockType;
  content: string;
  order: number;
};

type Props = {
  blocks: ContentBlock[];
};

export const SectionContentBlock: React.FC<Props> = ({ blocks }) => {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);
  const [copiedIds, setCopiedIds] = useState<Set<string>>(new Set());

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-6">
      {sorted.map((block) => {
        switch (block.type) {
          case "TEXT":
            return (
              <div key={block.id} className="flex flex-col">
                {block.title && (
                  <h2 className="font-bold mb-2">{block.title}</h2>
                )}
                <p className="text-base leading-relaxed">{block.content}</p>
              </div>
            );

          case "BULLETS": {
            const bullets = JSON.parse(block.content) as string[];
            return (
              <div key={block.id} className="flex flex-col">
                {block.title && (
                  <h2 className="font-bold mb-2">{block.title}</h2>
                )}
                <ul className="list-disc list-inside space-y-1">
                  {bullets.map((item, idx) => (
                    <li key={`${block.id}-${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          }

          case "CODE":
            return (
              <div key={block.id} className="flex flex-col relative">
                {block.title && (
                  <h2 className="font-bold mb-2">{block.title}</h2>
                )}
                <button
                  onClick={() => handleCopy(block.content, block.id)}
                  className="absolute top-2 right-2 bg-gray-700 text-white p-1 rounded hover:bg-gray-600 transition"
                  title="Copy code"
                >
                  {copiedIds.has(block.id) ? (
                    <CopyCheck size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <pre className="bg-gray-800 text-white p-4 rounded-xl overflow-auto text-sm mt-6">
                  <code>
                    {block.content.split("\n").map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </code>
                </pre>
              </div>
            );

          case "NOTE":
            return (
              <div key={block.id} className="flex flex-col">
                {block.title && (
                  <h2 className="font-bold mb-2">{block.title}</h2>
                )}
                <div className="border-l-4 border-yellow-400 bg-yellow-100 text-yellow-900 p-4 rounded">
                  <strong>Note: </strong>
                  {block.content}
                </div>
              </div>
            );

          case "EXAMPLE":
            return (
              <div key={block.id} className="flex flex-col relative">
                {block.title && (
                  <h2 className="font-bold mb-2">{block.title}</h2>
                )}

                <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-900 p-4 rounded mt-6">
                  <strong>Example: </strong>

                  <div> {block.content}</div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
