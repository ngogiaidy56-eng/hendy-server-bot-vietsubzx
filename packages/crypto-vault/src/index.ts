const enc = new TextEncoder(); const dec = new TextDecoder();
const b64 = (b:ArrayBuffer|Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b)));
const unb64 = (s:string) => Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function key(secret:string){return crypto.subtle.importKey('raw',enc.encode(secret),'AES-GCM',false,['encrypt','decrypt']);}
export async function encrypt(plain:string, secret:string):Promise<string>{const iv=crypto.getRandomValues(new Uint8Array(12)); const k=await key(secret); const ct=await crypto.subtle.encrypt({name:'AES-GCM',iv},k,enc.encode(plain)); return `${b64(iv)}.${b64(ct)}`;}
export async function decrypt(token:string, secret:string):Promise<string>{const [a,b]=token.split('.'); if(!a||!b) throw new Error('Invalid encrypted token'); const k=await key(secret); const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(a)},k,unb64(b)); return dec.decode(pt);}
export async function sha256(value:string):Promise<string>{const h=await crypto.subtle.digest('SHA-256',enc.encode(value)); return b64(h);}
export async function hmacSha256(secret:string,message:string):Promise<string>{const k=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']); return b64(await crypto.subtle.sign('HMAC',k,enc.encode(message)));}
