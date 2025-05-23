import React from "react";
import FriendList from "@/components/friends/SearchList";
import { prisma } from "../../../../prisma";
import { auth } from "../../../../auth";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    return <div>You are not logged in</div>;
  }
  const email = session.user.email;
  if (!email) {
    return <div>You are not logged in</div>;
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      friendships: true,
      friendsWith: true,
    },
  });
  if (!user) {
    return <div>User not found</div>;
  }
  const usersRaw = await prisma.user.findMany({
    include: {
      friendships: true,
      friendsWith: true,
    },
  });

  const allowedStatuses = ["PENDING", "ACCEPTED", "REJECTED"] as const;
  const users = usersRaw
    .filter((u) => u.id !== user.id)
    .map((u) => ({
      ...u,
      friendships: u.friendships
        .filter((f) =>
          allowedStatuses.includes(f.status as (typeof allowedStatuses)[number])
        )
        .map((f) => ({
          ...f,
          status: f.status as (typeof allowedStatuses)[number],
        })),
      friendsWith: u.friendsWith
        .filter((f) =>
          allowedStatuses.includes(f.status as (typeof allowedStatuses)[number])
        )
        .map((f) => ({
          ...f,
          status: f.status as (typeof allowedStatuses)[number],
        })),
    }));

  return (
    <div>
      <FriendList users={users} currentUserId={user.id} />
    </div>
  );
}
