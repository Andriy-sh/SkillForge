import { User } from "@/schemas/User/User";
import Image from "next/image";
import React from "react";
import { formatDistanceToNow, format } from "date-fns";
import { Session } from "next-auth";
import Link from "next/link";
import { getFriends } from "@/lib/actions/friendship/getFriends";
import { Handshake } from "lucide-react";

export default async function Profile({
  user,
  session,
}: {
  user: User;
  session: Session;
}) {
  const isCurrentUser = user.email === session.user?.email;
  const friends = await getFriends(user.id);
  return (
    <div className="rounded-md  text-start wrap-anywhere">
      <div className="flex justify-start mb-4">
        {user.image ? (
          <Image
            src={user.image}
            alt="User Avatar"
            className="w-36 h-36 rounded-full"
            width={144}
            height={144}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.name ? user.name[0].toUpperCase() : "?"}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-1">
        @{user.id || "Unknown"}
      </h2>
      <p className="text-gray-700 mb-4">{user.name || "No Name Provided"}</p>
      {isCurrentUser && (
        <Link
          href={`/settings/profile`}
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
        >
          Edit Profile
        </Link>
      )}

      <div className="text-start">
        <div className="mt-4 text-sm ">
          <p>
            <span className="font-bold flex ">
              <Handshake /> {friends.length} · friends
            </span>
          </p>
        </div>
        <div className="mt-4 text-sm  ">
          <p>
            <span className="font-bold">Bio:</span>{" "}
            {user.bio || "No bio provided"}
          </p>
        </div>
        <div className="mt-4 text-sm ">
          <p>
            <span className="font-bold">City:</span>{" "}
            {user.city || "No city provided"}
          </p>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Last active{" "}
            {user.updatedAt
              ? formatDistanceToNow(new Date(user.updatedAt), {
                  addSuffix: true,
                })
              : "Unknown"}
          </p>
          <p>
            Joined{" "}
            {user.createdAt
              ? format(new Date(user.createdAt), "MMMM d, yyyy")
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
