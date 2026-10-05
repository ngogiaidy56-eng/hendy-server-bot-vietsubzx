import type {ApiResponse,CreateJobInput,VietsubJob} from '@hendy/shared-types';
export interface VietsubClientOptions { baseUrl:string; token?:string; fetch?:typeof fetch; }
export class VietsubClient { private f:typeof fetch; constructor(private o:VietsubClientOptions){this.f=o.fetch??fetch;}
 private async request<T>(path:string,init:RequestInit={}):Promise<T>{const r=await this.f(`${this.o.baseUrl}${path}`,{...init,headers:{'Content-Type':'application/json',...(this.o.token?{Authorization:`Bearer ${this.o.token}`}:{ }),...(init.headers||{})}}); const j=await r.json() as ApiResponse<T>; if(!r.ok||!j.ok) throw new Error(j.error||`HTTP ${r.status}`); return j.data as T;}
 createJob(input:CreateJobInput){return this.request<VietsubJob>('/api/vietsub/jobs',{method:'POST',body:JSON.stringify(input)});}
 getJob(id:string){return this.request<VietsubJob>(`/api/vietsub/jobs/${encodeURIComponent(id)}`);}
}
