import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import cookiesAsset from "@/assets/site/cookies-message.png.asset.json";
import { readConsent, writeConsent } from "@/lib/cookie-consent";

const NOTE_TEXT =
  "Cookies? Fancy one? We use small cookies to help us understand how people visit these pages. Nothing weird. Nothing personal. Just a little help for a better journey. Choose Allow to accept, or Reject to carry on without them — the site works exactly the same either way.";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const allowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (readConsent() === null) {
      // let the curtain intro settle first
      const t = window.setTimeout(() => setOpen(true), 1200);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => allowRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  const choose = (c: "allowed" | "rejected") => {
    writeConsent(c);
    setShowInfo(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v || setOpen(v)}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          showCloseButton={false}
          className="max-w-[min(94vw,620px)] border-none bg-transparent p-0 shadow-none sm:max-w-[min(90vw,620px)]"
        >
          <DialogTitle className="sr-only">Cookies on My Fake Life</DialogTitle>
          <DialogDescription className="sr-only">{NOTE_TEXT}</DialogDescription>

          <div className="relative w-full">
            <img
              src={cookiesAsset.url}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="block h-auto w-full select-none"
            />

            {/* Real controls sitting on the drawn ALLOW / REJECT panels */}
            <button
              ref={allowRef}
              type="button"
              onClick={() => choose("allowed")}
              className="landing-focus absolute left-[16%] top-[65%] h-[16%] w-[33%] rounded-md"
            >
              <span className="sr-only">Allow cookies</span>
            </button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="landing-focus absolute left-[53%] top-[65%] h-[16%] w-[31%] rounded-md"
            >
              <span className="sr-only">Reject cookies</span>
            </button>
            <button
              type="button"
              onClick={() => setShowInfo(true)}
              className="landing-focus absolute left-[26%] top-[83%] h-[7%] w-[42%] rounded-md"
            >
              <span className="sr-only">How we use cookies</span>
            </button>
          </div>

          {/* Always-visible controls for small screens / clarity */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => choose("allowed")}
              className="btn-poster btn-poster--ember landing-focus min-h-11 px-5 py-3 text-xs"
            >
              Allow
            </button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="btn-poster landing-focus min-h-11 px-5 py-3 text-xs"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => setShowInfo(true)}
              className="landing-focus min-h-11 px-3 py-3 text-xs underline text-parchment/90"
            >
              How we use cookies
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="max-w-[min(94vw,560px)]">
          <DialogTitle>How we use cookies</DialogTitle>
          <DialogDescription className="sr-only">
            A plain-English list of the storage this site actually uses.
          </DialogDescription>
          <div className="space-y-4 text-sm leading-relaxed text-foreground">
            <p>
              Plain English: this site sets no advertising cookies and runs no
              analytics or tracking scripts of its own. Here's everything it
              actually stores:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Your cookie choice</strong> — kept in your browser's
                local storage so this note doesn't ask you again. Essential.
              </li>
              <li>
                <strong>Intro curtain</strong> — a single flag in session
                storage so the opening animation only plays once per visit. It
                disappears when you close the tab. Essential.
              </li>
              <li>
                <strong>Embedded YouTube videos</strong> — the only
                non-essential item. Videos use YouTube's privacy-enhanced
                (no-cookie) player, and it still only loads if you choose
                Allow. Choose Reject and videos open on YouTube in a new tab
                instead.
              </li>
              <li>
                <strong>Mailchimp sign-up</strong> — only if you fill in the
                return-ticket form and submit it. Nothing is stored until then.
              </li>
            </ul>
            <p>
              Rejecting changes nothing else. Every page, download and link
              stays fully available.
            </p>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="btn-poster landing-focus min-h-11 px-5 py-3 text-xs"
            >
              Back
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
