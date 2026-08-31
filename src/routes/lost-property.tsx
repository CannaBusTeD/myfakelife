import { createFileRoute, Link } from "@tanstack/react-router";
import landingBg from "@/assets/site/landing-background.png.asset.json";
import ticketAsset from "@/assets/site/return-ticket.png.asset.json";
import doorAsset from "@/assets/site/secret-door.png.asset.json";
import busAsset from "@/assets/site/voice-bus.png.asset.json";
import tourAsset from "@/assets/site/ted-on-tour.png.asset.json";
import innerSleeve from "@/assets/site/inner-sleeve.png.asset.json";
import signalAsset from "@/assets/site/signal-room.png.asset.json";
import coverFront from "@/assets/lyricbook/cover-front.png.asset.json";
import page20b from "@/assets/lyricbook/page-20b.png.asset.json";
import page20c from "@/assets/lyricbook/page-20c.png.asset.json";
import page22b from "@/assets/lyricbook/page-22b.png.asset.json";
import pdfAsset from "@/assets/docs/how-to-build-a-world.pdf.asset.json";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";

const SITE_URL = "https://cannabusted.com";
const URL = `${SITE_URL}/lost-property`;
const TITLE = "Lost Property | My Fake Life · CannaBusTeD";
const DESCRIPTION =
  "The small back room of My Fake Life: stray artwork, spilled lyric pages, unmarked side roads and the things that never made it onto the main route.";

export const Route = createFileRoute("/lost-property")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Lost Property — My Fake Life" },
      {
        property: "og:description",
        content:
          "A packed little room of found things from My Fake Life: stray artwork, spilled lyric pages and unmarked side roads.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE_URL}${innerSleeve.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lost Property — My Fake Life" },
      {
        name: "twitter:description",
        content:
          "A packed little room of found things from My Fake Life: stray artwork, spilled lyric pages and unmarked side roads.",
      },
      { name: "twitter:image", content: `${SITE_URL}${innerSleeve.url}` },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LostPropertyPage,
});

type Found = {
  id: string;
  src: string;
  alt: string;
  tag: string;
  title: string;
  note: string;
  tilt: string;
};

const ARTWORK: Found[] = [
  {
    id: "ticket",
    src: ticketAsset.url,
    alt: "The original return ticket artwork, printed on a black card",
    tag: "Shelf one",
    title: "The first return ticket",
    note: "The original printing, before it was cut out of its black card. Kept because somebody had to.",
    tilt: "-1.4deg",
  },
  {
    id: "cover-front",
    src: coverFront.url,
    alt: "Earlier front cover artwork for the lyric book",
    tag: "Shelf one",
    title: "The earlier book cover",
    note: "Now the introduction page of My Fake Lyrics. It used to be the front door.",
    tilt: "1.1deg",
  },
  {
    id: "sleeve",
    src: innerSleeve.url,
    alt: "Inner sleeve artwork: a figure at a worn vanity mirror surrounded by handwritten lyric fragments",
    tag: "Shelf two",
    title: "Inner sleeve",
    note: "The mirror room. Lyric fragments taped to the glass, most of them never sung out loud.",
    tilt: "-0.8deg",
  },
  {
    id: "signal",
    src: signalAsset.url,
    alt: "The signal room artwork: dials, wires and a waiting transmitter",
    tag: "Shelf two",
    title: "The signal room",
    note: "Where the broadcasts came from. Still humming, nobody at the desk.",
    tilt: "1.5deg",
  },
  {
    id: "tour",
    src: tourAsset.url,
    alt: "TeD on tour — a worn touring bus poster",
    tag: "Shelf three",
    title: "TeD on tour",
    note: "A tour that only ever happened in the artwork.",
    tilt: "-1.1deg",
  },
];

const STRAY_PAGES: Found[] = [
  {
    id: "page-20b",
    src: page20b.url,
    alt: "Lyric book page: My Fake Life II, continued",
    tag: "Overflow",
    title: "My Fake Life II — spill",
    note: "The song ran past its page. These are the sheets that had to be added after.",
    tilt: "-1.2deg",
  },
  {
    id: "page-20c",
    src: page20c.url,
    alt: "Lyric book page: My Fake Life II, second continuation",
    tag: "Overflow",
    title: "My Fake Life II — spill, again",
    note: "And then it ran past that one too.",
    tilt: "0.9deg",
  },
  {
    id: "page-22b",
    src: page22b.url,
    alt: "Lyric book page: The Hard Way, continued",
    tag: "Overflow",
    title: "The Hard Way — continued",
    note: "The hard way is always longer than the page you gave it.",
    tilt: "1.3deg",
  },
];

