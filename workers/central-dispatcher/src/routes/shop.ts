import {Hono} from 'hono'; import type {Env} from '../types';
export const shop=new Hono<{Bindings:Env}>();
shop.get('/catalog',async c=>{const r=await c.env.DB.prepare('SELECT id,name,price,duration_days as durationDays,features_json as features FROM vip_plans WHERE active=1 ORDER BY price').all<any>(); return c.json({ok:true,data:r.results.map(x=>({...x,features:JSON.parse(x.features||'{}')})),requestId:c.get('requestId')});});
