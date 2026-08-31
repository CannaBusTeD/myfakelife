import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import landingBg from "@/assets/site/landing-background.png.asset.json";
import toolbox from "@/assets/site/teds-toolbox.png.asset.json";
import pdfAsset from "@/assets/docs/how-to-build-a-world.pdf.asset.json";

const SITE_URL = "https://cannabusted.com";
const URL = `${SITE_URL}/how-to-build-a-world`;
const TITLE = "How to Build a World | CannaBusTeD";
const DESCRIPTION =
  "A personal eight-step guide from CannaBusTeD showing how one idea becomes a finished world of songs, images, video, books and websites.";

export const Route = createFileRoute("/how-to-build-a-world")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "How to Build a World" },
      {
        property: "og:description",
        content:
          "Eight steps from a single thought to a finished thing. TeD explains how CannaBusTeD builds songs, images, videos, books and websites.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE_URL}${toolbox.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "How to Build a World" },
      {
        name: "twitter:description",
        content:
          "Eight steps from a single thought to a finished thing. TeD explains how CannaBusTeD builds songs, images, videos, books and websites.",
      },
      { name: "twitter:image", content: `${SITE_URL}${toolbox.url}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Build a World",
          description: DESCRIPTION,
          image: `${SITE_URL}${toolbox.url}`,
          author: { "@type": "Person", name: "CannaBusTeD" },
          mainEntityOfPage: URL,
          step: [
            "Find the idea",
            "Peel it back",
            "Get it on the page",
            "Brief the band",
            "Make it a record",
            "Build the world it lives in",
            "Cut it together",
            "Give it a home",
          ].map((name, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name,
            url: `${URL}#step-${i + 1}`,
          })),
        }),
      },
    ],
  }),
  component: HowToPage,
});

type Step = {
  n: number;
  word: string;
  title: string;
  simple: string;
  strap: string;
  body: string[];
};

