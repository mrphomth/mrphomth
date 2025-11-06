# Mr.Prompt

Mr.Prompt is an all-in-one workspace for crafting, managing, and executing AI prompts through collaborative chat sessions powered by Supabase and a dedicated FastAPI gateway that connects to `streamlake.ai` (Kat Coder) and future model providers.

## Tech Stack

- **Web App:** Next.js 14 (App Router), TypeScript, Tailwind CSS, SWR
- **Auth & Database:** Supabase (PostgreSQL)
- **AI Gateway:** FastAPI, httpx, pydantic
- **Tooling:** ESLint, Prettier, Tailwind Merge, Headless UI

## Repository Layout

```
app/                       # Next.js application (App Router)
components/                # Shared UI & chat components
docs/                      # Architecture notes
lib/                       # Supabase utilities & shared types
services/ai-gateway/       # FastAPI microservice for AI providers
utils/                     # Security helpers (encryption, hashing)
```

## Prerequisites

- Node.js 18+
- pnpm/npm/yarn (examples use `npm`)
- Python 3.11+
- Supabase project with the schema outlined in `docs/architecture.md`

## Environment Variables

Create a `.env.local` inside the repo root for Next.js:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=            # optional, for server actions requiring elevated rights
AI_GATEWAY_URL=http://localhost:8000  # FastAPI service origin
AI_GATEWAY_API_KEY=                   # matches FastAPI GATEWAY_API_KEY
ENCRYPTION_SECRET=32-character-secret # used by utils/security.ts
```

Create a `.env` inside `services/ai-gateway/`:

```
STREAMLAKE_API_URL=https://api.streamlake.ai/v1
STREAMLAKE_API_KEY=
GATEWAY_API_KEY=                      # shared with Next.js API route
CORS_ORIGINS=["http://localhost:3000"]
```

> **Note:** `ENCRYPTION_SECRET` must be 32 bytes. If a different length is supplied, the application hashes it to derive a 256-bit key.

## Installation

### 1. Web Application

```bash
cd /workspace
npm install
npm run dev
```

The Next.js app runs at `http://localhost:3000`.

### 2. AI Gateway

```bash
cd services/ai-gateway
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The FastAPI service exposes:

- `GET /health` — health check
- `POST /chat` — streaming chat endpoint that forwards to `streamlake.ai`

### 3. Supabase Setup

1. Create the tables listed in `docs/architecture.md` (or import via SQL).
2. Enable Row-Level Security (RLS) for user-owned data tables (`profiles`, `prompts`, `chat_sessions`, etc.).
3. Define policies permitting users to access their own rows and public prompts.

## Key Application Features

- **Auth-ready Supabase clients:** Browser, server component, and route handler helpers located in `lib/supabase/`.
- **Secure credential storage:** AES-256-GCM encryption helpers in `utils/security.ts` for user API keys.
- **Tailored UI shell:** `app/app/layout.tsx` implements a three-column dashboard layout (sidebar, content, context panel).
- **Reusable UI primitives:** Button, Input, Card, and Modal live in `components/ui/`.
- **Chat experience:** Located in `app/app/chat/[session_id]/page.tsx` using SSE streaming from `/api/chat`.
- **Prompt management:** CRUD APIs under `app/api/prompts/` with client UI in `app/app/prompts/page.tsx`.
- **AI Gateway microservice:** FastAPI implementation in `services/ai-gateway/app/` with streaming pass-through to `streamlake.ai`.

## Development Workflow

1. Start Supabase locally (or ensure a remote project is reachable).
2. Run the FastAPI gateway and note the port/API key.
3. Launch the Next.js dev server.
4. Sign up via Supabase Auth (flows can be completed using Supabase's auth helpers).
5. Store provider API keys securely using the built-in encryption helpers before invoking the chat gateway.

## Testing & Future Work

- Add Playwright tests for chat flows and prompt CRUD.
- Implement Supabase edge functions/webhooks for background jobs.
- Extend the FastAPI gateway with provider adapters and caching.
- Introduce organization/team features backed by Supabase row-level security.

## License

This repository is provided as an initial blueprint and starter codebase. Adopt an appropriate open-source or internal license before distributing further.
