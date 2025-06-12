import React from "react";
import ChatSidebarClient from "./ChatSidebarClient";
import { getFriends } from "@/lib/actions/friendship/getFriends";
import { auth } from "../../../../auth";

export default async function ChatSidebarServer() {
  const session = await auth();

  const userId = session?.user?.id;

  const friends = await getFriends(userId);

  return <ChatSidebarClient friends={friends} />;
}
