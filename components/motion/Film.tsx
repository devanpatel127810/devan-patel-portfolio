"use client";

import { useRef } from "react";
import Image from "next/image";
import { profile, achievements } from "@/lib/data";
import { gsap, useGSAP, FULL_MOTION } from "@/lib/gsap";
import HeroLiving from "@/components/motion/HeroLiving";
import SceneFx, { type SceneFxKind } from "@/components/motion/SceneFx";
import SunsetFx from "@/components/motion/SunsetFx";

/**
 * DRONE POV FILM (rebuild, Oct 26 — supersedes the card-plus-text
 * structure and all three fix rounds on it). The camera IS a drone
 * flying one continuous path through the illustrated Austin world:
 * high over the skyline, diving through the city, flying INTO each
 * scene. Scroll is the throttle: it accelerates between scenes and
 * hovers during each dwell so the overlay stays readable.
 *
 * MECHANICS — one pinned container, six full-viewport shots stacked
 * absolutely, one scrubbed timeline:
 *   ENTER (0.5): the shot settles from 1.35 (portal scale) to its
 *     dwell scale while its panel rises in. (The hero starts
 *     settled at 1.0 — wide aerial — and pushes 1.0→1.05.)
 *   DWELL (1.0): art drifts a further +0.1, panel fully static.
 *   EXIT (0.7, all but sunset): the outgoing shot stays FIXED
 *     while its art zooms to 3.4x around a portal point in the
 *     painting — the world rushes at the camera and blows past
 *     recognition — and then a HARD CUT (visibility, never
 *     opacity) drops it, revealing the next shot already beneath
 *     at 1.35, settling in. No crossfade, no slide-off: the cut
 *     at peak magnification is what makes it a pass-through
 *     rather than a dissolve.
 *   Sunset has no exit: the drone lands, the pin ends, and the
 *   plain-flow details section scrolls in below.
 * Timeline units: stride 2.2 per shot (0.5+1.0+0.7), total 12.5,
 * pin end "+=1250%" so 1 unit ≈ 100vh of scroll. ProgressRail
 * uses the same stride math (STARTS) for its waypoint dots.
 * LIVING WORLDS: SceneFx / HeroLiving / SunsetFx run pure CSS
 * loops on their own clocks, always on — no IntersectionObserver
 * gating (round 2 proved gating freezes visibly on-screen scenes
 * under real step-scrolling). The ONLY car on the page is the
 * hero's driving car: the old per-scene circular car badge is
 * DELETED, so no duplicate ever shares the road with it.
 * FALLBACK: everything above runs only under FULL_MOTION. Mobile
 * and reduced-motion get the flow layout from globals.css: each
 * shot's painting (16/9) + panel stacked, details below, zero
 * pins, zero loops.
 */

const STARTS = [0, 2.2, 4.4, 6.6, 8.8, 11.0];
const SETTLES = [1.0, 1.08, 1.08, 1.08, 1.08, 1.0];
const PORTALS = ["50% 58%", "50% 55%", "50% 55%", "50% 55%", "50% 55%", "50% 45%"];

type ShotFx = "hero" | SceneFxKind | "sunset";

const SHOTS: {
  id: string;
  chapter: string;
  art: string;
  artClass: string;
  alt: string;
  fx: ShotFx;
}[] = [
  {
    id: "overlook",
    chapter: "The Overlook",
    art: "/art/hero.webp",
    artClass: "shot-art-hero",
    alt: "Painted golden-hour panorama of Austin, Texas — the downtown skyline and Lady Bird Lake, a café terrace, a teal sports car on a winding road, and tennis courts in the hill country",
    fx: "hero",
  },
  {
    id: "garage",
    chapter: "Scene 01 — The Garage",
    art: "/art/scene-garage.webp",
    artClass: "",
    alt: "Painted garage at golden hour — a teal sports car up on a lift, a wall of tools behind it, warm light spilling onto the driveway",
    fx: "garage",
  },
  {
    id: "cafe",
    chapter: "Scene 02 — The Café",
    art: "/art/scene-cafe.webp",
    artClass: "",
    alt: "Painted corner café in warm light — espresso steam rising, a laptop on the counter, the road curving past outside",
    fx: "cafe",
  },
  {
    id: "kitchen",
    chapter: "Scene 03 — The Kitchen",
    art: "/art/scene-kitchen.webp",
    artClass: "",
    alt: "Painted home kitchen at dusk — pans on the stove, warm lamplight, ingredients laid out on the counter",
    fx: "kitchen",
  },
  {
    id: "courts",
    chapter: "Scene 04 — The Courts",
    art: "/art/scene-courts.webp",
    artClass: "",
    alt: "Painted courts complex in late-afternoon light — a tennis court, a pickleball court, and a basketball hoop under the Texas sky",
    fx: "courts",
  },
  {
    id: "sunset",
    chapter: "Scene 05 — Sunset",
    art: "/art/scene-sunset.webp",
    artClass: "",
    alt: "Painted Austin overlook at sunset — the skyline lights coming on over Lady Bird Lake, the teal sports car parked at the viewpoint",
    fx: "sunset",
  },
];

