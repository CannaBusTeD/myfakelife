/**
 * Cookie / storage consent for My Fake Life.
 *
 * The site itself sets no analytics or advertising cookies. The only
 * non-essential thing that can drop third-party storage is the embedded
 * YouTube player used for the videos, so that is what this gates.
 */

export type ConsentChoice = "allowed" | "rejected";

const KEY = "mfl_cookie_consent";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "allowed" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    /* storage unavailable — choice simply isn't remembered */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("mfl-consent", { detail: choice }));
  }
}

/** Subscribe to consent changes (same-tab). */
export function onConsentChange(cb: (c: ConsentChoice) => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail as ConsentChoice);
  window.addEventListener("mfl-consent", handler);
  return () => window.removeEventListener("mfl-consent", handler);
}
