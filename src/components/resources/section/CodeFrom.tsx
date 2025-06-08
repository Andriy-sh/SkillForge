"use client";
import { ContentBlockType } from "@prisma/client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  topicId: string;
  onCreate: (data: {
    topicId: string;
    type: ContentBlockType;
    content: string;
    title?: string;
    description?: string;
  }) => void;
};

const CodeBlockFormModal: React.FC<Props> = ({ topicId, onCreate }) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<ContentBlockType>("EXAMPLE");

  const typeLabels: Record<ContentBlockType, string> = {
    TEXT: "Text",
    BULLETS: "Bulleted list",
    CODE: "Code",
    NOTE: "Note",
    EXAMPLE: "Example",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onCreate({
      topicId,
      type,
      content:
        type === "BULLETS"
          ? JSON.stringify(
              content
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            )
          : content,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
    });

    setTitle("");
    setDescription("");
    setContent("");
    setType("EXAMPLE");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Додати блок"
            >
              <Plus className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">Add block</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a Content Block</DialogTitle>
          <DialogDescription>
            Fill out the form to add a content block to the topic.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Block Type</Label>
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
            <Label>Title (optional)</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Using let/const"
            />
          </div>

          <div>
            <Label>Description (optional)</Label>
            <Textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief explanation or context..."
            />
          </div>

          <div>
            <Label>
              {type === "BULLETS"
                ? "Bullets (one per line)"
                : type === "CODE" || type === "EXAMPLE"
                ? "Code"
                : "Content"}
            </Label>
            <Textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-mono"
              placeholder={
                type === "BULLETS"
                  ? "First item\nSecond item"
                  : type === "CODE" || type === "EXAMPLE"
                  ? 'const name = "Skillforge";\nconsole.log(name);'
                  : "Enter text..."
              }
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Block</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CodeBlockFormModal;
