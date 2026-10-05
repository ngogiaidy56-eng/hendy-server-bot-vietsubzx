#!/usr/bin/env bash
set -euo pipefail
: "${CLOUDFLARE_ACCOUNT_ID:?Set CLOUDFLARE_ACCOUNT_ID}"
wrangler d1 create hendy_vietsub || true
wrangler kv namespace create hendY_CONFIG || true
wrangler r2 bucket create hendy-assets || true
echo "Provisioning commands completed. Copy generated IDs into workers/central-dispatcher/wrangler.jsonc."
