export interface UserProfile {
  id: string;
  telegram_id: string;
  username?: string;
  balance: number;
  vip_level: number;
  status: 'ACTIVE' | 'BANNED';
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  service_type: 'VIETQR' | 'VIETSUB_AI' | 'SHOP_CODE';
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  created_at: string;
}

export interface VietsubJob {
  job_id: string;
  user_id: string;
  video_url: string;
  status: 'QUEUED' | 'TRANSCRIBING' | 'TRANSLATING' | 'RENDERING' | 'DONE' | 'ERROR';
  progress: number;
}
