"use client";
import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal, Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

export default function GeminiChatBot({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const presetQuestions = [
    "What should I learn in 2025 to grow in tech?",
    "How can I validate my programming skills?",
    "What projects can improve my portfolio?",
    "How do I choose the right programming path for me?",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: "user" as const, content: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok || !contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server error: ${text.slice(0, 100)}...`);
      }

      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", content: data.response },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
      ]);
    }

    setIsLoading(false);
  };
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  const handlePresetClick = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4.5 bg-blue-600 text-white ">
        <div className="flex items-center justify-between space-x-2 text-xl font-bold w-full">
          <p className="flex items-center space-x-2">
            <Sparkles />
            <span>AI Learning Assistant</span>
          </p>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {chatHistory.length === 0 ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Start a conversation and find learning to match your goals
            </h2>
            <div className="flex flex-col gap-2">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(q)}
                  className="text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md border border-gray-200"
                >
                  ✨ {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={clsx(
                "flex animate-fade-in",
                chat.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <article
                className={clsx(
                  "max-w-[85%] rounded-2xl px-4 py-2 text-md whitespace-pre-wrap shadow-md transition-all",
                  chat.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 prose prose-sm prose-blue max-w-none"
                )}
              >
                <ReactMarkdown>{chat.content}</ReactMarkdown>
                <div className="text-xs text-right text-gray-400 mt-1"></div>
              </article>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your question"
            className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
