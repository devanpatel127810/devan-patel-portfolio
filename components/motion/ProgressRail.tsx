"use client";

import { useRef } from "react";
import { gsap, useGSAP, FULL_MOTION } from "@/lib/gsap";

/**
 * Waypoint map for the DRONE FILM (rebuild, Oct 26). Six dots
 * (Overlook, Garage, Café, Kitchen, Courts, Sunset) fill as the
 * drone reaches each shot, and each dot flies the drone to its
 * shot. The rail does NOT use anchor links for the film: the shots
 * are stacked inside one pinned container, so a dot scrolls to the
 * shot's timeline position instead.
 *
 * MATH (shared with Film.tsx): stride 2.2 units per shot, total
 * 12.5 units, pin end "+=1250%" so 1 unit ≈ 100vh of scroll. The
 * film's pin-spacer stays in flow with height = 100svh + pin
 * distance, so filmTop and the unit height are measured live from
 * it on every scroll — the same live-math lesson as the old rail
 * (a body ScrollTrigger measured its end at half the real height
 * once pin spacers shifted geometry, and froze the active dot).
 * Past the film's end, the dots track the plain-flow details
 * sections (#garage … #contact) by their tops instead.
 *
 * Clicks scroll through Lenis when it exists (stored on window by
 * SmoothScroll), else native smooth scroll. Desktop + motion only;
 * CSS hides the rail on small screens and for reduced motion.
 */
const STOPS = [
  { id: "overlook", label: "Overlook", start: 0, anchor: "#top" },
  { id: "garage", label: "The Garage", start: 2.2, anchor: "#garage" },
  { id: "cafe", label: "The Café", start: 4.4, anchor: "#cafe" },
  { id: "kitchen", label: "The Kitchen", start: 6.6, anchor: "#kitchen" },
  { id: "courts", label: "The Courts", start: 8.8, anchor: "#courts" },
  { id: "contact", label: "Sunset", start: 11.0, anchor: "#contact" },
];
const FILM_UNITS = 12.5;

type LenisLike = { scrollTo: (t: number, o?: { duration?: number }) => void };

export default function ProgressRail() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const fill = ref.current?.querySelector<HTMLElement>(".rail-fill");
        const dots = ref.current
          ? Array.from(ref.current.querySelectorAll<HTMLElement>(".rail-stop"))
          : [];
        const film = () => document.querySelector(".film") as HTMLElement | null;
        const filmTop = () => {
          const f = film();
          if (!f) return 0;
          // Pinned: GSAP wraps the film in a .pin-spacer that stays
          // in flow; measure THAT, not the fixed element itself.
          const spacer = f.parentElement?.classList.contains("pin-spacer")
            ? f.parentElement
            : f;
          return spacer.getBoundingClientRect().top + window.scrollY;
        };
        const detailEls = STOPS.slice(1).map((s) => ({
          id: s.id,
          el: () => document.querySelector(s.anchor) as HTMLElement | null,
        }));
        const update = () => {
          const max =
            document.documentElement.scrollHeight - window.innerHeight;
          const p = max > 0 ? window.scrollY / max : 0;
          if (fill) fill.style.transform = `scaleY(${p})`;
          const top = filmTop();
          const vh = window.innerHeight;
          const u = (window.scrollY - top) / vh;
          let active = STOPS[0].id;
          if (u >= 0) {
            if (u < FILM_UNITS) {
              // Inside the film: active = last shot whose start the
              // drone has reached (small epsilon so the dot lights
              // just as its shot settles in).
              for (const s of STOPS) {
                if (u + 0.15 >= s.start) active = s.id;
              }
            } else {
              // Past the film: track the details sections by top.
              const line = window.scrollY + window.innerHeight * 0.3;
              for (const { id, el } of detailEls) {
                const node = el();
                if (node && node.getBoundingClientRect().top + window.scrollY <= line) {
                  active = id;
                }
              }
            }
          }
          dots.forEach((d) => {
            d.classList.toggle("on", d.dataset.rail === active);
          });
        };
        const goto = (start: number) => {
          const target = filmTop() + start * window.innerHeight;
          const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
          if (lenis) lenis.scrollTo(target, { duration: 1.6 });
          else window.scrollTo({ top: target, behavior: "smooth" });
        };
        const onClick = (e: MouseEvent) => {
          const btn = (e.target as HTMLElement | null)?.closest?.(
            ".rail-stop"
          ) as HTMLElement | null;
          if (!btn || !ref.current?.contains(btn)) return;
          const stop = STOPS.find((s) => s.id === btn.dataset.rail);
          if (!stop) return;
          e.preventDefault();
          goto(stop.start);
        };
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        ref.current?.addEventListener("click", onClick);
        update();
        return () => {
          window.removeEventListener("scroll", update);
          window.removeEventListener("resize", update);
          ref.current?.removeEventListener("click", onClick);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <nav className="rail" ref={ref} aria-label="Journey">
      <span className="rail-track" aria-hidden="true">
        <span className="rail-fill" aria-hidden="true" />
      </span>
      {STOPS.map((s) => (
        <button
          key={s.id}
          type="button"
          className="rail-stop"
          data-rail={s.id}
          aria-label={s.label}
        >
          <span className="rail-dot" aria-hidden="true" />
          <span className="rail-label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
