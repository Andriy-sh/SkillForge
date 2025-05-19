"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { createFriendship } from "@/lib/actions/friendship/createFriendship";
import { User } from "@/schemas/User/User";
import { Status } from "@prisma/client";
import { createNotification } from "@/lib/actions/notification/createNotification";
import Link from "next/link";
export default function FriendList({
  users,
  currentUserId,
}: {
  users: User[];
  currentUserId: string;
}) {
  const [sentRequests, setSentRequests] = useState<{
    [key: string]: Status;
  }>({});
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSendFriendRequest = async (friendId: string) => {
    setLoadingId(friendId);
    try {
      await createFriendship(currentUserId, friendId);
      await createNotification({
        receiverId: friendId,
        type: "friendRequest",
        message: "You have a new friend request.",
        senderId: currentUserId,
      });
      setSentRequests((prev) => ({ ...prev, [friendId]: "pending" }));
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const getFriendshipStatus = (user: User) => {
    if (loadingId === user.id) return "Sending...";
    const friendship = user.friendsWith?.find(
      (f) =>
        (f.userId === currentUserId && f.friendId === user.id) ||
        (f.userId === user.id && f.friendId === currentUserId)
    );
    if (friendship) {
      if (friendship.status === "accepted") return "Friend";
      if (friendship.status === "pending") return "Pending Confirmation";
    }
    if (sentRequests[user.id] === "pending") return "Pending Confirmation";
    return null;
  };

  const isRequestSent = (user: User) => {
    const friendship = user.friendsWith?.find(
      (f) =>
        (f.userId === currentUserId && f.friendId === user.id) ||
        (f.userId === user.id && f.friendId === currentUserId)
    );
    return (
      friendship?.status === "pending" ||
      sentRequests[user.id] === "pending" ||
      loadingId === user.id
    );
  };

  const filteredUsers = users.filter((user) =>
    user.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Пошук по ID
      </label>
      <input
        type="text"
        placeholder="Введіть ID користувача..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {search.trim() === "" ? (
        <div className="text-center text-gray-500">
          Введіть ID для пошуку користувача
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500">
          Користувачів не знайдено
        </div>
      ) : (
        filteredUsers.map((user) => (
          <Link
            href={`/profile/${user.id}`}
            key={user.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {user.name ?? "No name"}
              </h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-xs text-gray-400">ID: {user.id}</p>
            </div>
            <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
              <Button
                className="w-40 mb-1"
                onClick={() => handleSendFriendRequest(user.id)}
                disabled={isRequestSent(user)}
              >
                {loadingId === user.id
                  ? "Sending..."
                  : isRequestSent(user)
                  ? "Request Sent"
                  : "Add Friend"}
              </Button>
              <div className="mt-1 text-sm text-gray-500">
                {getFriendshipStatus(user)}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
