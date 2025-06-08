"use client";
import { Friend } from "@/types/friends";
import React, { useEffect, useState } from "react";
import DeleteFriend from "./DeleteFriend";
import Link from "next/link";
import Image from "next/image";

export default function FriendsList({
  friends,
  userId,
}: {
  friends: Friend[];
  userId: string;
}) {
  const [stateFriends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFriends(friends);
  }, [friends]);

  const handleDelete = (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  const filteredFriends = stateFriends.filter((friend) =>
    friend.user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (stateFriends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow">
        <div className="text-5xl mb-4">👥</div>
        <div className="text-gray-700 font-semibold text-lg mb-2">
          You don&apos;t have any friends
        </div>
        <div className="flex flex-col items-center gap-3">
          <Link
            href={`/friends/search`}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition font-semibold"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M20 20l-3-3"
              />
            </svg>
            Search Friends
          </Link>
          <div className="text-gray-500 text-sm">
            Or explore{" "}
            <Link href="/explore" className="underline hover:text-blue-600">
              other users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Your Friends</h2>
          <Link
            href={`/friends/search`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition font-semibold"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M20 20l-3-3"
              />
            </svg>
            Search new Friends
          </Link>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search friends by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M20 20l-3-3"
            />
          </svg>
        </div>
      </div>
      {filteredFriends.map((friendship) => {
        const isUserSender = friendship.userId === userId;
        const friendData = isUserSender ? friendship.friend : friendship.user;

        return (
          <div
            key={friendship.id}
            className="flex items-center gap-3 p-4 bg-white justify-between rounded-lg shadow hover:bg-gray-50 transition"
          >
            <Link
              href={`/profile/${friendData.id}`}
              className="flex items-center gap-3 flex-1"
            >
              {friendData.image ? (
                <Image alt="avatar" width={52} height={52} src={friendData.image} className="rounded-full" />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg">
                  {friendData.name?.[0]}
                </div>
              )}

              <div className="flex flex-col justify-center">
                <span className="text-gray-800 font-medium">
                  {friendData.name}
                </span>
                <span className="text-gray-500 text-sm">@{friendData.id}</span>
              </div>
            </Link>
            <div>
              <DeleteFriend id={friendship.id} onDelete={handleDelete} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
