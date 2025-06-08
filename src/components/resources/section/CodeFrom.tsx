"use client";
import { ContentBlockType } from "@prisma/client";
import React, { useState } from "react";

type Props = {
  topicId: string;
  onCreate: (data: {
    topicId: string;
    type: ContentBlockType;
    content: string;
    title: string;
  }) => void;
};

const CodeBlockForm: React.FC<Props> = ({ topicId, onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<ContentBlockType>("EXAMPLE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onCreate({
      topicId,
      type,
      content,
      title: title.trim(),
    });

    setTitle("");
    setContent("");
    setType("EXAMPLE");
  };

  const typeLabels: Record<ContentBlockType, string> = {
    TEXT: "Text",
    BULLETS: "Bulleted list",
    CODE: "Code",
    NOTE: "Note",
    EXAMPLE: "Example",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white border rounded-xl p-4 shadow-md"
    >
      <div>
        <label className="font-semibold block mb-1">Block type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ContentBlockType)}
          className="w-full border p-2 rounded"
        >
          {Object.entries(typeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold block mb-1">Title (optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="E.g. Using let/const"
        />
      </div>

      <div>
        <label className="font-semibold block mb-1">
          {type === "BULLETS"
            ? "Bullets (one per line)"
            : type === "CODE" || type === "EXAMPLE"
            ? "Code"
            : "Content"}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border p-2 rounded font-mono"
          placeholder={
            type === "BULLETS"
              ? "First item\nSecond item"
              : type === "CODE" || type === "EXAMPLE"
              ? 'const name = "Skillforge";\nconsole.log(name);'
              : "Enter text..."
          }
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add block
      </button>

      {content && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Preview:</h3>
          {type === "CODE" || type === "EXAMPLE" ? (
            <pre className="bg-gray-900 text-white p-4 rounded-xl overflow-auto text-sm whitespace-pre">
              <code>{content}</code>
            </pre>
          ) : type === "BULLETS" ? (
            <ul className="list-disc list-inside">
              {content.split("\n").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>{content}</p>
          )}
        </div>
      )}
    </form>
  );
};

export default CodeBlockForm;
