import { User } from "@/schemas/User/User";
import Image from "next/image";
import React from "react";
import { formatDistanceToNow, format } from "date-fns";

export default function Profile({ user }: { user: User }) {
  return (
    <div className="rounded-md  text-center">
      <div className="flex justify-center mb-4">
        {user.image ? (
          <Image
            src={user.image}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
            width={96}
            height={96}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.name ? user.name[0].toUpperCase() : "?"}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-1">
        @{user.name || "Unknown"}
      </h2>
      <p className="text-gray-700 mb-4">{user.name || "No Name Provided"}</p>

      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
        Edit Profile
      </button>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Last active
          {user.updatedAt
            ? formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true })
            : "Unknown"}
        </p>
        <p>
          Joined
          {user.createdAt
            ? format(new Date(user.createdAt), "MMMM d, yyyy")
            : "Unknown"}
        </p>
      </div>
    </div>
  );
}
