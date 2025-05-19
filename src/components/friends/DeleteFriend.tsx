"use client";
import { deleteFriendship } from "@/lib/actions/friendship/deleteFriendship";
import React from "react";

export default function DeleteFriend({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id: string) => void;
}) {
  const handleDeleteFriend = async (id: string) => {
    try {
      onDelete(id);
      await deleteFriendship(id);
    } catch (error) {
      console.log("Error " + error);
    }
  };
  return (
    <button
      onClick={() => handleDeleteFriend(id)}
      className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors duration-200 cursor-pointer"
    >
      DeleteFriend
    </button>
  );
}
