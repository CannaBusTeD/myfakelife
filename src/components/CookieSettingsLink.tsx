import { reopenConsent } from "@/lib/cookie-consent";

/** Discreet way to reopen the cookie note and change or withdraw the choice. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => reopenConsent()}
      className={`landing-focus min-h-11 px-1 text-xs underline text-parchment/70 hover:text-ember transition ${className}`}
    >
      Cookies — change or withdraw your choice
    </button>
  );
}
