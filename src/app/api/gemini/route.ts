import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt: message,
      system: `
    Ти — корисний асистент, який завжди відповідає тією ж мовою, якою задано запит. 
    
    Використовуй **Markdown** у своїх відповідях (наприклад, для списків, заголовків, виділень тощо).
    
    Якщо користувач питає про "курси", "курси для початківців", "що вивчати", "де вчитись", "навчання" тощо — відповідай **тільки про курси з програмування**, без згадок сторонніх платформ або сервісів.
    
    Виділяй заголовок
    
    Якщо запит не стосується курсів, не згадуй курси у відповіді.

    Не згадуй Coursera, edX, Udemy, Khan Academy тощо.
    `.trim(),
    });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
