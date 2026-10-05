export interface Env { DB:D1Database; CONFIG:KVNamespace; ASSETS:R2Bucket; ENVIRONMENT:string; ADMIN_HMAC_SECRET:string; JWT_SECRET:string; INTERNAL_SERVICE_TOKEN:string; AI_BACKEND_URL:string; PAYMENT_WEBHOOK_SECRET:string; ADMIN_BOOTSTRAP_TOKEN:string; }
export interface AuthUser { id:string; role:'user'|'vip'|'admin'|'superadmin'; displayName:string; }
