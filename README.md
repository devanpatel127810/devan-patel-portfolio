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

## Notes

- Live preview: https://devan-patel-portfolio-preview.vercel.app
- Reduced-motion and mobile get a complete static version of the page.
- The résumé link (`/resume.pdf`) is served from `public/resume.pdf`.
