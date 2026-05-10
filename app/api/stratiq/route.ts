import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RequestBody = {
  situation?: string;
};

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Send a valid situation to analyse." }, { status: 400 });
  }

  const situation = body.situation?.trim();

  if (!situation || situation.length < 20) {
    return NextResponse.json(
      { error: "Add more context so STRATIQ can reason properly." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-5";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "STRATIQ is not connected to the reasoning engine yet. Add OPENAI_API_KEY in Vercel Environment Variables."
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are STRATIQ, a calm senior strategic reasoning adviser for professionals under pressure. Improve judgement, not morale. Use British English. Be analytical, direct, practical, emotionally controlled, and concise. Do not provide therapy, diagnosis, motivational language, generic chatbot phrasing, corporate filler, or exaggerated certainty. Return exactly these sections: Situation summary, Strategic interpretation, Options, Risk assessment, Recommended move, Suggested wording, Next step."
          },
          {
            role: "user",
            content: situation
          }
        ],
        temperature: 0.35
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "STRATIQ could not complete the analysis. Try again shortly." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return NextResponse.json(
        { error: "STRATIQ returned no analysis. Try again with more context." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: "STRATIQ is temporarily unavailable. Try again in a moment." },
      { status: 500 }
    );
  }
}
