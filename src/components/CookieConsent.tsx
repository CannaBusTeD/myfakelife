import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import cookiesAsset from "@/assets/site/cookies-message.png.asset.json";
import { readConsent, writeConsent, clearConsent } from "@/lib/cookie-consent";

const NOTE_TEXT =
  "Cookies? Fancy one? We use cookies to remember your cookie choice and, if you choose Accept, to recognise this browser across the connected CannaBusTeD websites under cannabusted.com. Choose Accept to allow it, or Reject to carry on without it — the site works exactly the same either way.";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const allowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (readConsent() !== null) return;
    // wait for the curtain intro to finish, if it's playing this session
    let introPlaying = true;
    try {
      introPlaying = sessionStorage.getItem("mfl_intro_played") !== "1";
    } catch {
      /* noop */
    }
    const t = window.setTimeout(() => setOpen(true), introPlaying ? 5200 : 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("mfl-consent-reopen", reopen);
    return () => window.removeEventListener("mfl-consent-reopen", reopen);
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

  const withdraw = () => {
    clearConsent();
    setShowInfo(false);
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v || setOpen(v)}>
        <DialogContent
          onEscapeKeyDown={() => choose("rejected")}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="max-w-[min(94vw,620px)] border-none bg-transparent p-0 shadow-none sm:max-w-[min(90vw,620px)] [&>button]:hidden"
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
              <span className="sr-only">Accept cookies</span>
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
              Accept
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
            A plain-English explanation of the cookies these sites use and how
            to change or withdraw your choice.
          </DialogDescription>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto text-sm leading-relaxed text-foreground">
            <p>
              We use cookies to remember your cookie choice and, if you choose
              Accept, to recognise this browser across the connected
              CannaBusTeD websites under cannabusted.com — My Fake Love, My
              Fake Laugh, My Fake Book, My Fake Life and My Fake Voice.
            </p>
            <p>
              This lets us understand how visitors move through the connected
              sites, what parts are used, and make the experience more
              relevant. We use an anonymous browser identifier for this
              purpose; it is not intended to identify you personally. We do not
              sell this information to advertisers.
            </p>
            <p>
              If you choose Reject, we do not use optional tracking and the
              sites remain available normally. Your choice lasts for 12 months,
              unless you clear your browser data or withdraw or change your
              choice sooner. You can withdraw consent at any time.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Your cookie choice</strong> — stored so this note
                doesn't ask you again, and shared across the connected sites.
                Essential.
              </li>
              <li>
                <strong>Anonymous browser identifier</strong> — only created if
                you choose Accept, and removed if you reject or withdraw.
                Optional.
              </li>
              <li>
                <strong>Intro curtain</strong> — a single flag in session
                storage so the opening animation only plays once per visit. It
                disappears when you close the tab. Essential.
              </li>
              <li>
                <strong>Embedded YouTube videos</strong> — held back until you
                choose Accept. Choose Reject and videos open on YouTube in a
                new tab instead.
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
          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={withdraw}
              className="landing-focus min-h-11 px-3 py-3 text-xs underline text-parchment/90"
            >
              Withdraw / change my choice
            </button>
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="btn-poster landing-focus min-h-11 px-5 py-3 text-xs"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
