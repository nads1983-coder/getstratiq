# LeadWithNadine

Premium Next.js communication clarity platform for LeadWithNadine.com.

## Local Setup

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
npm run setup-env
```

Then paste your OpenAI API key when prompted. The script writes the key to `.env.local` and does not print it back.

You can also edit `.env.local` directly. Paste your OpenAI API key into `.env.local` after `OPENAI_API_KEY=`:

```text
OPENAI_API_KEY=paste_your_openai_api_key_here
OPENAI_MODEL=gpt-5
```

## Security

The OpenAI API key is read only by the server-side `/api/clarity` route.

Never place the key in:

- React components
- Client-side code
- Public environment variables beginning with `NEXT_PUBLIC_`
- Committed files

`.env.local` and `.env` are ignored by git.

## Deployment

Deploy this project to the Vercel project named `lead-with-nadine` only. Do not attach `leadwithnadine.com` to STRATIQ or any `getstratiq` project.

Set these environment variables in Vercel Project Settings:

```text
OPENAI_API_KEY
OPENAI_MODEL
```
