import { Link, useLocation } from "@tanstack/react-router";

const NAV_ORDER = [
  "/",
  "/album",
  "/listen",
  "/guide/how-to-make-a-concept-album",
  "/how-to-build-a-world",
  "/lost-property",

] as const;

type NavPath = (typeof NAV_ORDER)[number];

export function FloatingNav() {
  const location = useLocation();
  const path = location.pathname as NavPath;

  const idx = NAV_ORDER.indexOf(path);
  if (idx === -1) return null;

  const prev = idx > 0 ? NAV_ORDER[idx - 1] : null;
  const next = idx < NAV_ORDER.length - 1 ? NAV_ORDER[idx + 1] : NAV_ORDER[0];

  if (path === "/") return null;

  return (
    <nav
      aria-label="Page navigation"
      className="fixed bottom-5 left-5 right-5 z-50 flex items-end justify-between pointer-events-none"
    >
      {prev ? (
        <Link
          to={prev}
          className="floating-nav-btn pointer-events-auto"
          aria-label="Previous page"
        >
          <span aria-hidden>←</span> Last stop
        </Link>
      ) : (
        <span aria-hidden />
      )}

      <Link
        to={next}
        className="floating-nav-btn pointer-events-auto"
        aria-label="Next page"
      >
        Next stop <span aria-hidden>→</span>
      </Link>
    </nav>
  );
}
