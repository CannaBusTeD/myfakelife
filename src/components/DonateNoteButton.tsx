import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import noteAsset from "@/assets/site/donate-message.png.asset.json";

export const DONATE_URL = "https://paypal.me/CannaBusTeD";

const NOTE_TEXT =
  "Everything here is given freely. Take the music. Keep it. Share it. There's no price on the door. But if you'd like to help me keep making strange little worlds like this one, you can leave a little fuel for the bus. It's appreciated, never expected. Nothing here is locked — every download stays free either way.";

type Props = {
  /** The visible trigger content (image, text, whatever the page already used). */
  children: ReactNode;
  /** Class applied to the trigger button. */
  className?: string;
  triggerLabel?: string;
};

export function DonateNoteButton({
  children,
  className,
  triggerLabel = "Support CannaBusTeD — opens a note about leaving a tip",
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  // Move focus into the dialog, and back to the trigger on close.
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => tipRef.current?.focus(), 60);
      wasOpen.current = true;
      return () => window.clearTimeout(t);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label={triggerLabel}
          className={className}
        >
          {children}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[min(94vw,900px)] border-none bg-transparent p-0 shadow-none sm:max-w-[min(92vw,900px)]">
        <DialogTitle className="sr-only">
          A note from CannaBusTeD about tipping
        </DialogTitle>
        <DialogDescription className="sr-only">{NOTE_TEXT}</DialogDescription>

        <div className="relative w-full">
          {/* Handwritten note artwork — described by the dialog text above */}
          <img
            src={noteAsset.url}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="block h-auto w-full select-none drop-shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
          />

          {/* Real controls overlaid on the drawn buttons */}
          <a
            ref={tipRef}
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="landing-focus absolute left-[17%] top-[70%] flex h-[20%] w-[34%] items-center justify-center rounded-md"
          >
            <span className="sr-only">Leave a tip — opens PayPal in a new tab</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="landing-focus absolute left-[54%] top-[70%] flex h-[20%] w-[30%] items-center justify-center rounded-md"
          >
            <span className="sr-only">Not today — close this note</span>
          </button>
        </div>

        {/* Always-visible text controls for small screens and clarity */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:hidden">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-poster btn-poster--ember landing-focus min-h-11 px-6 py-3 text-xs"
          >
            Leave a tip
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-poster landing-focus min-h-11 px-6 py-3 text-xs"
          >
            Not today
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
