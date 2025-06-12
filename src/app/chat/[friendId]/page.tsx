import ChatBox from "@/components/chat/section/SectionChatBox";
import React from "react";
import { auth } from "../../../../auth";

type Props = {
  friendId: string;
};

export default async function page({ params }: { params: Props }) {
  const { friendId } = params;
  const session = await auth();
  console.log("session:", session);
  const userId = session?.user?.id;
  return <ChatBox friendId={friendId} userId={userId} />;
}
