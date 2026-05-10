# STRATIQ

Free AI strategic reasoning for better judgement under pressure.

STRATIQ is built as a premium-feeling, mobile-first AI reasoning platform for professionals who need to think clearly, communicate better, decide better, assess risk, and understand trade-offs before acting.

## Stack

- Next.js App Router
- Tailwind CSS
- Vercel-ready deployment
- Server-side OpenAI API route
- Optional donation/support link
- SEO metadata, sitemap, robots.txt, schema markup, and canonical URLs

## Environment Variables

The OpenAI API key must live only in `.env.local` locally and in Vercel Project Settings for production.

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5
```

Never place the key in React components, client-side code, public variables, or committed files.

## AI Architecture

All OpenAI calls run server-side through `app/api/clarity/route.ts`.

The prompt produces concise reasoning briefs with situation summary, strategic interpretation, options, risk assessment, recommended move, suggested wording, and next step.

## Business Model

STRATIQ is free to use. There are no subscriptions, paywalls, pricing tables, premium plans, checkout flows, or gated features. The only monetisation surface is an optional support link for users who want to help keep the platform free.

## Deploying to Vercel

This codebase must deploy only to the existing Vercel project named `getstratiq`.

Do not deploy this project to any LeadWithNadine project.

### Vercel Dashboard Import

1. Push this folder to a GitHub repository for STRATIQ.
2. In Vercel, open the existing project named `getstratiq`.
3. Connect the STRATIQ GitHub repository to that project.
4. In Vercel Project Settings, add:

```text
OPENAI_API_KEY
OPENAI_MODEL
```

5. Set `OPENAI_MODEL` to `gpt-5`.
6. Deploy the `main` branch to production.
7. Confirm the production domains are:

```text
getstratiq.co
www.getstratiq.co
```

### GitHub Deployment

After the GitHub repository is connected to Vercel project `getstratiq`, future pushes to `main` will create production deployments according to the Vercel project settings.

Before deployment, confirm:

- `package.json` name is `getstratiq`
- Vercel project is `getstratiq`
- `.env.local` is not committed
- `OPENAI_API_KEY` is only set in Vercel environment variables
- no LeadWithNadine domains are attached to this Vercel project
