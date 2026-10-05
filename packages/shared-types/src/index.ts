export type Role = 'user'|'vip'|'admin'|'superadmin';
export type JobStatus = 'queued'|'processing'|'completed'|'failed'|'cancelled';
export interface User { id:string; telegramId?:string; email?:string; displayName:string; role:Role; balance:number; vipExpiresAt?:string; status:'active'|'suspended'|'deleted'; createdAt:string; }
export interface VietsubJob { id:string; userId:string; sourceKey:string; languageFrom:string; languageTo:string; status:JobStatus; progress:number; resultKey?:string; errorMessage?:string; options:Record<string,unknown>; createdAt:string; updatedAt:string; }
export interface CreateJobInput { sourceKey:string; languageFrom?:string; languageTo?:string; options?:Record<string,unknown>; }
export interface QueueStats { queued:number; processing:number; completed:number; failed:number; }
export interface ApiResponse<T> { ok:boolean; data?:T; error?:string; requestId:string; }
export interface AdminOverview { users:number; balance:number; jobs:QueueStats; revenue:number; }
