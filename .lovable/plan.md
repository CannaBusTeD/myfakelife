# Donation message modal

## Goal
Turn the uploaded `Donate_Message_Button_2.png` into a site-wide donation message that opens as a modal when any DonaTeD / tip button is pressed.

## Requirements (confirmed)
- Trigger: the existing DonaTeD button on `/album` should open the message instead of going straight to PayPal.
- Content: use the uploaded image directly inside the modal.
- Reach: a DonaTeD / tip trigger should be available on every page (`/`, `/album`, `/listen`, `/guide/how-to-make-a-concept-album`, `/how-to-build-a-world`).
- Actions inside the modal:
  - "Leave a tip" → opens `https://paypal.me/CannaBusTeD` in a new tab.
  - "Not today" / backdrop click / Escape → closes the modal.

## Plan

1. **Add the uploaded image as a Lovable asset**
   - Run `lovable-assets create` for `Donate_Message_Button_2.png` and save the pointer to `src/assets/site/donate-message.png.asset.json`.

2. **Create `src/components/DonateModal.tsx`**
   - Use the existing shadcn `Dialog` primitive for accessibility (focus trap, Escape close, aria attributes).
   - Compose a dark, cinematic modal backdrop consistent with the site palette.
   - Display the uploaded donate message image as the modal content.
   - Add two accessible controls:
     - Primary "Leave a tip" button → `window.open('https://paypal.me/CannaBusTeD', '_blank')`.
     - Secondary "Not today" button → closes the dialog.
   - Make the image itself decorative with descriptive `alt` text, and include `aria-live` / screen-reader friendly labels for the actions.

3. **Create `src/components/DonateButton.tsx`**
   - A reusable trigger that opens `DonateModal`.
   - Support two presentation modes:
     - `image` — the existing `donated.png` image (used on `/album`).
     - `text` — a small "DonaTeD" / "Fuel the bus" styled button for other pages.
   - Ensure visible focus states and an `aria-label`.

4. **Replace the direct PayPal link on `/album`**
   - In the secret-doorway section, swap the `<a href="https://paypal.me/CannaBusTeD">` image for `<DonateButton variant="image" />`.

5. **Add a DonaTeD trigger to the remaining pages**
   - `/listen` — place a text `DonateButton` near the "Free return ticket" section.
   - `/how-to-build-a-world` — place a text `DonateButton` at the end of the guide, before the back link.
   - `/guide/how-to-make-a-concept-album` — place a text `DonateButton` at the end of the article, before the back link.
   - `/` (landing) — place a compact text `DonateButton` below the small book button at the bottom of the landing choices.

6. **Verify**
   - Run `tsgo` to confirm type safety.
   - Check in the preview that:
     - pressing any DonaTeD button opens the modal with the image;
     - "Leave a tip" opens PayPal in a new tab;
     - "Not today", Escape, and backdrop click close the modal.

## Technical notes
- Keep using the existing shadcn `Dialog` from `src/components/ui/dialog.tsx` rather than hand-rolling a modal, so ARIA/focus behaviour stays correct.
- The PayPal URL will be stored as a constant inside `DonateModal.tsx` (or exported from `src/data/social.ts` if it makes reuse easier).
- No new routes or backend changes are needed; this is a client-side modal only.