const STEPS: Step[] = [
  {
    n: 1,
    word: "one",
    title: "Find the idea",
    simple: "The spark turns up whenever it likes. Your only job is to notice it and write it down.",
    strap: "It arrives from anywhere. Your only job is to notice it.",
    body: [
      "Inspiration doesn't book an appointment. I've had ideas turn up scrolling the internet, in the middle of a live, from one word somebody said in passing without knowing they'd said anything at all. Wherever your spark comes from, that moment is the most important one in the whole process, because nothing after it exists without it.",
      "I don't picture a song. I've got a cinema screen in my head, and I write down what's playing on it. Sometimes what's on the screen is a song. Sometimes it's a scene, a story, a picture, a joke. Don't decide what form it takes yet. Just watch it.",
      "And write it down immediately, in whatever half-formed state it's in. You will not remember it later. You will absolutely believe you will. You won't.",
    ],
  },
  {
    n: 2,
    word: "two",
    title: "Peel it back",
    simple: "Learn the idea properly before you write it, then turn it round on your own life.",
    strap: "Don't trust the first version. There's always more inside it.",
    body: [
      "This is the step most people skip, and it's the one that does the work.",
      "Say the idea is a song about stoicism. I sit and talk it through with a large language model — Claude, ChatGPT, Gemini — and I learn it properly. What is stoicism, actually? Who were the philosophers: Marcus Aurelius, Epictetus, Plato? What are the principles underneath it? I keep asking until I genuinely understand it, not until I can pretend to.",
      "Then I turn it round on myself. What does this mean for my life? What does it say to me? Because that's the bit only you can add, and it's the only reason anyone should listen to your version instead of a textbook.",
      "I do this even when the finished thing is fiction. Especially then.",
      "Here's why I bang on about this. Our first assumption is wrong almost every time — we just don't stop long enough to check. Peel the idea back and there's nearly always something better underneath the thing you thought you had. Understand it first. Everything after this is just carrying it.",
    ],
  },
  {
    n: 3,
    word: "three",
    title: "Get it on the page",
    simple: "Talk it, sing it, hear how it lands — then let the tools sharpen it, not write it.",
    strap: "Write it. Sing it. Hear how it lands. Then let the tools sharpen it — not write it.",
    body: [
      "I can't use pen and paper, so the page is a voice. I talk the idea into a large language model and it writes it down and reads it back to me. For the verses, I sit with the guitar and a voice recorder and tinker — mumble lines, try shapes, work it out loud until something holds. Then I feed the recording in and have it transcribed. That's my notebook: a microphone, and something that listens.",
      "Sing it before you're finished with it. Words look fine on a page and fall over in a mouth. You only find that out by opening yours.",
      "Now the important bit. You've got a fully formed song. Great verses, great lines, the best you've ever written. Don't trust yourself. Rule one of Thoughtism: double-check.",
      "So put it in. Every verse, every line. How can I make this line more interesting? What would make this sing better? What words would roll off the tongue easier here? I'm poor at spelling and worse at punctuation — that's honestly how I started using these tools, as a spell checker. Then I realised I could ask for more: give me nouns and verbs that make this more visual. I'm a blind writer putting pictures in front of sighted people, so the visualness has to be deliberate. It doesn't arrive on its own.",
      "And serve the idea, not yourself. If you're a brilliant guitarist, the answer isn't guitar solos forever — nobody's sat waiting for that. Does a solo serve this song? Then put one in. Doesn't? Then don't. Don't let your ego drive your ideas. The idea knows what it needs better than your pride does.",
      "Get it as tight as you can on your own first. The tools sharpen. They don't write it.",
    ],
  },
  {
    n: 4,
    word: "four",
    title: "Brief the band",
    simple: "Give the music direction like you would a session band — and know when the first take is the one.",
    strap: "Suno isn't a jukebox. Treat it like a session band and tell it how to play.",
    body: [
      "You've got a song that sings. Now you want to guide the music. The bass should drop out here. The drums kick in there. Something should start soloing over that bit.",
      "So I take the finished lyrics back to a large language model and ask it to layer them with music direction. In Suno the directions go inside square brackets, sat right beside the lines they belong to, and it doesn't sing those — it plays them. The style prompt goes in its own box, separately.",
      "It won't follow you perfectly. Sometimes it won't follow you at all. But it gives you the vibe, and you aim at it.",
      "Don't settle for the first go. Give it a few. But also — sometimes the first thing out of the box is the one, and no amount of rerolling beats it. Learn to hear that, and take it when it happens. You're not being lazy. You're being right.",
    ],
  },
  {
    n: 5,
    word: "five",
    title: "Make it a record",
    simple: "Pull it into stems, mix it like a real session, then master it — and master it again.",
    strap: "Split it, mix it, break the machine noise into something musical. Then master it. Then master it again.",
    body: [
      "Then I pull it apart. Suno will split the track into stems, and Logic Pro will do it too. Either way, get it into as many separate pieces as you can, because you can only polish what you can hold on its own.",
      "Then treat it like any other session. Cut bits. Add bits. EQ. Effects. Make the bassline sound like the ground roaring up at you — something you feel in the chest. Make the hi-hat sing like a canary. Lift the highs, tuck the lows, lose the hiss.",
      "Here's my favourite trick. AI music comes with wobbles and odd electronic artefacts in it, and everyone's first instinct is to scrub them out. Don't always. Put effects on them instead. Stretch them, drown them in reverb, and suddenly that glitch is an echo, an ethereal space, a room the song is standing in. When something isn't working, twist it until it works in the world you're building.",
      "Then master it in Logic. Then run that master through an auto-mastering tool as well — DistroKid's does me — to push it brighter or heavier depending on what the mix is asking for. Mastering a master is not orthodox. It gets me where I want to be, so I do it.",
      "And this is the step that turns a generated track into a record. Skip it and it sounds exactly like everyone else who skipped it.",
    ],
  },
  {
    n: 6,
    word: "six",
    title: "Build the world it lives in",
    simple: "Make the pictures, then make them move — prompting the emotion of the line, not just the objects in it.",
    strap: "Images, then motion. Prompt the emotion of the line, not just the objects in it.",
    body: [
      "While the mix is going on, I'm building the pictures. Right now I use ChatGPT for images — best there is at the minute. Nano Banana is very good. Midjourney is where I started and it still holds up. For motion, Grok's Imagine gives me the longest clips but is harder to steer; Kling follows direction best; Seedance is where I began, inside CapCut, back when it was called something else entirely.",
      "The line says a woman sits on a hill. So don't just put a woman on a hill.",
      "Then keep it consistent. Colour tone, light, era, texture — this world is its world, not yours. You're just the constructive little elf who builds it.",
      "Then take those images into an image-to-video tool and describe how each one moves. What happens in the scene. Set the emotion again — the emotion of the exact line this clip is going to sit under. Always aim at the idea. Always aim at making the idea better.",
      "And not everything has to become a song. Sometimes it's a poem. Sometimes it's only images, telling the story on their own. Sometimes it's both.",
    ],
  },
  {
    n: 7,
    word: "seven",
    title: "Cut it together",
    simple: "Align picture to music until they move as one thing, then send it out at full quality.",
    strap: "Align picture to music until they're moving as one thing, then send it out at full quality.",
    body: [
      "CapCut. Animated clips on the timeline, song laid underneath, then align the two — cut by cut, beat by beat, until the picture is moving with the music instead of near it. That gap between with and near is most of the job.",
      "Then export and upscale to 4K, so it goes out looking like you meant it. Write the lyrics out. Write what the song is actually about. Hashtags. Post it.",
      "That's a finished thing. And it's never finished — there's always one more fix, one more click you can hear that nobody else will. Ted goes out for daffodils at the end of the story because his painting is done for everyone except him. That's the job. But build a decent workflow and you'll have fewer of those moments, because you'll have caught the click before it ever got in. I used to leave them. It's only a click. Ten years later it's still there and it's all I can hear.",
    ],
  },
  {
    n: 8,
    word: "eight",
    title: "Give it a home",
    simple: "Build somewhere to send people — prompt by prompt — and build it so everyone can get in.",
    strap: "Somewhere to send people. Built by asking, prompt by prompt, and built so everyone can get in.",
    body: [
      "I did all of the above for a year. Then one of them went — briefly, tens of thousands of views — and people started asking for the album. Which I had nowhere to send them for. Then YouTube pinched my channel off me, but that's a different story and I've been told to keep the jokes short.",
      "So I learned to build a website the same way I learned everything else on this page: by asking. I asked large language models how sites get built. I found AI tools that build them for you. Then I asked how to prompt those tools properly, and got taught that too. Now I use one to write the instructions and another to do the building, and I sit in the middle, steering. Prompt by prompt, step by step, until it works. Then publish it.",
      "Here's the thing almost nobody does with these tools: ask them what's wrong with your work. Put the song back in and ask what's weak about it. Ask why the image doesn't fit. Ask where you've gone wrong. Prompt specifically for the flaws. You'll get more out of that in ten minutes than a week of being told it's lovely.",
      "And don't rush the release. AI has sped the world up massively — that doesn't mean you have to move at that speed. Get the bios filled in. Get the levels even so there aren't loud songs and quiet songs. Make sure people can find the music. Take your time, and you can build a two-hour-twenty-two-minute concept album that leads into another double album, and another, and a book that runs along the same spine. You can build a whole world on the World Wide Web. There's no rush.",
      "One last thing on the home you build. Make it so everyone can get in. Every one of my sites is made to be used with your eyes shut — everything audible, everything reachable by keyboard and screen reader, nothing important living only inside a picture. That isn't a feature I bolted on. It's the only way I could build it, so it's how it's built. Do the same, and you'll reach people the rest of the internet quietly leaves outside.",
    ],
  },
];

