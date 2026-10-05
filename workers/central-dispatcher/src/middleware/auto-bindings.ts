import type {MiddlewareHandler} from 'hono'; import type {Env} from '../types';
export const autoBindings:MiddlewareHandler<{Bindings:Env}>=async(c,next)=>{c.header('X-Hendy-Environment',c.env.ENVIRONMENT||'unknown'); await next();};
