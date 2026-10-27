"use client";

import Image from "next/image";

/**
 * HERO, LIVING — same system as every other scene, not a different
 * mechanism. The hero painting itself is alive on its own clock:
 * the teal car drives the winding road continuously, clouds drift
 * across the sky, and golden light shimmers — while scroll still
 * drives the CAMERA (the pin's fly-in, dwell drift, and handoff in
 * Hero.tsx). One movie, one grammar.
 *
 * HERO CAR (fix round, Oct 26): the old car was a straight wide-
 * track slide of a side-profile image on a SOLID cream background,
 * so it rendered as a white rectangle teleporting across the
 * panorama (center → road bottom → trees/courts) instead of
 * driving anything. Now: the car is a keyed transparent cutout
 * (rear three-quarter view, driving away, /art/car-cutout.webp)
 * that follows the painted road's S-curve — bottom-center near
 * the viewer, up the winding road toward the lake, shrinking
 * into the distance, fading out at the far end and re-entering
 * at the bottom edge. No white box, no teleport: one continuous
 * drive along the road.
 *
 * ALWAYS-ON (fix round 2, Oct 26): the IntersectionObserver pause
 * gating is REMOVED (see SceneFx for why — it froze visibly
 * on-screen scenes under real step-scrolling). Loops run always;
 * mobile / reduced-motion hide the layer entirely.
 */
export default function HeroLiving() {
  return (
    <div className="hero-living" aria-hidden="true">
      <div className="fx-cloud fx-anim fx-cloud-a" />
      <div className="fx-cloud fx-anim fx-cloud-b" />
      <div className="fx-shimmer fx-anim fx-shimmer-pulse" />
      <span className="fx-hero-car fx-anim fx-road-drive">
        <Image src="/art/car-cutout.webp" alt="" width={640} height={319} />
      </span>
    </div>
  );
}
