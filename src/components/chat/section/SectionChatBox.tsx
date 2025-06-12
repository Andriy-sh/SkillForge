"use client";
import { useEffect, useState, FormEvent, useRef } from "react";

type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
};

export default function ChatBox({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `/api/chat/history?userId=${userId}&friendId=${friendId}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch message history:", error);
      }
    };

    fetchHistory();

    const eventSource = new EventSource(
      `/api/chat/stream?userId=${userId}&friendId=${friendId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const message: Message = JSON.parse(event.data);
        if (message?.senderId) {
          setMessages((prev) => [...prev, message]);
        }
      } catch {
        console.error("Invalid message format:", event.data);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [userId, friendId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    setNewMessage("");
    inputRef.current?.focus();

    try {
      await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId,
          receiverId: friendId,
          content: trimmed,
        }),
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className=" flex flex-col h-[80vh] border rounded shadow-lg bg-white">
      <div className="p-4 border-b font-semibold text-lg bg-gray-100">
        Chat with Friend
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
        {messages.map((msg) => {
          const isUser = msg.senderId === userId;
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center p-4 border-t bg-white"
      >
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
