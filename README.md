# Hendy Server Bot Vietsub

Production-oriented monorepo for a Vietnamese subtitle service: Cloudflare edge API + D1/KV/R2, React 19 admin/studio/Telegram Mini App, shared SDK, and FastAPI AI backend.

## Architecture

```text
React Admin / Studio / Telegram Mini App
                |
                v
      Cloudflare Central Dispatcher
       |       |       |       |
      D1      KV      R2    AI Backend
       |       |       |       |
       +-------+-------+-------+
                |
       FastAPI Whisper + GPT + FFmpeg
```

## Requirements

- Node.js 20+
- npm 10+
- Cloudflare Wrangler 4+
- Python 3.11+
- FFmpeg for burn-in

## Quick start

```bash
cp .env.example .env
npm install
npm run db:migrate:local
npm run dev
```

AI backend:

```bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
pip install -r workers/vietsub-ai-backend/requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

Then open the Vite URLs printed by npm. Dispatcher defaults to `http://localhost:8787`.

## Production deployment

1. Create D1/KV/R2 using `scripts/auto-provision-binds.sh` or Cloudflare Dashboard.
2. Put secrets in Cloudflare secrets, never in git.
3. Run `npm run db:migrate:remote`.
4. Deploy the Worker and frontends with `npm run deploy`.
5. Deploy the FastAPI service to a GPU host and set `AI_BACKEND_URL`.

## Security model

- Admin requests use a signed HMAC-SHA256 header: `X-Hendy-Timestamp`, `X-Hendy-Signature`.
- RBAC is enforced at the route layer.
- Payment webhooks require an independent HMAC secret and idempotency keys.
- Secrets are never persisted in D1; dynamic configuration belongs in KV/Cloudflare Secrets.
- AI backend requires `X-Internal-Service-Token`.

## API

- `GET /health`
- `POST /api/auth/login`
- `GET /api/admin/overview`
- `GET /api/admin/users`
- `GET /api/admin/queue`
- `POST /api/vietsub/jobs`
- `GET /api/vietsub/jobs/:id`
- `POST /api/payment/webhook`
- `GET /api/shop/catalog`
