import { createFileRoute, Link } from "@tanstack/react-router";
import { AlbumPlayer } from "@/components/AlbumPlayer";
import { Gallery } from "@/components/Gallery";
import { LyricBook } from "@/components/LyricBook";
import { SocialIconButtons } from "@/components/SocialIconButtons";
import { SecretVoiceTile } from "@/components/SecretVoiceTile";
import { ReturnTicketButton } from "@/components/ReturnTicket";
import { DonateNoteButton } from "@/components/DonateNoteButton";
import heroAsset from "@/assets/site/hero-portrait.png.asset.json";
import signalAsset from "@/assets/site/signal-room.png.asset.json";
import albumCover from "@/assets/site/album-cover.png.asset.json";
import innerSleeve from "@/assets/site/inner-sleeve.png.asset.json";
import albumBanner from "@/assets/site/album-banner.png.asset.json";
import tracklistPoster from "@/assets/site/tracklist-poster.png.asset.json";
import donatedAsset from "@/assets/site/donated.png.asset.json";
import busAsset from "@/assets/site/ted-on-tour.png.asset.json";
import bookAsset from "@/assets/site/still-life-book.png.asset.json";
import toolboxAsset from "@/assets/site/teds-toolbox.png.asset.json";


export const Route = createFileRoute("/album")({
  head: () => ({
    meta: [
      { title: "My Fake Life — The Album · CannaBusTeD" },
      {
        name: "description",
        content:
          "My Fake Life — a 23-track concept album from CannaBusTeD. Songs, videos, lyrics, artwork and the odd uncomfortable truth.",
      },
      { property: "og:title", content: "My Fake Life Album — CannaBusTeD" },
      {
        property: "og:description",
        content:
          "Step inside a strange little world of music, masks, memory, humour and hurt. A 23-track concept album from CannaBusTeD.",
      },
      { property: "og:type", content: "music.album" },
      { property: "og:url", content: "https://cannabusted.com/album" },
      { property: "og:image", content: `https://cannabusted.com${heroAsset.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "My Fake Life Album — CannaBusTeD" },
      {
        name: "twitter:description",
        content:
          "Step inside a strange little world of music, masks, memory, humour and hurt. A 23-track concept album from CannaBusTeD.",
      },
      { name: "twitter:image", content: `https://cannabusted.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://cannabusted.com/album" }],
  }),
  component: AlbumSite,
});

function AlbumSite() {
  return (
    <div className="relative min-h-screen text-foreground overflow-x-clip">
      {/* Top nav */}
      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between gap-3">
          <a href="#top" className="font-display text-xl tracking-wide text-parchment shrink-0">
            CannaBus<span className="text-ember">TeD</span>
          </a>
          <nav className="hidden sm:flex gap-7 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <a href="#tracks" className="hover:text-ember transition">Listen</a>
            <a href="#gallery" className="hover:text-ember transition">Videos</a>
            <a href="#lyricbook" className="hover:text-ember transition">My Fake Lyrics</a>
            <a href="#about" className="hover:text-ember transition">About</a>
            <a href="#press" className="hover:text-ember transition">Press</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative z-10">
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
          <div className="relative rounded-sm overflow-hidden ring-1 ring-border/60">
            <img
              src={heroAsset.url}
              alt="CannaBusTeD — writer at a worn desk in red glasses, lighthouse and harbor receding behind him"
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 vignette pointer-events-none" />
          </div>
          <div className="absolute inset-x-0 bottom-3 sm:bottom-10 flex justify-center pointer-events-none px-3">
            <div className="font-mono text-[10px] sm:text-xs tracking-[0.5em] uppercase text-parchment/80 bg-background/40 backdrop-blur px-4 py-2 rounded-sm border border-border/60 text-center">
              Musician · Writer · Storyteller
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center mt-10 sm:mt-16">
          <p className="font-script text-ember text-2xl">welcome to</p>
          <h1 className="font-display text-5xl sm:text-7xl text-parchment mt-2 tracking-tight text-balance">
            My Fake Life
          </h1>
          <div className="ink-rule w-40 mx-auto my-6" />
          <p className="font-display text-lg sm:text-xl text-parchment/85 leading-relaxed text-balance italic">
            Step inside a strange little world of music, masks, memory, humour and hurt.
            <span className="not-italic"> My Fake Life</span> is a 23-track concept album built from
            songs, videos, lyrics, artwork — and the odd uncomfortable truth.
          </p>

          {/* Main worn-poster buttons */}
          <div className="mt-9 flex flex-wrap gap-3 sm:gap-4 justify-center">
            <a href="#gallery" className="btn-poster">▶ Watch the videos</a>
            <a href="#tracks" className="btn-poster btn-poster--ember">♪ Listen to the album</a>
            <a href="#about" className="btn-poster">✎ Read the story</a>
          </div>

          {/* Platform buttons */}
          <div className="mt-7">
            <SocialIconButtons />
          </div>
        </div>
      </section>

      {/* Album panel */}
      <section id="album" className="relative z-10 max-w-6xl mx-auto px-5 mt-24 sm:mt-32">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
          <div className="relative">
            <img
              src={albumBanner.url}
              alt="My Fake Life — double album banner: two figures, worn wall, scattered lyric fragments and stage curtains"
              className="w-full h-auto shadow-2xl ring-1 ring-oxblood/40"
            />
            <div className="absolute -inset-3 -z-10 bg-gradient-to-br from-oxblood/40 to-transparent blur-2xl" />
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
              The Album
            </div>
            <h2 className="font-display text-4xl sm:text-5xl mt-2 text-parchment text-balance">
              Every version of me, moving through the bruise.
            </h2>
            <div className="ink-rule w-32 my-6" />
            <p className="text-parchment/80 leading-relaxed text-lg">
              <em>My Fake Life</em> is a record about being caught — by mirrors, by memory, by the
              quieter things that watch when no one is supposed to be watching. It moves between the
              accusation and the apology, the laugh and the wound, the easy way and the hard way,
              until the mask slips and what is left is the song.
            </p>
            <p className="text-parchment/70 leading-relaxed mt-4">
              Recorded between rooms. Mixed by candle. Mastered for the late hour.
            </p>
            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <dt className="text-muted-foreground uppercase tracking-[0.25em] text-[10px]">Tracks</dt>
                <dd className="text-parchment text-lg mt-1">23</dd>
              </div>
              <div>
                <dt className="text-muted-foreground uppercase tracking-[0.25em] text-[10px]">Artist</dt>
                <dd className="text-parchment text-lg mt-1">CannaBusTeD</dd>
              </div>
              <div>
                <dt className="text-muted-foreground uppercase tracking-[0.25em] text-[10px]">Era</dt>
                <dd className="text-parchment text-lg mt-1">2026</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Tracklist (moved ABOVE gallery) */}
      <section id="tracks" className="relative z-10 max-w-5xl mx-auto px-5 mt-24 sm:mt-32 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
            Signal Routing
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-parchment">The Tracklist</h2>
          <p className="font-script text-ember text-xl mt-1">listen close, the room is listening back</p>
        </div>
        <AlbumPlayer />

        {/* Tracklist poster — rear cover hallway with sides A/B/C/D */}
        <figure className="mt-14 sm:mt-20 mx-auto max-w-3xl">
          <div className="relative ring-1 ring-border/60 shadow-2xl overflow-hidden bg-card">
            <img
              src={tracklistPoster.url}
              alt="My Fake Life — tracklist hallway: framed Side A/B/C/D listings on worn wallpaper"
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 vignette pointer-events-none" />
          </div>
          <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            The Descent · The Release — Sides A / B / C / D
          </figcaption>
        </figure>
      </section>

      {/* Video Gallery (now AFTER tracklist) */}
      <section id="gallery" className="relative z-10 max-w-6xl mx-auto px-5 mt-24 sm:mt-32 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
            Watch The Videos
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-parchment">The Gallery</h2>
          <p className="font-script text-ember text-xl mt-1">every cover is a doorway</p>
        </div>
        <Gallery />

        {/* Inner sleeve — moved here, after the gallery */}
        <figure className="mt-14 sm:mt-20 mx-auto max-w-3xl">
          <div className="relative ring-1 ring-border/60 shadow-2xl overflow-hidden bg-card">
            <img
              src={innerSleeve.url}
              alt="My Fake Life — inner sleeve: a figure at a worn vanity mirror surrounded by handwritten lyric fragments"
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 vignette pointer-events-none" />
          </div>
          <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Inner Sleeve — the room behind the mirror
          </figcaption>
        </figure>
      </section>

      {/* My Fake Lyrics — horizontal */}
      <section id="lyricbook" className="relative z-10 mt-24 sm:mt-32 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 text-center mb-10">
          <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
            Inside The Album
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-parchment">My Fake Lyrics</h2>
          <p className="font-script text-ember text-xl mt-1">turn the pages — the room turns with you</p>
        </div>
        <LyricBook />
      </section>

      {/* About */}
      <section id="about" className="relative z-10 mt-28 sm:mt-36 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="relative rounded-sm overflow-hidden ring-1 ring-border/60">
            <img
              src={signalAsset.url}
              alt="CannaBusTeD inside a signal room of dials, lanterns, typewriters and maps"
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 vignette pointer-events-none" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-6 mt-12">
          <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted-foreground text-center">
            The Bus is now boarding
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-parchment text-center text-balance">
            Songs, Stories, Signals.
          </h2>
          <div className="ink-rule w-32 mx-auto my-6" />
          <div className="space-y-5 text-parchment/85 leading-relaxed text-lg">
            <p>
              <span className="font-script text-ember text-2xl">CannaBusTeD</span> writes from the
              edge of a room nobody else bothered to turn the lamp on in. The songs arrive the way
              weather does — late, certain, smelling of where they have been.
            </p>
            <p>
              He has spent most of his life noticing what passes for ordinary, and refusing to let it.
              The songs on <em>My Fake Life</em> were written across nights, journeys, kitchens and
              corridors — wherever a small honest sentence could be coaxed into staying still long
              enough to be sung.
            </p>
            <p>
              The Bus is a way of travelling between them. It carries the signal. It boards anyone
              who is listening.
            </p>
          </div>
        </div>
      </section>

      {/* Secret doorway — The Voice */}
      <section aria-label="Hidden route" className="relative z-10 max-w-6xl mx-auto px-5 mt-24 sm:mt-32">
        <div className="grid gap-6 items-center md:grid-cols-[minmax(0,1fr)_280px] md:gap-10">
          <div className="flex justify-center md:justify-end">
            <SecretVoiceTile
              variant="doorway"
              label="There's Another Door"
              caption="An unlisted route · The Voice"
            />
          </div>
          <div className="relative flex flex-col items-center gap-5 md:items-start">
            <a
              href="mailto:CannaBusTeD@icloud.com"
              aria-label="Email CannaBusTeD"
              className="btn-floating-note md:-rotate-2"
            >
              <span className="font-script text-2xl leading-none text-ember">Contact TeD</span>
              <span className="text-sm text-parchment/80">CannaBusTeD@icloud.com</span>
            </a>
            <DonateNoteButton
              triggerLabel="DoNaTeD — support CannaBusTeD, opens a note about leaving a tip"
              className="landing-focus block w-40 sm:w-48 transition-transform hover:scale-[1.03] focus-visible:scale-[1.03] md:ml-6 md:rotate-[-2deg]"
            >
              <img
                src={donatedAsset.url}
                alt=""
                aria-hidden="true"
                className="block w-full h-auto select-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                draggable={false}
              />
            </DonateNoteButton>
            <div className="w-full max-w-[220px]">
              <ReturnTicketButton />
            </div>
            <a
              href="https://myfakelove.cannabusted.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ted on Tour — open myfakelove.cannabusted.com"
              className="landing-focus block w-full max-w-sm transition-transform hover:scale-[1.02] focus-visible:scale-[1.02]"
            >
              <img
                src={busAsset.url}
                alt="Ted on Tour — vintage tour bus destined for Hartlepool"
                className="block w-full h-auto select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
                draggable={false}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Quotable Lyric Tag Lines */}
      <section id="press" className="relative z-10 max-w-5xl mx-auto px-5 mt-28 sm:mt-36 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
            From The Album
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-parchment">Quotable Lyric Tag Lines</h2>
          <p className="font-script text-ember text-xl mt-1">lines that wouldn't leave the room</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { q: "So I smile like a forged signature, and the nasty little miracle is, I mean it.", t: "— My Fake Life I" },
            { q: "I was never hard to love. I was hard to counterfeit.", t: "— Where I Fit" },
            { q: "I lead with the worst of me, so the leaving feels chosen.", t: "— Everybody Has Nobody" },
            { q: "Hear them out, hold them loose. A voice can knock without becoming law.", t: "— Hold Them Loose" },
            { q: "The grave gets smaller once you've slept in it twice.", t: "— Died Too Many Times" },
            { q: "The only animal stupid enough to know it dies — and still shows up on Tuesday.", t: "— Here's The Joke" },
            { q: "The song disappears into what it disturbed — and the disturbance keeps singing.", t: "— The Legacy" },
          ].map((c, i) => (
            <figure
              key={c.q}
              className={`wallpaper-panel rounded-sm p-6 relative ${i === 6 ? "sm:col-span-2 justify-self-center max-w-md" : ""}`}
            >
              <div className="absolute inset-0 vignette pointer-events-none" />
              <blockquote className="font-script text-xl text-parchment/95 leading-snug">
                “{c.q}”
              </blockquote>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-parchment/75">
                {c.t}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* The books — cross-link doorway */}
      <section id="books" className="relative z-10 max-w-3xl mx-auto px-5 mt-28 sm:mt-36 scroll-mt-20">
        <div className="relative flex flex-col items-center text-center gap-6">
          <a
            href="https://myfakebook.cannabusted.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read the books — opens the My Fake Book site in a new tab"
            className="landing-focus block"
          >
            <img
              src={bookAsset.url}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="relative w-40 sm:w-[280px] h-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)] transition-transform duration-500 motion-safe:hover:scale-[1.03] motion-reduce:transition-none"
            />
          </a>
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl text-parchment text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              There's a book on the seat.
            </h2>
            <p className="mt-3 text-parchment/85 leading-relaxed text-lg text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Two novellas set in the same town as the songs. Free to read online.
            </p>
          </div>
          <a
            href="https://myfakebook.cannabusted.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read the books — opens the My Fake Book site in a new tab"
            className="btn-poster btn-poster--ember landing-focus relative min-h-11 px-8 py-4 text-base"
          >
            Read the Books
          </a>
        </div>

      </section>

      {/* TeD's Toolbox — final stop */}
      <section
        id="toolbox"
        aria-labelledby="toolbox-heading"
        className="relative z-10 max-w-3xl mx-auto px-5 mt-28 sm:mt-36 scroll-mt-20"
      >
        <div className="flex flex-col items-center text-center gap-5">
          <p className="font-script text-ember text-2xl sm:text-3xl">
            Want to build your own world?
          </p>
          <Link
            to="/how-to-build-a-world"
            aria-label="Open How to Build a World"
            className="landing-focus block"
          >
            <img
              src={toolboxAsset.url}
              alt="Old battered toolbox labelled TeD's Toolbox"
              loading="lazy"
              className="w-48 sm:w-72 h-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)] transition-transform duration-500 motion-safe:hover:scale-[1.03] motion-reduce:transition-none"
            />
          </Link>
          <div>
            <h2
              id="toolbox-heading"
              className="font-display text-3xl sm:text-4xl text-parchment drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              TeD&apos;s Toolbox
            </h2>
            <p className="mt-2 text-parchment/85 text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              How to build your own world
            </p>
          </div>
          <Link
            to="/how-to-build-a-world"
            aria-label="Open How to Build a World"
            className="btn-poster btn-poster--ember landing-focus min-h-11 px-8 py-4 text-base"
          >
            Open the Toolbox
          </Link>
        </div>
      </section>



      {/* Footer */}

      <footer className="relative z-10 mt-32 border-t border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-6 items-center text-center">
          <div className="font-display text-2xl text-parchment">
            CannaBus<span className="text-ember">TeD</span>
          </div>
          <div className="font-script text-ember text-xl -mt-2">My Fake Life</div>
          <SocialIconButtons />
          <div className="flex flex-wrap justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <a href="#tracks" className="hover:text-ember">Listen</a>
            <a href="#gallery" className="hover:text-ember">Watch</a>
            <a href="#lyricbook" className="hover:text-ember">My Fake Lyrics</a>
            <a href="#about" className="hover:text-ember">About</a>
            <a href="#press" className="hover:text-ember">Press</a>
            <Link to="/how-to-build-a-world" className="hover:text-ember">How To</Link>
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            <Link to="/how-to-build-a-world" className="hover:text-ember">
              How to Build a World
            </Link>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground opacity-70">
            © CannaBusTeD · Songs · Stories · Signals
          </div>
        </div>
      </footer>
    </div>
  );
}
