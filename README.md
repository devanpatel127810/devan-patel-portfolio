# Devan Patel — Portfolio

An illustrated, story-driven portfolio: one golden-hour day in Austin, told as a
drone-POV film. The camera flies through six full-viewport painted scenes —
Overlook → Garage → Café → Kitchen → Courts → Sunset — then lands on a full
details section (timeline, tool wall, work, projects, achievements, contact).

## Stack

- Next.js 15 / React 19 / TypeScript, plain CSS
- GSAP (ScrollTrigger) + Lenis for the film timeline and smooth scroll
- No backend, no API keys, no environment variables

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `components/motion/Film.tsx` — the film: one pinned timeline, six stacked
  100svh shots, fly-through transitions (outgoing shot scales past the camera
  and cuts to the next shot settling in). Scroll is the drone's throttle.
- `components/Details.tsx` — the full readable record below the film.
- `components/motion/SceneFx.tsx`, `SunsetFx.tsx`, `HeroLiving.tsx` —
  time-looping life inside the scenes (always on, never scroll-driven).
- `public/art/` — the six scene paintings + character + car cutout.
- `public/fx/` — the animated overlay elements (balls, tools, cups, steam).
- `lib/data.ts` — all copy: profile, skills, timeline, work, projects.

## Animation frameworks & libraries

### Used in this repo

- **GSAP 3 + @gsap/react** — timelines and the ScrollTrigger pin/scrub that
  drives the film. Plugins registered once in `lib/gsap.ts`: ScrollTrigger,
  MotionPathPlugin, Draggable, InertiaPlugin.
- **Lenis** — smooth scrolling. Scroll is the drone's throttle: it moves the
  camera, it never powers the world.
- **Plain CSS keyframes** — the always-on life inside scenes (`fx-bob`,
  `fx-bounce`, steam, birds, clouds). The governing rule from this build:
  world motion runs on its own clock (time loops), scroll only moves the
  camera. Never scroll-drive scene life — that freezes the world whenever the
  visitor stops scrolling.
- GSAP is fully free, including its former Club plugins (MorphSVG,
  ScrollSmoother, Flip, and the rest), since 2025.

### Morphing scenes (reference — not all used here yet)

- **GSAP MorphSVGPlugin** — shape-to-shape SVG morphs. Cleanest when the two
  paths share structure and point counts.
- **GSAP Flip** — morph an element between two layout states (position, size)
  with FLIP interpolation.
- **Three.js / React Three Fiber** — true 3D fly-throughs, shader-based
  image/scene morphs, and morph targets on 3D models. The step up when a
  scene needs a real camera instead of a scaled painting.
- **Anime.js** — lightweight timelines, SVG path morphing, and staggers.
- **Lottie (lottie-web)** — After Effects vector animation exported as JSON,
  good for self-contained animated illustrations.
- **Rive** — interactive, real-time vector animation with state machines.
- **CSS View Transitions API** — DOM morphs between two states in a
  single-document transition.

### Transitions (reference)

- **GSAP timelines + ScrollTrigger** — what the film uses: zoom-to-engulf,
  then a hard cut to the next shot settling in. No crossfades between
  paintings — blending breaks the one-world illusion.
- **Framer Motion (Motion for React)** — declarative layout animations and
  `AnimatePresence` enter/exit transitions for React UI.
- **Barba.js** — page-to-page transitions, only relevant if the site ever
  grows beyond a single page.
- **Theatre.js** — visual timeline editing for complex, choreographed motion
  sequences.

## Status

### Done

- The film structure works: all five fly-throughs read as flying through
  paintings, one continuous world, no ghosts or overlaps.
- Full details section below the film (timeline, tool wall, certs, projects,
  achievements, dishes, polaroid board, contact block).
- Sunset finale is full-viewport with a usable contact block; the duplicate
  white car badge is gone.
- Reduced-motion and mobile get a complete static version of the page.
- Live preview deployed, and this repo is public on GitHub.

### Still to change / known issues

- **Kitchen FX (whisk, tomato, teacup) read static in live viewing** even
  though the animation code is verified present in the deployed CSS. This is
  the fourth local/live contradiction on this scene — do not tune blind.
  Diagnose first with the manual browser-console check on the live Kitchen
  scene (log each kitchen element's animation-name, duration, play-state,
  and rect, twice, 3s apart) and compare against the source.
- Courts balls float rather than snap (squash not visible live); sunset
  birds read small live; transitions feel long with a pull-back between
  engulfs; garage/café motion is gentle.
- Lone Star Wash and Dry URL and StackStep link are still missing — those
  cards can ship link-less if the URLs never arrive.
- The preview omits `/resume.pdf`, so the résumé link 404s there (see
  Deployment).

## Deployment

- **Preview:** https://devan-patel-portfolio-preview.vercel.app — Vercel
  project `devan-patel-portfolio-preview`. Preview deploys are manual via
  the Vercel API/connector upload. That upload path caps single files at
  roughly 94KB raw, which is why preview art is recompressed and
  `resume.pdf` (140KB) is omitted there. The repo holds the full-quality
  originals; preview recompression is a deploy artifact, not the source.
- **Real domain:** https://devan-patel-portfolio.vercel.app — Vercel team
  project `devan-patel-portfolio`. Currently blocked: the reconnect covers
  only the personal Vercel account, not the team that owns this project, so
  a team-scope grant or a valid team API token is still needed before the
  full-quality build can ship there.
- **Not yet wired:** automatic deploys from GitHub pushes (Vercel GitHub
  integration). Connecting this repo to Vercel for auto-deploys is a good
  first setup task.
- The résumé link (`/resume.pdf`) is served from `public/resume.pdf`.
