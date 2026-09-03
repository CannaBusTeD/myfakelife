import { useEffect, useId, useRef, useState } from "react";
import menuArt from "@/assets/site/menu-popup.png.asset.json";

const destinations = [
  { label: "Home", href: "/", top: "31.5%" },
  { label: "Gallery", href: "/album#gallery", top: "41.3%" },
  { label: "About", href: "/album#about", top: "50.4%" },
  { label: "My Fake Life", href: "/", top: "66.1%" },
  { label: "My Fake Love", href: "https://myfakelove.cannabusted.com", top: "75.2%" },
  { label: "My Fake Laugh", href: "https://myfakelaugh.cannabusted.com", top: "84.0%" },
] as const;

export function ArtworkMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    window.history.pushState({ artworkMenu: true }, "");
    const onPop = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="fixed right-2 top-2 z-[90] sm:right-4 sm:top-4">
      <button
        ref={toggleRef}
        type="button"
        aria-label="Open site menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(true)}
        className="group block h-[70px] w-[92px] appearance-none overflow-hidden border-0 bg-transparent p-0 shadow-none rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember sm:h-[82px] sm:w-[108px]"
      >
        <img
          src={menuArt.url}
          alt=""
          aria-hidden="true"
          className="pointer-events-none block h-auto max-w-none bg-transparent transition-transform group-hover:scale-[1.02]"
          style={{ width: "365.72%" }}
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
              toggleRef.current?.focus();
            }
          }}
        >
          <nav
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="relative w-full max-w-[760px] overflow-hidden bg-transparent"
            style={{ aspectRatio: "1116 / 1024" }}
          >
            <img
              src={menuArt.url}
              alt="My Fake World navigation menu"
              className="absolute top-0 h-auto max-w-none select-none bg-transparent"
              style={{ width: "137.64%", left: "-37.64%" }}
            />

            {destinations.map((destination, index) => (
              <a
                key={destination.label}
                ref={index === 0 ? firstLinkRef : undefined}
                href={destination.href}
                aria-label={destination.label}
                onClick={() => setOpen(false)}
                className="absolute left-[31%] h-[8.1%] w-[47%] rounded-md bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ top: destination.top }}
              >
                <span className="sr-only">{destination.label}</span>
              </a>
            ))}

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              className="absolute right-[1.8%] top-[2.2%] h-[11%] w-[11%] appearance-none rounded-full border-0 bg-transparent p-0 shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
