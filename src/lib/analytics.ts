const SITE = "myfakelife";
const COLLECTOR = "https://culwtiicxtdzrjrqhmts.supabase.co/functions/v1/collect";

function cookie(name: string) {
  return document.cookie.split("; ").find((c) => c.startsWith(name + "="))?.slice(name.length + 1) || null;
}

function send(eventType: string, extra: Record<string, unknown> = {}) {
  const choice = cookie("cb_consent") || localStorage.getItem("mfl_cookie_consent");
  if (eventType !== "download" && choice !== "accept") return;
  fetch(COLLECTOR, {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      site: SITE,
      event_type: eventType,
      page_path: location.pathname + location.search,
      browser_id: choice === "accept" ? cookie("cb_bid") : null,
      session_id: sessionStorage.getItem("cb_session") || undefined,
      consent_state: choice === "accept" ? "accept" : choice === "reject" ? "reject" : "necessary",
      referrer: document.referrer || null,
      metadata: { screen: `${screen.width}x${screen.height}`, language: navigator.language },
      ...extra,
    }),
  }).catch(() => {});
}

if (typeof window !== "undefined" && !(window as any).__cbAnalytics) {
  (window as any).__cbAnalytics = true;
  if (!sessionStorage.getItem("cb_session")) sessionStorage.setItem("cb_session", crypto.randomUUID?.() || Date.now().toString(36));
  const page = () => send("page_view");
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", page, { once: true }) : queueMicrotask(page);
  document.addEventListener("click", (ev) => {
    const el = (ev.target as Element | null)?.closest("a,button,[role=button]");
    if (!el) return;
    const a = el.closest("a") as HTMLAnchorElement | null;
    const label = (el.getAttribute("data-analytics") || el.getAttribute("aria-label") || el.textContent || el.id || el.tagName).trim().slice(0, 200);
    const href = a?.href || "";
    const words = (label + " " + href).toLowerCase();
    const isDownload = !!a?.hasAttribute("download") || /\.(mp3|wav|flac|zip|pdf)(\?|#|$)/i.test(href);
    if (isDownload) send("download", { target: label, asset_id: a?.getAttribute("download") || href.split("/").pop() || label, asset_type: href.match(/\.([a-z0-9]+)(?:\?|#|$)/i)?.[1] || "file" });
    else send(words.includes("mailchimp") || words.includes("return ticket") || words.includes("sign up") || words.includes("signup") ? "return_ticket_click" : "click", { target: label });
  });
  let x = 0, y = 0, started = 0;
  document.addEventListener("pointerdown", (e) => { x = e.clientX; y = e.clientY; started = Date.now(); }, { passive: true });
  document.addEventListener("pointerup", (e) => {
    const dx = e.clientX - x, dy = e.clientY - y, duration = Date.now() - started;
    if (duration < 1200 && Math.max(Math.abs(dx), Math.abs(dy)) > 80) send("swipe", { target: Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"), metadata: { distance: Math.round(Math.hypot(dx, dy)), duration_ms: duration } });
  }, { passive: true });
}
