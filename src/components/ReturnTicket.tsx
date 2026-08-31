import { useRef, useState, useEffect } from "react";
import returnTicketImg from "@/assets/site/return-ticket-cutout.png";

export function ReturnTicketButton() {
  const [ticketOpen, setTicketOpen] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (ticketOpen && !wasOpenRef.current) {
      firstFieldRef.current?.focus();
    } else if (!ticketOpen && wasOpenRef.current) {
      buttonRef.current?.focus();
    }
    wasOpenRef.current = ticketOpen;
  }, [ticketOpen]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={ticketOpen}
          aria-controls="return-ticket-form"
          onClick={() => setTicketOpen((v) => !v)}
          className="landing-focus group inline-block rounded-sm overflow-hidden transition-transform hover:scale-[1.02] focus-visible:scale-[1.02]"
        >
          <span className="sr-only">
            Free return ticket{" "}
            {ticketOpen
              ? "(form open, press to close)"
              : "(press to open form)"}
          </span>
          <img
            src={returnTicketAsset.url}
            alt=""
            aria-hidden="true"
            className="block w-full max-w-md h-auto select-none"
            draggable={false}
          />
        </button>
      </div>

      {ticketOpen && (
        <form
          id="return-ticket-form"
          action="https://cannabusted.us8.list-manage.com/subscribe/post?u=a8448f9c89e80a0fa55313ab9&id=ca871d90ba&f_id=006166e1f0"
          method="post"
          target="_blank"
          noValidate
          className="mt-8 flex flex-col gap-5 text-left"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="mce-FNAME"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment/90"
            >
              First name
            </label>
            <input
              ref={firstFieldRef}
              id="mce-FNAME"
              type="text"
              name="FNAME"
              autoComplete="given-name"
              className="landing-focus w-full min-h-[48px] px-4 py-3 rounded-sm border border-border/70 bg-background/40 backdrop-blur-sm text-parchment placeholder:text-parchment/40 font-display text-base focus:border-ember outline-none"
              placeholder="Ted"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="mce-EMAIL"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment/90"
            >
              Email address <span className="text-ember">*</span>
            </label>
            <input
              id="mce-EMAIL"
              type="email"
              name="EMAIL"
              autoComplete="email"
              required
              className="landing-focus w-full min-h-[48px] px-4 py-3 rounded-sm border border-border/70 bg-background/40 backdrop-blur-sm text-parchment placeholder:text-parchment/40 font-display text-base focus:border-ember outline-none"
              placeholder="you@somewhere.com"
            />
          </div>

          {/* Mailchimp anti-spam honeypot */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-5000px" }}
          >
            <input
              type="text"
              name="b_a8448f9c89e80a0fa55313ab9_ca871d90ba"
              tabIndex={-1}
              defaultValue=""
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <button
              type="submit"
              name="subscribe"
              className="btn-poster btn-poster--ember landing-focus text-sm sm:text-base tracking-[0.35em] px-8 py-4"
            >
              Get my return ticket
            </button>
            <button
              type="button"
              onClick={() => setTicketOpen(false)}
              className="landing-quiet-link landing-focus font-mono text-[11px] uppercase tracking-[0.3em] text-parchment/70 hover:text-ember"
            >
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
