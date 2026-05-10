import { NextRequest, NextResponse } from "next/server";

const cookieName = "lwn_openai_key";

function hasEnvironmentKey() {
  const key = process.env.OPENAI_API_KEY?.trim();
  return Boolean(key && !key.includes("your_openai_api_key_here") && !key.includes("paste_your_openai_api_key_here") && key.length > 20);
}

function cookieOptions(request: NextRequest) {
  return { httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 180 };
}

export async function GET(request: NextRequest) {
  if (hasEnvironmentKey()) return NextResponse.json({ configured: true, source: "environment" });
  return NextResponse.json({ configured: Boolean(request.cookies.get(cookieName)?.value), source: "saved" });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { apiKey?: string } | null;
  const apiKey = body?.apiKey?.trim();
  if (!apiKey || apiKey.length < 20 || apiKey.includes("your_openai_api_key_here") || apiKey.includes("paste_your_openai_api_key_here")) {
    return NextResponse.json({ error: "Paste a valid OpenAI API key." }, { status: 400 });
  }
  const response = NextResponse.json({ configured: true });
  response.cookies.set(cookieName, apiKey, cookieOptions(request));
  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ configured: false });
  response.cookies.set(cookieName, "", { ...cookieOptions(request), maxAge: 0 });
  return response;
}
