"use client";

import Image from "next/image";

/**
 * LIVING SCENES (movie redirect, Oct 26): per-scene animated moments
 * that run on their OWN CLOCK, not on scroll. The previous builds drove
 * every prop from ScrollTrigger scrub, so the world froze whenever the
 * reader stopped scrolling — the exact thing Devan rejected ("the
 * animation is one like movie almost"). These layers are pure CSS
 * keyframe loops (transform/opacity only): they bounce, spin, drift,
 * and fly whether or not the page scrolls. Scroll still moves the
 * CAMERA (the Film's pinned timeline); the world itself never freezes.
 *
 * ALWAYS-ON (fix round 2, Oct 26): the loops used to pause via
 * IntersectionObserver whenever the stage left the viewport — but
 * two live QA passes watched café/kitchen sit frozen for 14+ seconds
 * while visibly on screen, and the prime suspect is that gating
 * misfiring under real step-scrolling (pins failing to re-engage
 * after jump-scrolls left stages legitimately "paused"). The gating
 * is GONE: loops run always. Transform/opacity-only loops on a few
 * small elements cost nothing worth this failure mode. Mobile /
 * reduced-motion never see the layer at all (globals.css hides
 * .stage-fx there) — the static fallback.
 */
export type SceneFxKind = "courts" | "kitchen" | "garage" | "cafe";

export default function SceneFx({ fx }: { fx: SceneFxKind }) {
  const cls = "stage-fx";

  if (fx === "courts") {
    // Three balls, one court each: in-place bounce with squash-and-
    // stretch on impact, plus a slow sideways sway so no two balls
    // ever move in sync. Sizes stay small (46px) — the old 68px balls
    // read as oversized stickers.
    return (
      <div className={cls} aria-hidden="true">
        <span className="fx-sway fx-anim fx-sway-a fx-pos-tennis">
          <span className="fx-ball fx-anim fx-bounce-a">
            <Image src="/fx/ball-tennis.jpg" alt="" width={92} height={92} />
          </span>
        </span>
        <span className="fx-sway fx-anim fx-sway-b fx-pos-pickle">
          <span className="fx-ball fx-anim fx-bounce-b">
            <Image src="/fx/ball-pickleball.jpg" alt="" width={92} height={92} />
          </span>
        </span>
        <span className="fx-sway fx-anim fx-sway-c fx-pos-hoop">
          <span className="fx-ball fx-anim fx-bounce-c">
            <Image src="/fx/ball-basketball.jpg" alt="" width={92} height={92} />
          </span>
        </span>
      </div>
    );
  }

  if (fx === "kitchen") {
    // Continuous bob loop (fix round, Oct 26): the old drop loop
    // spent 44% of every cycle frozen at rest, so a still hold read
    // as dead. The bob never rests — whisk, tomato, cup are always
    // rising or falling, staggered mid-cycle, so any 5-second still
    // window shows visible motion.
    return (
      <div className={cls} aria-hidden="true">
        <span className="fx-el fx-anim fx-bob-a fx-pos-whisk">
          <Image src="/fx/kitchen-whisk.webp" alt="" width={150} height={150} />
        </span>
        <span className="fx-el fx-anim fx-bob-b fx-pos-tomato">
          <Image src="/fx/kitchen-tomato.webp" alt="" width={150} height={150} />
        </span>
        <span className="fx-el fx-anim fx-bob-c fx-pos-kcup">
          <Image src="/fx/kitchen-cup.webp" alt="" width={150} height={150} />
        </span>
      </div>
    );
  }

  if (fx === "garage") {
    // Gear spins continuously; wrench swings back and forth. Both
    // run the whole time the stage is visible — no scroll step
    // needed to see them move.
    return (
      <div className={cls} aria-hidden="true">
        <span className="fx-el fx-anim fx-spin fx-pos-gear">
          <Image src="/fx/garage-gear.webp" alt="" width={160} height={160} />
        </span>
        <span className="fx-el fx-anim fx-swing fx-pos-wrench">
          <Image src="/fx/garage-wrench.webp" alt="" width={160} height={160} />
        </span>
      </div>
    );
  }

  // café: beans drift widely along the counter; the cup bobs gently
  // (it previously had NO animation and sat dead) while its steam
  // rises in a continuous wisp cycle. Cup sits on the right counter
  // beside the painted cup, with steam directly above it.
  return (
    <div className={cls} aria-hidden="true">
      <span className="fx-el fx-anim fx-drift-a fx-pos-beans-a">
        <Image src="/fx/cafe-beans.webp" alt="" width={160} height={160} />
      </span>
      <span className="fx-el fx-anim fx-drift-b fx-pos-beans-b">
        <Image src="/fx/cafe-beans.webp" alt="" width={160} height={160} />
      </span>
      <span className="fx-el fx-anim fx-cup-bob fx-pos-ccup">
        <Image src="/fx/cafe-cup.webp" alt="" width={160} height={160} />
      </span>
      <svg className="fx-steam fx-anim fx-steam-a fx-pos-steam-a" viewBox="0 0 40 80" aria-hidden="true">
        <path d="M14 72 C 8 56, 22 48, 14 32 C 8 20, 20 12, 16 4" />
      </svg>
      <svg className="fx-steam fx-anim fx-steam-b fx-pos-steam-b" viewBox="0 0 40 80" aria-hidden="true">
        <path d="M26 72 C 32 56, 18 48, 26 32 C 32 20, 20 12, 24 4" />
      </svg>
    </div>
  );
}
