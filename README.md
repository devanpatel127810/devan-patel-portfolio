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

## Ideas to improve (from the reference reels)

The reference for this site is the Instagram-reel portfolios Devan has been
sending (jameschugh.com's painted storybook world, the @build.with.alan
"Apple trick" reel, and similar scroll-story sites). Their stacks are NOT
publicly confirmed, so nothing below claims what they use — only the
techniques, how they work, and how each would apply here. These are ideas,
not implemented work.

### How they get that feel

- **Inertia smooth scroll.** Native wheel scroll arrives in steps; every
  polished scroll site first replaces it with interpolated scroll (Lenis
  here) so all camera motion rides a gliding baseline instead of
  stair-steps. Already in this repo — keep it.
- **Long pinned chapters with beats.** A chapter pins for 150–300% of
  viewport height so a multi-beat timeline can play inside it: enter →
  dwell → exit. Dwell matters: a beat where nothing moves except readable
  content sitting still. Short pins only fit one beat, which is why scenes
  feel like a passing glance.
- **Camera zoom in/out (the "fly").** A framed image scales up to
  full-bleed as you scroll (flying INTO the world), and later scales back
  down into a frame (flying OUT to a map/overview). Variants: scale +
  border-radius animated together, counter-zooming the image inside its
  frame for depth, or a clip-path inset expanding from a small rectangle
  to fullscreen like a shutter opening.
- **Layered parallax = depth.** Foreground, midground, and background move
  at different rates (typical range 0.5–1.5×). A single flattened painting
  can't do this — that's why flat zooms read as magnifications. The fix
  is layered art: split a painting into foreground cutout + inpainted
  background (generative fill), or estimate a depth map from the painting
  (depth-estimation models) and displace layers for true parallax. Three
  layers moving differently reads as a world; one layer moving alone
  reads as a slideshow.
- **A vehicle the camera follows.** The Bruno Simon archetype: the user
  drives a car through a world and the camera follows it — the journey IS
  the navigation. The 2D equivalent is a car that travels visibly through
  the paintings (not down a margin line) while the camera cuts and zooms
  to follow it between scenes.
- **Map moments between scenes.** Between two scenes, the camera pulls
  OUT to a map view, the road segment draws itself on, the car drives the
  gap, then the camera flies back IN. Pull-out → road draw → fly-in is
  what makes transitions feel like travel instead of a slideshow cut.
- **Scroll-linked frame sequences (the "Apple trick").** How Apple's
  product pages do buttery camera moves: generate a start frame and an end
  frame, interpolate between them with a video model, extract the frames
  (~30fps), and scrub them on a canvas with scroll. The camera move is
  baked into real frames instead of a CSS scale, so it never looks like a
  plain zoom. Same trick works for a hero drive or a fly-through: render
  the move once, scrub it with scroll.
- **Living scenes from short video loops.** Instead of bobbing PNG
  cutouts with CSS, generate a short looping clip from the painting
  itself (image-to-video tools — Runway, Kling, Luma, and similar — take
  the painting as the first frame). Water ripples, steam curls, cloth and
  hair move for real. Costs: video weight and a mobile/static fallback
  for every clip.
- **Physics instead of linear eases.** Springs and inertia for settle and
  bounce (GSAP InertiaPlugin is already registered here; Framer Motion
  springs are the React equivalent). A ball that squashes, rebounds, and
  settles reads alive; a ball on a sine loop reads like it's floating.
- **Atmosphere layers.** Canvas particles (dust motes, fireflies, rain),
  film grain, and vignette grading sell "a place" more cheaply than any
  new painting. Keep them transform/opacity-only and off the mobile path.

### How each maps to this site's current gaps

- Kitchen reading static live → replace CSS-bobbed cutouts with a short
  video loop of the kitchen, or split the painting into layers so steam
  and props move at different rates. Diagnose the current bug first
  (see Status) before rebuilding the scene.
- Courts balls floating, not snapping → spring physics with squash and a
  double rebound, instead of a sine-loop bounce.
- Transitions feeling like magnifications with a pull-back → map moments
  (pull out → road draws → fly in) and clip-path shutter wipes, plus
  layered art so the zoom has depth to move through.
- Garage/café feeling gentle → layered parallax inside the dwell beat and
  a visible vehicle the camera follows, so the world keeps moving while
  the words sit still.
- Hero drive → a scroll-linked frame sequence (the Apple trick) is the
  highest-fidelity version of the driving shot, if the frame budget and
  mobile fallback are acceptable.

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
