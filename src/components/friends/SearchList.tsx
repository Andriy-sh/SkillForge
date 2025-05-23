"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { createFriendship } from "@/lib/actions/friendship/createFriendship";
import { User } from "@/schemas/User/User";
import { Status } from "@prisma/client";
import { createNotification } from "@/lib/actions/notification/createNotification";
import Link from "next/link";
import { updateFriendshipById } from "@/lib/actions/friendship/updateFriendship";

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
      const user = users.find((u) => u.id === friendId);
      const friendship = user?.friendsWith?.find(
        (f) =>
          (f.userId === currentUserId && f.friendId === friendId) ||
          (f.userId === friendId && f.friendId === currentUserId)
      );

      if (
        friendship?.status === "ACCEPTED" ||
        friendship?.status === "BLOCKED"
      ) {
        setLoadingId(null);
        return;
      }

      const isBlocked = user?.friendsWith?.some(
        (f) =>
          ((f.userId === currentUserId && f.friendId === friendId) ||
            (f.userId === friendId && f.friendId === currentUserId)) &&
          f.status === "BLOCKED"
      );

      if (isBlocked) {
        setLoadingId(null);
        return;
      }

      if (friendship && friendship.status === "REJECTED") {
        await updateFriendshipById(friendship.id, "PENDING");
      } else {
        await createFriendship(currentUserId, friendId);
      }

      await createNotification({
        receiverId: friendId,
        type: "FRIEND_REQUEST",
        message: "sent a friend request",
        senderId: currentUserId,
      });
      setSentRequests((prev) => ({ ...prev, [friendId]: "PENDING" }));
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
      if (friendship.status === "ACCEPTED") return "Friend";
      if (friendship.status === "PENDING") return "Pending Confirmation";
      if (friendship.status === "REJECTED") return "You were rejected";
      if (friendship.status === "BLOCKED") return "Blocked";
    }
    if (sentRequests[user.id] === "PENDING") return "Pending Confirmation";
    return null;
  };

  const isButtonDisabled = (user: User) => {
    const friendship = user.friendsWith?.find(
      (f) =>
        (f.userId === currentUserId && f.friendId === user.id) ||
        (f.userId === user.id && f.friendId === currentUserId)
    );

    const isBlocked = friendship?.status === "BLOCKED";

    return (
      isBlocked ||
      friendship?.status === "PENDING" ||
      friendship?.status === "ACCEPTED" ||
      sentRequests[user.id] === "PENDING" ||
      loadingId === user.id
    );
  };

  const getButtonText = (user: User) => {
    if (loadingId === user.id) return "Sending...";
    const friendship = user.friendsWith?.find(
      (f) =>
        (f.userId === currentUserId && f.friendId === user.id) ||
        (f.userId === user.id && f.friendId === currentUserId)
    );
    if (friendship?.status === "ACCEPTED") return "Already Friends";
    if (friendship?.status === "BLOCKED") return "Blocked";
    if (friendship?.status === "PENDING" || sentRequests[user.id] === "PENDING")
      return "Request Sent";
    return "Add Friend";
  };

  const filteredUsers = users.filter((user) =>
    user.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Search by ID:
      </label>
      <input
        type="text"
        placeholder="Enter user ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {search.trim() === "" ? (
        <div className="text-center text-gray-500">Enter user ID to search</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500">No users found</div>
      ) : (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
          >
            <div>
              <Link
                href={`/profile/${user.id}`}
                className="text-lg font-bold hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {user.name ?? "No name"}
              </Link>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-xs text-gray-400">ID: {user.id}</p>
            </div>
            <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
              <Button
                className="w-40 mb-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendFriendRequest(user.id);
                }}
                disabled={isButtonDisabled(user)}
              >
                {getButtonText(user)}
              </Button>

              <div className="mt-1 text-sm text-gray-500">
                {getFriendshipStatus(user)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
