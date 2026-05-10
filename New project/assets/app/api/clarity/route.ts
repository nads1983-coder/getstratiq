import { NextResponse } from "next/server";

const windowMs = 60_000;
const maxRequests = 8;
const requests = new Map<string, { count: number; resetAt: number }>();

const fallback = `1. Situation summary
The situation involves a process being bypassed by someone with influence. What matters most is protecting clarity for the team without turning the issue into a personal challenge. The noise is the fear that any boundary will automatically damage the relationship.

2. Strategic interpretation
The core dynamic is authority overlap. If it continues, your team receives competing signals and accountability becomes unclear. The hidden risk is that silence may be read as acceptance.

3. Options
Option A: Address it directly and privately. Pro: clear and controlled. Con: requires careful wording.
Option B: Ignore it. Pro: avoids immediate discomfort. Con: allows confusion to continue.
Option C: Escalate first. Pro: creates formal record. Con: may look disproportionate before a direct conversation.

4. Risk assessment
Operational risk: medium. Communication risk: medium. Relationship risk: manageable if handled calmly. Reputation risk: low if you stay factual. Escalation risk: higher if the pattern continues unaddressed.

5. Recommended move
Speak privately, keep it process-based, and make the desired route clear. Avoid accusation, apology, or making it about personality.

6. Suggested wording
"I want to keep instructions clear for the team. When actions go directly to them outside the agreed process, it creates mixed direction and makes accountability harder. Can we keep those requests routed through the agreed channel so I can coordinate them properly?"

7. Next step
Book a short private conversation and write down one example before you speak.`;

function getClientId(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const current = requests.get(clientId);

  if (!current || current.resetAt <= now) {
    requests.set(clientId, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequests;
}

function extractOutput(data: {
  output_text?: string;
  output?: Array<{
    content?: Array<{ text?: string; type?: string }>;
  }>;
}) {
  return (
    data.output_text ||
    data.output
      ?.flatMap((item) => item.content || [])
      .map((item) => item.text)
      .filter(Boolean)
      .join("\n")
      .trim()
  );
}

export async function POST(request: Request) {
  const clientId = getClientId(request);

  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { error: "STRATIQ is receiving too many requests from this connection. Try again shortly." },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as { message?: string; mode?: string } | null;
  const message = body?.message?.trim();
  const mode = body?.mode?.trim() || "Decision clarity";

  if (!message) {
    return NextResponse.json({ error: "Describe the situation first." }, { status: 400 });
  }

  if (message.length > 1800) {
    return NextResponse.json({ error: "Keep the situation under 1,800 characters." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-5";

  if (!apiKey || apiKey.includes("your_openai_api_key_here")) {
    return NextResponse.json({ result: fallback });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_output_tokens: 950,
        input: [
          {
            role: "system",
            content:
              "You are STRATIQ, a senior strategic adviser and decision analyst for professionals under pressure. Your job is to improve judgement, not provide generic advice. Use British English. Be calm, precise, commercially credible, analytical, emotionally controlled, and high-signal. Analyse ambiguity, trade-offs, incentives, power dynamics, communication risk, operational risk, relationship risk, reputation risk, escalation risk, and likely consequences. Avoid therapy language, diagnosis, moralising, motivational phrasing, excessive warmth, dramatic language, vague coaching, generic ChatGPT phrasing, and filler. Do not overexplain. Return a structured reasoning brief using exactly these headings: 1. Situation summary, 2. Strategic interpretation, 3. Options, 4. Risk assessment, 5. Recommended move, 6. Suggested wording, 7. Next step. Keep it specific to the user's situation.",
          },
          {
            role: "user",
            content: `Reasoning mode: ${mode}\n\nSituation:\n${message}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "STRATIQ is not available right now. Try again in a moment." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{
        content?: Array<{ text?: string; type?: string }>;
      }>;
    };

    return NextResponse.json({ result: extractOutput(data) || fallback });
  } catch {
    return NextResponse.json(
      { error: "STRATIQ could not complete the analysis. Try again shortly." },
      { status: 500 },
    );
  }
}
