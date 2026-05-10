# STRATIQ

STRATIQ is a free AI strategic reasoning tool for professionals who need clearer judgement under pressure.

It is calm, analytical, practical, and direct. It is not a therapy bot, motivational product, generic chatbot, or productivity guru platform.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Server-side OpenAI API route

## Environment Variables

Set these in Vercel Project Settings for the `getstratiq` project:

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

The OpenAI API key must never be placed in client-side code.

## Deployment

Deploy this repository only to the Vercel project named `getstratiq`.

Production domains:

```text
getstratiq.co
www.getstratiq.co
```

Build command:

```bash
npm run build
```

The build script runs:

```bash
next build --webpack
```
