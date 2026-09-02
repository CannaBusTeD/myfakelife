export type ConsentChoice = "allowed" | "rejected";
const KEY = "mfl_cookie_consent";
const EXPIRY_KEY = "mfl_cookie_consent_expiry";
const COOKIE = "cb_consent";
const LEGACY_COOKIE = "cb_cookie_consent";
const BROWSER_ID_COOKIE = "cb_bid";
const BROWSER_ID_KEY = "cb_bid";
const ACCEPT_SECONDS = 60 * 60 * 24 * 365 * 10;
const REJECT_SECONDS = 60 * 60 * 24 * 30;
const PARENT_DOMAIN = "cannabusted.com";
const COLLECTOR = "https://culwtiicxtdzrjrqhmts.supabase.co/functions/v1/collect-event";
const toWire = (c: ConsentChoice) => c === "allowed" ? "accept" : "reject";
function fromWire(v:string|null):ConsentChoice|null{if(v==="accept"||v==="allowed")return "allowed";if(v==="reject"||v==="rejected")return "rejected";return null}
export function isSharedDomain(){if(typeof window==="undefined")return false;const h=window.location.hostname;return h===PARENT_DOMAIN||h.endsWith(`.${PARENT_DOMAIN}`)}
function readCookie(name:string):string|null{if(typeof document==="undefined")return null;const m=document.cookie.split("; ").find(c=>c.startsWith(`${name}=`));return m?decodeURIComponent(m.slice(name.length+1)):null}
function writeSharedCookie(name:string,value:string,maxAge:number){if(typeof document==="undefined"||!isSharedDomain())return;const secure=window.location.protocol==="https:"?"; Secure":"";document.cookie=`${name}=${encodeURIComponent(value)}; Domain=.${PARENT_DOMAIN}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`}
function clearSharedCookie(name:string){if(typeof document==="undefined"||!isSharedDomain())return;document.cookie=`${name}=; Domain=.${PARENT_DOMAIN}; Path=/; Max-Age=0; SameSite=Lax`}
export function readConsent():ConsentChoice|null{if(typeof window==="undefined")return null;const c=fromWire(readCookie(COOKIE))??fromWire(readCookie(LEGACY_COOKIE));if(c)return c;try{const stored=fromWire(localStorage.getItem(KEY));const expiry=Number(localStorage.getItem(EXPIRY_KEY)||"0");if(stored&&expiry&&Date.now()>expiry){localStorage.removeItem(KEY);localStorage.removeItem(EXPIRY_KEY);return null}return stored}catch{return null}}
export function getBrowserId():string|null{if(typeof window==="undefined"||readConsent()!=="allowed")return null;let id=readCookie(BROWSER_ID_COOKIE);if(!id){try{id=localStorage.getItem(BROWSER_ID_KEY)}catch{id=null}}if(!id){id=typeof crypto!=="undefined"&&"randomUUID" in crypto?crypto.randomUUID():`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;writeSharedCookie(BROWSER_ID_COOKIE,id,ACCEPT_SECONDS);try{localStorage.setItem(BROWSER_ID_KEY,id)}catch{}}return id}
function recordConsent(choice:ConsentChoice){const wire=toWire(choice);fetch(COLLECTOR,{method:"POST",headers:{"content-type":"application/json"},keepalive:true,body:JSON.stringify({site:"myfakelife",event_type:"consent_choice",page_path:location.pathname,target:wire,browser_id:choice==="allowed"?getBrowserId():null,consent_state:wire,referrer:document.referrer?new URL(document.referrer).origin+new URL(document.referrer).pathname:null})}).catch(()=>{})}
export function writeConsent(choice:ConsentChoice){const seconds=choice==="allowed"?ACCEPT_SECONDS:REJECT_SECONDS;writeSharedCookie(COOKIE,toWire(choice),seconds);clearSharedCookie(LEGACY_COOKIE);try{localStorage.setItem(KEY,toWire(choice));localStorage.setItem(EXPIRY_KEY,String(Date.now()+seconds*1000))}catch{}if(choice==="allowed")getBrowserId();else{clearSharedCookie(BROWSER_ID_COOKIE);try{localStorage.removeItem(BROWSER_ID_KEY)}catch{}}recordConsent(choice);if(typeof window!=="undefined")window.dispatchEvent(new CustomEvent("mfl-consent",{detail:choice}))}
export function clearConsent(){clearSharedCookie(COOKIE);clearSharedCookie(LEGACY_COOKIE);clearSharedCookie(BROWSER_ID_COOKIE);try{localStorage.removeItem(KEY);localStorage.removeItem(EXPIRY_KEY);localStorage.removeItem(BROWSER_ID_KEY)}catch{}if(typeof window!=="undefined")window.dispatchEvent(new CustomEvent("mfl-consent",{detail:null}))}
export function reopenConsent(){if(typeof window!=="undefined")window.dispatchEvent(new CustomEvent("mfl-consent-reopen"))}
export function onConsentChange(cb:(c:ConsentChoice)=>void){const handler=(e:Event)=>cb((e as CustomEvent).detail as ConsentChoice);window.addEventListener("mfl-consent",handler);return()=>window.removeEventListener("mfl-consent",handler)}
