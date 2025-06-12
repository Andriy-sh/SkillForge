// app/api/chat/send/route.ts
import { createMessage } from "@/lib/actions/messages/createMessages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const message = await createMessage(senderId, receiverId, content);

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 400 }
    );
  }
}
