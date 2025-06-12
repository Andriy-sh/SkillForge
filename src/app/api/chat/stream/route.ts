// app/api/chat/stream/route.ts
import { NextRequest } from "next/server";
import redis from "@/lib/redis";
import Redis from "ioredis";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId")!;
  const friendId = searchParams.get("friendId")!;
  const channel = `chat:${[userId, friendId].sort().join(":")}`;

  let subscriber: Redis;

  const stream = new ReadableStream({
    async start(controller) {
      subscriber = redis.duplicate();

      await subscriber.subscribe(channel);

      subscriber.on("message", (chan, message) => {
        if (chan === channel) {
          controller.enqueue(`data: ${message}\n\n`);
        }
      });
    },

    async cancel() {
      if (subscriber) {
        await subscriber.unsubscribe(channel);
        await subscriber.disconnect();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
