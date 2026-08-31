import { useEffect, useRef, useState } from "react";
import { readConsent, onConsentChange } from "@/lib/cookie-consent";

interface VideoModalProps {
  videoId: string | null;
  title?: string;
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
}

export function VideoModal({ videoId, title, onClose, returnFocusTo }: VideoModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(readConsent() === "allowed");
    return onConsentChange((c) => setAllowed(c === "allowed"));
  }, []);

  useEffect(() => {
    if (!videoId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusTo?.focus?.();
    };
  }, [videoId, onClose, returnFocusTo]);

  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — video player` : "Video player"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-parchment/80 truncate">
            {title ?? "Now Playing"}
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close video"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border/70 text-parchment hover:text-ember hover:border-ember transition"
          >
            ✕
          </button>
        </div>
        <div className="relative w-full aspect-video bg-black ring-1 ring-oxblood/50 shadow-2xl">
          {allowed ? (
            <iframe
              key={videoId}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title ?? "YouTube video player"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <p className="max-w-md text-sm text-parchment/85">
                You chose not to allow non-essential cookies, so the embedded
                player stays switched off. You can still watch it on YouTube.
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-poster btn-poster--ember landing-focus min-h-11 px-5 py-3 text-xs"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
