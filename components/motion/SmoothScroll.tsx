"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Inertia smooth scroll (Lenis) bridged into GSAP's ticker, so every
 * ScrollTrigger timeline rides a gliding baseline instead of native
 * wheel stair-steps. Also routes in-page anchor links through
 * lenis.scrollTo (sections carry scroll-margin-top: 72px for the nav)
 * and refreshes
 * ScrollTrigger once images, fonts, and Lenis bounds have settled.
 *
 * Reduced motion: no Lenis at all — native scroll, native anchors.
 * Phones keep native touch momentum (syncTouch: false); the pinned
 * chapter work stays behind the FULL_MOTION desktop gate regardless.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09, // slightly below default 0.1: glide without float
      smoothWheel: true,
      syncTouch: false, // phones keep native momentum (desktop is the target)
      wheelMultiplier: 1,
    });
    // Exposed for the film rail's shot jumps (ProgressRail reads
    // window.__lenis and falls back to native smooth scroll).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    const late = setTimeout(refresh, 1200);
    refresh();

    // Route #anchor clicks through Lenis so they land smooth and true
    // under smoothed scroll (offset clears the fixed nav). Anything
    // without a matching target, or outside Lenis, keeps native behavior.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      // No offset here on purpose: sections already carry
      // scroll-margin-top: 72px, and Lenis honors it — passing -72 as
      // well double-counted and landed the section 144px down.
      lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      clearTimeout(late);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
