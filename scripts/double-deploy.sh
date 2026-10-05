#!/usr/bin/env bash
set -euo pipefail
npm run build:packages
npm run build:apps
npm --workspace workers/central-dispatcher run build
# Deploy worker after a successful dry-run.
wrangler deploy --config workers/central-dispatcher/wrangler.jsonc
# Static frontends can be deployed with Cloudflare Pages/Workers Static Assets according to the hosting target.
echo "Worker deployed. Upload apps/*/dist to your selected Pages projects or configure Pages CI."
