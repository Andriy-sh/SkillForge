"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Friend } from "@/types/friends";
import { useUserStore } from "@/lib/store/userStore";

export default function ChatSidebar({ friends }: { friends: Friend[] }) {
  const [stateFriends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = useUserStore((state) => state.user?.id || "");
  useEffect(() => {
    setFriends(friends);
  }, [friends]);

  const filteredFriends = stateFriends.filter((friendship) => {
    const isUserSender = friendship.userId === userId;
    const friendData = isUserSender ? friendship.friend : friendship.user;
    return friendData.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <aside className="w-full max-w-xs h-full bg-white border-r shadow-md flex flex-col">
      <div className="p-4 border-b text-lg font-semibold bg-gray-100">
        Messages
      </div>

      <div className="p-2">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredFriends.length === 0 ? (
          <p className="p-4 text-gray-500">No friends found.</p>
        ) : (
          <ul className="divide-y">
            {filteredFriends.map((friendship) => {
              const isUserSender = friendship.userId === userId;
              const friendData = isUserSender
                ? friendship.friend
                : friendship.user;

              return (
                <li key={friendship.id}>
                  <Link
                    href={`/chat/${friendData.id}`}
                    className="flex items-center gap-3 p-4 hover:bg-gray-100 transition"
                  >
                    {friendData.image ? (
                      <Image
                        width={50}
                        height={50}
                        src={friendData.image}
                        alt={friendData.name || "Friend"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                        {friendData.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {friendData.name || "Unnamed"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
