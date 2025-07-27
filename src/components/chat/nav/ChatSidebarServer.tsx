import React, { Suspense } from "react";
import ChatSidebarClient from "./ChatSidebarClient";
import { getFriends } from "@/lib/actions/friendship/getFriends";
import { auth } from "../../../../auth";
import ChatSidebarSkeleton from "../skeleton/ChatSidebarSkeleton";

export default async function ChatSidebarServer() {
  const session = await auth();

  const userId = session?.user?.id;

  const friends = await getFriends(userId);

  return (
    <Suspense fallback={<ChatSidebarSkeleton />}>
      <ChatSidebarClient friends={friends} />
    </Suspense>
  );
}