function FoundCard({ item }: { item: Found }) {
  return (
    <figure
      className="wallpaper-panel relative rounded-sm ring-1 ring-border/60 overflow-hidden"
      style={{ transform: `rotate(${item.tilt})` }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="w-full h-auto block"
      />
      <div className="absolute inset-0 vignette pointer-events-none" />
      <figcaption className="relative px-4 py-4 border-t border-border/40">
        <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
          {item.tag}
        </div>
        <div className="font-display text-lg text-parchment leading-tight mt-1 text-balance">
          {item.title}
        </div>
        <p className="mt-2 font-script text-ember text-lg leading-snug">{item.note}</p>
      </figcaption>
    </figure>
  );
}

function LostPropertyPage() {
  return (
    <div className="relative min-h-dvh text-foreground overflow-x-clip">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${landingBg.url})` }}
      />
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-background/85" />

      <main className="relative mx-auto max-w-5xl px-5 py-20 sm:py-28 pb-32">
        <header className="max-w-2xl">
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
            End of the line
          </p>
          <h1 className="font-script text-ember text-4xl sm:text-6xl leading-tight mt-4">
            Lost Property
          </h1>
          <p className="font-display italic text-parchment/85 mt-4 text-lg sm:text-xl leading-relaxed text-balance">
            A small back room behind everything else. Things left on the bus, things that
            fell out of the book, doors nobody signposted.
          </p>
          <p className="mt-4 font-display text-parchment/80 leading-relaxed">
            Nothing here is new. It all belongs to <em>My Fake Life</em> somewhere — it just
            never got a proper shelf.
          </p>
        </header>

        <section aria-labelledby="found-artwork" className="mt-16">
          <h2
            id="found-artwork"
            className="font-display text-2xl sm:text-3xl text-parchment"
          >
            Found artwork
          </h2>
          <div className="ink-rule w-28 my-5" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {ARTWORK.map((item) => (
              <FoundCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="stray-pages" className="mt-20">
          <h2 id="stray-pages" className="font-display text-2xl sm:text-3xl text-parchment">
            Pages that spilled
          </h2>
          <div className="ink-rule w-28 my-5" />
          <p className="font-display text-parchment/80 leading-relaxed max-w-2xl">
            Songs that outgrew their page in{" "}
            <Link to="/album" hash="lyricbook" className="text-ember hover:underline">
              My Fake Lyrics
            </Link>
            . The overflow sheets, on their own for once.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
            {STRAY_PAGES.map((item) => (
              <FoundCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="side-roads" className="mt-20">
          <h2 id="side-roads" className="font-display text-2xl sm:text-3xl text-parchment">
            Unmarked side roads
          </h2>
          <div className="ink-rule w-28 my-5" />
          <ul className="grid sm:grid-cols-2 gap-5 sm:gap-6 list-none p-0">
            <li>
              <a
                href="https://thevoice.cannabusted.com"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-focus group block wallpaper-panel rounded-sm ring-1 ring-border/60 hover:ring-ember/70 transition overflow-hidden h-full"
              >
                <img
                  src={busAsset.url}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-full h-auto block"
                />
                <div className="px-4 py-4 border-t border-border/40">
                  <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-ember/90">
                    Side road
                  </div>
                  <div className="font-display text-lg text-parchment mt-1 group-hover:text-ember transition">
                    The Voice — opens in a new tab
                  </div>
                  <p className="mt-2 font-script text-ember text-lg">
                    the stop with no timetable
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://cloud-creation-crew.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-focus group block wallpaper-panel rounded-sm ring-1 ring-border/60 hover:ring-ember/70 transition overflow-hidden h-full"
              >
                <img
                  src={doorAsset.url}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-full h-auto block"
                />
                <div className="px-4 py-4 border-t border-border/40">
                  <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-ember/90">
                    Side road
                  </div>
                  <div className="font-display text-lg text-parchment mt-1 group-hover:text-ember transition">
                    The door behind the book — opens in a new tab
                  </div>
                  <p className="mt-2 font-script text-ember text-lg">
                    the one at the back of My Fake Lyrics
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="left-behind" className="mt-20">
          <h2 id="left-behind" className="font-display text-2xl sm:text-3xl text-parchment">
            Left on the counter
          </h2>
          <div className="ink-rule w-28 my-5" />
          <div className="flex flex-wrap gap-4">
            <a
              href={pdfAsset.url}
              download="How-to-Build-a-World.pdf"
              aria-label="Download How to Build a World as a PDF"
              className="landing-focus inline-flex items-center justify-center min-h-11 px-6 rounded-sm border border-border/70 bg-background/40 text-parchment hover:border-ember hover:text-ember transition font-mono text-[11px] uppercase tracking-[0.3em]"
            >
              How to Build a World (PDF)
            </a>
            <Link
              to="/how-to-build-a-world"
              className="landing-focus inline-flex items-center justify-center min-h-11 px-6 rounded-sm border border-border/70 bg-background/40 text-parchment hover:border-ember hover:text-ember transition font-mono text-[11px] uppercase tracking-[0.3em]"
            >
              TeD&apos;s Toolbox
            </Link>
          </div>
          <p className="mt-4 font-script text-ember text-xl">
            free, as everything here is
          </p>
        </section>

        <div className="mt-20 flex flex-wrap gap-6">
          <Link
            to="/how-to-build-a-world"
            className="landing-quiet-link landing-focus font-script text-ember text-xl sm:text-2xl"
          >
            ← Back to the toolbox
          </Link>
          <Link
            to="/album"
            className="landing-quiet-link landing-focus font-script text-ember text-xl sm:text-2xl"
          >
            Back to the album
          </Link>
          <Link
            to="/"
            className="landing-quiet-link landing-focus font-script text-ember text-xl sm:text-2xl"
          >
            Back to the door
          </Link>
        </div>

        <div className="mt-10">
          <CookieSettingsLink />
        </div>
      </main>
    </div>
  );
}
