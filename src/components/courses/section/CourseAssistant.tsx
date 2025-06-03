"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/lib/store/chatStore";
import { Sparkles, SendHorizontal } from "lucide-react";

const questions = [
  "What should I learn in 2025 to grow in tech?",
  "How can I validate my programming skills?",
  "What projects can improve my portfolio?",
];

export default function CatalogAssistant() {
  const { openChat } = useChatStore();

  const handleAsk = (question: string) => {
    openChat(question);
  };
  return (
    <div className="bg-dot-pattern py-12 px-4">
      <div className="bg-[#10162f] text-white px-6 py-16 text-center space-y-6 shadow-md rounded-2xl max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold">Explore the catalog</h2>
        <p className="text-lg">
          Start a conversation and find learning to match your goals.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {questions.map((question, index) => (
            <Button
              key={index}
              onClick={() => handleAsk(question)}
              variant="secondary"
              className="text-white bg-[#10162f] hover:bg-[#334155] border-1 border-white"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#3388ff]" />
              {question}
            </Button>
          ))}
        </div>

        <div className="flex max-w-xl relative mx-auto mt-4">
          <Input
            placeholder="Ask your question for our AI Learning Assistant"
            className=" border-1 "
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                if (target.value.trim()) {
                  handleAsk(target.value.trim());
                  target.value = "";
                }
              }
            }}
          />
          <Button
            className=" px-4 absolute -right-1  border-1"
            onClick={() => {
              const input = document.querySelector<HTMLInputElement>(
                'input[placeholder*="Ask your question"]'
              );
              if (input && input.value.trim()) {
                handleAsk(input.value.trim());
                input.value = "";
              }
            }}
          >
            <SendHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