function StepCard({ step }: { step: Step }) {
  const [open, setOpen] = useState(false);
  const panelId = `step-panel-${step.n}`;
  const btnId = `step-button-${step.n}`;

  return (
    <li
      id={`step-${step.n}`}
      className="border-t border-border/40 pt-8 first:border-t-0 first:pt-0"
    >
      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
        Step {step.word}
      </p>
      <h3 className="font-script text-ember text-3xl sm:text-4xl leading-tight mt-2">
        {step.n}. {step.title}
      </h3>
      <p className="mt-3 font-display text-parchment/90 text-base sm:text-lg leading-relaxed">
        {step.simple}
      </p>
      <p className="mt-2 font-display italic text-parchment/70 text-base leading-relaxed">
        {step.strap}
      </p>

      <button
        type="button"
        id={btnId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="landing-focus mt-4 inline-flex items-center gap-2 min-h-11 px-5 rounded-sm border border-border/70 bg-background/40 text-parchment hover:border-ember hover:text-ember transition font-mono text-[11px] uppercase tracking-[0.3em]"
      >
        {open ? "Less" : "More"}
        <span aria-hidden>{open ? "−" : "+"}</span>
        <span className="sr-only">
          {` — Step ${step.word}, ${step.title}`}
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
        className="mt-5 space-y-4 font-display text-parchment/90 text-base sm:text-lg leading-relaxed"
      >
        {step.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </li>
  );
}

function HowToPage() {
  return (
    <div className="relative min-h-dvh text-foreground overflow-hidden">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${landingBg.url})` }}
      />
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-background/80" />

      <main className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28 pb-32">
        <img
          src={toolbox.url}
          alt="Old battered toolbox labelled TeD's Toolbox"
          className="mx-auto w-48 sm:w-64 h-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
        />

        <p className="mt-10 font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
          TeD&apos;s Toolbox
        </p>
        <h1 className="font-script text-ember text-4xl sm:text-6xl leading-tight mt-4">
          How to Build a World
        </h1>
        <p className="font-display italic text-parchment/85 mt-4 text-lg sm:text-xl leading-relaxed text-balance">
          Eight steps from a single thought to a finished thing
        </p>

        <div className="mt-8 space-y-4 font-display text-parchment/90 text-base sm:text-lg leading-relaxed">
          <p>
            This is not the right way. There isn&apos;t one. This is just my way,
            written down, in case any of it is useful to you.
          </p>
          <p>
            I&apos;m not a teacher. I&apos;m reasonably good at expressing
            myself, so that&apos;s what this is — me expressing how I get from a
            thought in my head to a finished thing on a screen. Take what works.
            Bin the rest. Do it better than me.
          </p>
          <p>
            AI tools unlocked the world for me. I&apos;m blind, and a lot of what
            follows would have been closed to me otherwise — not difficult,
            closed. I can&apos;t write with a pen and paper any more, because I
            can&apos;t see the paper. So I talk instead, and something writes it
            down and reads it back. That one change makes everything below it
            possible, and it&apos;s the reason I want you making things too. The
            gate&apos;s open. Walk through it.
          </p>
          <p>
            I&apos;ve been upfront about the tools from the beginning. Nothing
            hidden, so nothing to confess. Some of the names below will have been
            renamed, replaced or retired by the time you read this. Take the
            names as examples. The method is the part that lasts.
          </p>
        </div>

        {/* Simple version */}
        <section aria-labelledby="eight-steps" className="mt-16">
          <h2
            id="eight-steps"
            className="font-script text-ember text-3xl sm:text-4xl leading-tight"
          >
            The eight steps
          </h2>
          <ol className="mt-6 space-y-2 font-display text-parchment/90 text-base sm:text-lg leading-relaxed list-decimal pl-6">
            {STEPS.map((s) => (
              <li key={s.n}>
                <a href={`#step-${s.n}`} className="landing-quiet-link landing-focus">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-4 font-display italic text-parchment/70">
            That&apos;s the whole thing. Everything below is just me explaining
            what happens inside each one.
          </p>
        </section>

        {/* Steps with accordions */}
        <section aria-labelledby="the-steps" className="mt-16">
          <h2 id="the-steps" className="sr-only">
            The eight steps in detail
          </h2>
          <ol className="space-y-10 list-none pl-0">
            {STEPS.map((s) => (
              <StepCard key={s.n} step={s} />
            ))}
          </ol>
        </section>

        {/* Accessibility */}
        <section
          aria-labelledby="everyone-in"
          className="mt-20 border-t border-border/40 pt-10"
        >
          <h2
            id="everyone-in"
            className="font-script text-ember text-3xl sm:text-4xl leading-tight"
          >
            Everyone should be able to get in
          </h2>
          <div className="mt-5 space-y-4 font-display text-parchment/90 text-base sm:text-lg leading-relaxed">
            <p>
              Every one of my sites is made to be used with your eyes shut —
              everything audible, everything reachable by keyboard and screen
              reader, nothing important living only inside a picture. That
              isn&apos;t a feature I bolted on. It&apos;s the only way I could
              build it, so it&apos;s how it&apos;s built. Do the same, and
              you&apos;ll reach people the rest of the internet quietly leaves
              outside.
            </p>
          </div>

          <h3 className="font-script text-ember text-2xl sm:text-3xl leading-tight mt-10">
            The one door I haven&apos;t got through
          </h3>
          <div className="mt-4 space-y-4 font-display text-parchment/90 text-base sm:text-lg leading-relaxed">
            <p>Deaf people.</p>
            <p>
              My work is audio to the bone — music, narration, story, voice.
              I&apos;ve been asked, fairly, for lyrics on the screen. I&apos;ve
              tried auto-captions, but they make spelling mistakes I can&apos;t
              see to fix, and there&apos;s no team here. It&apos;s one man doing
              every step on this page.
            </p>
            <p>
              So that&apos;s the honest edge of what I&apos;ve managed alone, and
              it isn&apos;t something I&apos;m relaxed about. If you know how to
              caption properly, or you&apos;d be willing to help me get it right,
              I&apos;d like to hear from you:{" "}
              <a
                href="mailto:CannaBusTeD@icloud.com"
                className="landing-quiet-link landing-focus"
              >
                CannaBusTeD@icloud.com
              </a>
            </p>
          </div>
        </section>

        {/* Last thing */}
        <section className="mt-16 border-t border-border/40 pt-10 space-y-4 font-display text-parchment/90 text-base sm:text-lg leading-relaxed">
          <h2 className="font-script text-ember text-3xl sm:text-4xl leading-tight">
            Last thing
          </h2>
          <p>
            These tools have opened the arts up to everybody, and a lot of people
            hate that, mostly because they&apos;re frightened. I&apos;ve been in
            bands for years and I&apos;ll say it anyway: move over. Everybody
            should be expressing themselves, and the rest of us should be
            cheering them on.
          </p>
          <p>
            But you can&apos;t just keep dreaming a dream. You have to manifest
            it, and you manifest it by living it, by doing it. That&apos;s all the
            steps above are. Have the idea. Understand the idea. Then use every
            tool you can reach to get it out.
          </p>
          <p className="font-script text-ember text-2xl">Go on then.</p>
        </section>

        {/* Download */}
        <section className="mt-14">
          <a
            href={pdfAsset.url}
            download="How-to-Build-a-World.pdf"
            aria-label="Download How to Build a World as a PDF"
            className="landing-focus inline-flex items-center justify-center min-h-[52px] px-6 rounded-sm border border-border/70 bg-background/40 text-parchment hover:border-ember hover:text-ember transition font-mono text-[11px] uppercase tracking-[0.3em]"
          >
            Download the PDF
          </a>
          <p className="mt-3 font-script text-ember text-xl">
            Keep the toolbox with you
          </p>
        </section>

        <div className="mt-16 flex flex-wrap gap-6">
          <Link
            to="/album"
            className="landing-quiet-link landing-focus font-script text-ember text-xl sm:text-2xl"
          >
            ← Back to the album
          </Link>
          <Link
            to="/"
            className="landing-quiet-link landing-focus font-script text-ember text-xl sm:text-2xl"
          >
            Back to the door
          </Link>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6">
          <Link
            to="/lost-property"
            className="landing-focus font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground hover:text-ember transition"
          >
            Lost Property →
          </Link>
        </div>

      </main>
    </div>
  );
}
