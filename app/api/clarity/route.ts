import { NextRequest, NextResponse } from "next/server";

const fallback = `Clearer version:\n\nThe handover needs to be completed consistently at the end of each shift.\n\nFrom today, I need everyone to include key incidents, outstanding actions, and any risk concerns before leaving site.\n\nIf there is a reason that cannot happen, tell me before the end of shift so we can deal with it properly.\n\nWhy this works:\nIt removes unnecessary cushioning, sets the standard clearly, and leaves room for practical issues without weakening the message.`;

function extractOutput(data: { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> }) {
  return data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text).filter(Boolean).join("\n").trim();
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { message?: string; mode?: string } | null;
  const message = body?.message?.trim();
  const mode = body?.mode?.trim() || "Message clarity";
  if (!message) return NextResponse.json({ error: "Add a message first." }, { status: 400 });
  if (message.length > 1200) return NextResponse.json({ error: "Keep the message under 1,200 characters." }, { status: 400 });
  const apiKey = process.env.OPENAI_API_KEY?.trim() || request.cookies.get("lwn_openai_key")?.value?.trim();
  const model = process.env.OPENAI_MODEL || "gpt-5";
  if (!apiKey || apiKey.includes("your_openai_api_key_here") || apiKey.includes("paste_your_openai_api_key_here")) return NextResponse.json({ result: fallback });
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        max_output_tokens: 650,
        input: [
          { role: "system", content: "You are the LeadWithNadine Stop Overexplaining Tool, a premium communication clarity tool for frontline leaders, security professionals, team leaders, and managers. Refine overexplained workplace communication into calm authority. Use British English. Be direct, practical, emotionally controlled, and respectful. Remove unnecessary cushioning, defensiveness, repetition, vague language, and overjustification. Keep standards clear without sounding aggressive. Avoid therapy language, motivational language, corporate jargon, fake warmth, dramatic phrasing, generic chatbot phrasing, and long explanations. Return exactly two sections: Clearer version and Why this works. Keep the clearer version ready to send." },
          { role: "user", content: `Tool mode: ${mode}\n\nMessage:\n${message}` },
        ],
      }),
    });
    if (!response.ok) return NextResponse.json({ error: "The clarity tool is not available right now. Try again in a moment." }, { status: 502 });
    const data = (await response.json()) as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
    return NextResponse.json({ result: extractOutput(data) || fallback });
  } catch {
    return NextResponse.json({ error: "The clarity tool could not complete the rewrite. Try again shortly." }, { status: 500 });
  }
}
