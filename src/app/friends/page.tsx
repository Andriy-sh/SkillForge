import React from "react";
import { auth } from "../../../auth";
import { getUserByEmail } from "@/lib/actions/user/getUser";
import { getFriends } from "@/lib/actions/friendship/getFriends";
import FriendsList from "@/components/friends/FriendsList";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    return <div>You are not logged in</div>;
  }
  const email = session.user.email;
  if (!email) {
    return <div>You are not logged in</div>;
  }
  const user = await getUserByEmail(session?.user?.email as string);
  if (!user) {
    return <div>User not found</div>;
  }
  const friends = await getFriends(user.id);
  console.log(friends);
  return (
    <div className="flex flex-col max-w-[1000px] mx-auto">
      <FriendsList friends={friends} userId={user.id} />
    </div>
  );
}
