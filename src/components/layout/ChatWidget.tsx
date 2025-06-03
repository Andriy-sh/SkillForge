"use client";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeminiChatBot from "./GeminiChatBot";
import { useChatStore } from "@/lib/store/chatStore";
import clsx from "clsx";

export default function ChatWidget() {
  const { isOpen, openChat, closeChat } = useChatStore();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeChat]);

  return (
    <div className="fixed bottom-6 right-6 z-50 ">
      <div className="relative w-full h-full">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chatbot"
              ref={widgetRef}
              initial={{
                scale: 0.5,
                opacity: 0,
                transformOrigin: "bottom right",
              }}
              animate={{
                scale: 1,
                opacity: 1,
                transformOrigin: "bottom right",
              }}
              exit={{ scale: 0.5, opacity: 0, transformOrigin: "bottom right" }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className={clsx(
                "absolute  w-[460px] h-[550px] shadow-[6px_6px_0px_rgba(0,0,0,0.9)] bottom-0 right-0  bg-white flex flex-col border-1 border-black overflow-hidden"
              )}
            >
              <GeminiChatBot />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="open-button"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              onClick={() => openChat()}
              className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full shadow-md p-3 hover:shadow-lg transition"
            >
              <span className="absolute -top-1 -left-2 bg-yellow-400 text-xs text-black px-2 py-[1px] rounded-full font-semibold">
                New
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
