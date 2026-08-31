/**
 * Cookie / storage consent for the connected CannaBusTeD sites.
 *
 * Participating sites (all under cannabusted.com): My Fake Love, My Fake Laugh,
 * My Fake Book, My Fake Life and My Fake Voice. My Fake Game is excluded.
 *
 * On the live domain the choice is stored in a parent-domain cookie
 * (.cannabusted.com) so a choice made on one participating site is honoured on
 * the others. On Lovable preview domains (or anywhere else) we fall back to
 * localStorage for that origin only — no parent-domain cookie is attempted.
 */

export type ConsentChoice = "allowed" | "rejected";

const KEY = "mfl_cookie_consent";
const COOKIE = "cb_cookie_consent";
const BROWSER_ID_COOKIE = "cb_bid";
const BROWSER_ID_KEY = "cb_bid";
const TWELVE_MONTHS_SECONDS = 60 * 60 * 24 * 365;
const PARENT_DOMAIN = "cannabusted.com";

/** True when we're on the live cannabusted.com domain (any subdomain). */
export function isSharedDomain(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === PARENT_DOMAIN || h.endsWith(`.${PARENT_DOMAIN}`);
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeSharedCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined" || !isSharedDomain()) return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Domain=.${PARENT_DOMAIN}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function clearSharedCookie(name: string) {
  if (typeof document === "undefined" || !isSharedDomain()) return;
  document.cookie = `${name}=; Domain=.${PARENT_DOMAIN}; Path=/; Max-Age=0; SameSite=Lax`;
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const fromCookie = readCookie(COOKIE);
  if (fromCookie === "allowed" || fromCookie === "rejected") return fromCookie;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "allowed" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

/**
 * An anonymous browser identifier, created only after Accept. It carries no
 * personal information and exists purely to recognise this browser across the
 * connected CannaBusTeD sites.
 */
export function getBrowserId(): string | null {
  if (typeof window === "undefined") return null;
  if (readConsent() !== "allowed") return null;
  let id = readCookie(BROWSER_ID_COOKIE);
  if (!id) {
    try {
      id = window.localStorage.getItem(BROWSER_ID_KEY);
    } catch {
      id = null;
    }
  }
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    writeSharedCookie(BROWSER_ID_COOKIE, id, TWELVE_MONTHS_SECONDS);
    try {
      window.localStorage.setItem(BROWSER_ID_KEY, id);
    } catch {
      /* noop */
    }
  }
  return id;
}

export function writeConsent(choice: ConsentChoice) {
  writeSharedCookie(COOKIE, choice, TWELVE_MONTHS_SECONDS);
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    /* storage unavailable — choice simply isn't remembered */
  }

  if (choice === "allowed") {
    getBrowserId();
  } else {
    clearSharedCookie(BROWSER_ID_COOKIE);
    try {
      window.localStorage.removeItem(BROWSER_ID_KEY);
    } catch {
      /* noop */
    }
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("mfl-consent", { detail: choice }));
  }
}

/** Forget the stored choice entirely (withdraw consent). */
export function clearConsent() {
  clearSharedCookie(COOKIE);
  clearSharedCookie(BROWSER_ID_COOKIE);
  try {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(BROWSER_ID_KEY);
  } catch {
    /* noop */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("mfl-consent", { detail: null }));
  }
}

/** Ask the consent popup to reopen so the visitor can change their choice. */
export function reopenConsent() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mfl-consent-reopen"));
}

/** Subscribe to consent changes (same-tab). */
export function onConsentChange(cb: (c: ConsentChoice) => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail as ConsentChoice);
  window.addEventListener("mfl-consent", handler);
  return () => window.removeEventListener("mfl-consent", handler);
}
