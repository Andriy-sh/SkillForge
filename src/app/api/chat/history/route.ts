// app/api/chat/history/route.ts
import { getMessagesBetweenUsers } from "@/lib/actions/messages/getMessages";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId")!;
  const friendId = searchParams.get("friendId")!;

  const messages = await getMessagesBetweenUsers(userId, friendId);
  return Response.json(messages);
}