function ShotFxLayer({ fx }: { fx: ShotFx }) {
  if (fx === "hero") return <HeroLiving />;
  if (fx === "sunset") return <SunsetFx />;
  return <SceneFx fx={fx} />;
}

export default function Film() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const q = gsap.utils.selector(ref);
        const shots = q(".shot");
        const arts = q(".shot-art");
        const panels = q(".shot-panel");
        const cue = q(".shot-cue");
        const driver = q(".shot-driver");

        // Initial states (match each segment's fromTo start, so the
        // page at scroll 0 shows the settled hero, and every later
        // shot sits at portal scale beneath its predecessor until
        // its cut reveals it).
        shots.forEach((shot, i) => {
          gsap.set(shot.querySelector(".shot-art"), {
            scale: i === 0 ? 1 : 1.35,
            transformOrigin: PORTALS[i],
          });
          if (i !== 0) gsap.set(shot.querySelector(".shot-panel"), { opacity: 0, y: 24 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=1250%",
            pin: true,
            scrub: 1.0,
          },
        });

        // HERO — aerial push, dwell, dive-through exit. Panel and
        // driver are visible from load (no fade-in: the headline
        // must be there at first paint); they fade only on exit.
        tl.fromTo(
          arts[0],
          { scale: 1 },
          { scale: 1.05, ease: "none", duration: 0.5, immediateRender: false },
          0
        )
          .fromTo(
            cue,
            { opacity: 1 },
            { opacity: 0, ease: "none", duration: 0.2, immediateRender: false },
            0
          )
          .set(cue, { display: "none", immediateRender: false }, 0.2)
          .fromTo(
            arts[0],
            { scale: 1.05 },
            { scale: 1.1, ease: "none", duration: 1.0, immediateRender: false },
            0.5
          )
          .fromTo(
            [panels[0], driver],
            { opacity: 1, y: 0 },
            { opacity: 0, y: -12, ease: "none", duration: 0.2, immediateRender: false },
            1.5
          )
          .to(
            arts[0],
            { scale: 3.4, ease: "power1.in", duration: 0.7, immediateRender: false },
            1.5
          )
          .set(shots[0], { visibility: "hidden", immediateRender: false }, 2.12);

        // SHOTS 1–4 — portal settle, dwell, engulf + hard cut.
        for (let i = 1; i <= 4; i++) {
          const s = STARTS[i];
          tl.fromTo(
            arts[i],
            { scale: 1.35 },
            { scale: SETTLES[i], ease: "none", duration: 0.5, immediateRender: false },
            s
          )
            .fromTo(
              panels[i],
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, ease: "power2.out", duration: 0.5, immediateRender: false },
              s
            )
            .fromTo(
              arts[i],
              { scale: SETTLES[i] },
              { scale: SETTLES[i] + 0.1, ease: "none", duration: 1.0, immediateRender: false },
              s + 0.5
            )
            .fromTo(
              panels[i],
              { opacity: 1, y: 0 },
              { opacity: 0, y: -12, ease: "none", duration: 0.2, immediateRender: false },
              s + 1.5
            )
            .to(
              arts[i],
              { scale: 3.4, ease: "power1.in", duration: 0.7, immediateRender: false },
              s + 1.5
            )
            .set(shots[i], { visibility: "hidden", immediateRender: false }, s + 2.12);
        }

        // SUNSET — portal settle, dwell, land. No exit: the pin
        // ends and the details section scrolls in below.
        tl.fromTo(
          arts[5],
          { scale: 1.35 },
          { scale: 1.0, ease: "none", duration: 0.5, immediateRender: false },
          11.0
        )
          .fromTo(
            panels[5],
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.5, immediateRender: false },
            11.0
          )
          .fromTo(
            arts[5],
            { scale: 1.0 },
            { scale: 1.1, ease: "none", duration: 1.0, immediateRender: false },
            11.5
          );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div className="film" ref={ref}>
      {SHOTS.map((shot, i) => (
        <section
          className="shot"
          key={shot.id}
          aria-label={shot.chapter}
          style={{ zIndex: 60 - i * 10 }}
        >
          <div className={`shot-art ${shot.artClass}`}>
            <Image
              src={shot.art}
              alt={shot.alt}
              width={1800}
              height={900}
              sizes="100vw"
              priority={i === 0}
            />
            <div className="shot-vignette" aria-hidden="true" />
            <ShotFxLayer fx={shot.fx} />
          </div>
          <span className="shot-chapter" aria-hidden="true">
            {shot.chapter}
          </span>

          {i === 0 ? (
            <>
              <div className="shot-panel shot-panel-hero">
                <p className="kicker">
                  <span>{profile.location}</span>
                  <span className="dot-sep">●</span>
                  <span>{profile.role}</span>
                </p>
                <h1>
                  hey, I&rsquo;m <em>Devan.</em>
                </h1>
                <p className="tagline">I build software that ships.</p>
                <p className="sub">{profile.bio}</p>
                <div className="hero-proof">
                  <span>
                    <b>{achievements[0].value}</b> extraction accuracy in production
                  </span>
                  <span className="hp-sep" aria-hidden="true" />
                  <span>
                    <b>1,000+</b> risks categorized with GenAI
                  </span>
                  <span className="hp-sep" aria-hidden="true" />
                  <a href="#kitchen">see my own builds ↓</a>
                </div>
              </div>
              <div className="shot-driver" aria-hidden="true">
                <div className="frame">
                  <Image
                    src="/art/character-devan.webp"
                    alt=""
                    width={450}
                    height={900}
                    sizes="180px"
                  />
                </div>
                <p className="cap">your driver</p>
              </div>
              <div className="shot-cue" aria-hidden="true">
                <span>
                  scroll to fly<span className="cue-arrow">↓</span>
                </span>
              </div>
            </>
          ) : i === 5 ? (
            <div className="shot-panel shot-panel-contact">
              <p className="kicker">Scene 05 — Sunset</p>
              <h2>
                Let&rsquo;s build <em>something.</em>
              </h2>
              <p className="lede">
                Roles, projects, or just hi — my inbox is open and I reply fast.
                The résumé is one click away, and everything on this page is the
                real record.
              </p>
              <div className="sunset-row">
                <figure className="sunset-photo">
                  <Image
                    src="/profile-hd.jpg"
                    alt="Portrait photograph of Devan Patel"
                    width={320}
                    height={400}
                    sizes="148px"
                  />
                  <figcaption className="cap">the actual human</figcaption>
                </figure>
                <div>
                  <div className="contact-btns">
                    <a className="primary" href={`mailto:${profile.email}`}>
                      Email me
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                      Résumé
                    </a>
                  </div>
                  <p className="shortcuts" aria-label="Keyboard shortcuts">
                    psst — these work on your keyboard too: <b>G</b> GitHub ·{" "}
                    <b>L</b> LinkedIn · <b>M</b> mail · <b>R</b> résumé
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="shot-panel">
              <p className="kicker">{shot.chapter}</p>
              {i === 1 && (
                <>
                  <h2>
                    How I <em>got here.</em>
                  </h2>
                  <p className="lede">
                    I started out curious about how things work, then got a lot more
                    interested in building the things. One degree, two internships, a
                    semester in Madrid, and a lot of shipped code later — this is the
                    road so far.
                  </p>
                  <a className="shot-more" href="#garage">
                    the full story ↓
                  </a>
                </>
              )}
              {i === 2 && (
                <>
                  <h2>
                    The <em>day job.</em>
                  </h2>
                  <p className="lede">
                    I&rsquo;m a <b>Forward Deployed Engineer at Deloitte</b>, on the
                    ZoraAI team since January 2025. Plain version: I sit with clients,
                    figure out where AI actually helps, and ship it into their real
                    workflows — then stay until it works in production.
                  </p>
                  <a className="shot-more" href="#cafe">
                    the full story ↓
                  </a>
                </>
              )}
              {i === 3 && (
                <>
                  <h2>
                    Cooked up <em>myself.</em>
                  </h2>
                  <p className="lede">
                    The building doesn&rsquo;t stop at work. These are my own
                    projects — for users, for family, and for the fun of watching an
                    idea turn into a thing that runs.
                  </p>
                  <a className="shot-more" href="#kitchen">
                    the full story ↓
                  </a>
                </>
              )}
              {i === 4 && (
                <>
                  <h2>
                    Off the clock, <em>calculated chaos.</em>
                  </h2>
                  <p className="lede">
                    Not the work version. When I&rsquo;m not shipping, it&rsquo;s some
                    rotation of courts, kitchen, gym, and garage — usually with coffee
                    involved.
                  </p>
                  <a className="shot-more" href="#courts">
                    the full story ↓
                  </a>
                </>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
