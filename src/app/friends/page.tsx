import React from "react";
import { auth } from "../../../auth";
import { getFriends } from "@/lib/actions/friendship/getFriends";
import FriendsList from "@/components/friends/FriendsList";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    return <div>You are not logged in</div>;
  }

  const userId = session.user?.id;

  const friends = await getFriends(userId);
  return (
    <div className="flex flex-col max-w-[1000px] mx-auto">
      <FriendsList friends={friends} userId={userId} />
    </div>
  );
}
