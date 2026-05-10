import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RequestBody = {
  situation?: string;
};

const instructions = [
  "You are STRATIQ, a calm senior strategic reasoning adviser for professionals under pressure.",
  "Your job is to improve judgement, not simply provide information.",
  "Use British English.",
  "Be analytical, direct, practical, emotionally controlled, and concise.",
  "Do not provide therapy, diagnosis, motivational language, generic chatbot phrasing, corporate filler, moralising, or exaggerated certainty.",
  "Where the user asks about employment, contract, disciplinary, HR, legal, or client action, give strategic and communication guidance only. Make clear that formal legal/HR advice may be needed before action.",
  "Reason from the user's facts. Separate what is known, what is assumed, what matters most, and what may be noise.",
  "Identify incentives, constraints, power dynamics, likely consequences, trade-offs, communication risks, escalation risks, and practical next steps.",
  "Return exactly these sections: Situation summary, Strategic interpretation, Options, Risk assessment, Recommended move, Suggested wording, Next step.",
  "Keep each section high-signal and specific. Avoid padding."
].join(" ");

type ResponsesApiResult = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
  }>;
};

function extractText(data: ResponsesApiResult) {
  return (
    data.output_text ||
    data.output
      ?.flatMap((item) => item.content || [])
      .map((item) => item.text)
      .filter(Boolean)
      .join("\n")
      .trim() ||
    ""
  );
}

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
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

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
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        instructions,
        input: situation,
        max_output_tokens: 1400
      })
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("STRATIQ OpenAI request failed", response.status, detail.slice(0, 600));
      return NextResponse.json(
        { error: "STRATIQ could not complete the analysis. Try again shortly." },
        { status: 502 }
      );
    }

    const data = (await response.json()) as ResponsesApiResult;
    const result = extractText(data);

    if (!result) {
      console.error("STRATIQ OpenAI request returned no text");
      return NextResponse.json(
        { error: "STRATIQ returned no analysis. Try again with more context." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("STRATIQ OpenAI request errored", error);
    return NextResponse.json(
      { error: "STRATIQ is temporarily unavailable. Try again in a moment." },
      { status: 500 }
    );
  }
}
