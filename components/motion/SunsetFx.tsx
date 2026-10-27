"use client";

/**
 * SUNSET, LIVING: sun rays shimmer continuously and birds fly across
 * the sky on looping flight paths — on their own clock, not on scroll.
 * ALWAYS-ON (fix round 2, Oct 26): no IntersectionObserver pause
 * gating (see SceneFx for why — it froze visibly on-screen scenes
 * under real step-scrolling). Hidden entirely on mobile /
 * reduced-motion (globals.css), so the fallback stays static.
 */
/**
 * Birds DOUBLED in size for the film rebuild: the last live QA called
 * the sunset birds "tiny and easy to miss" against the darkened strip.
 * The sunset shot is full-viewport now, and the birds are 88px wide
 * with a near-black stroke, so they read as birds, not specks.
 */
function Bird({ className }: { className: string }) {
  return (
    <span className={`fx-bird-track ${className}`} aria-hidden="true">
      <svg viewBox="0 0 88 32" aria-hidden="true">
        <path
          d="M4 24 Q 24 4, 44 24 Q 64 4, 84 24"
          stroke="rgba(8, 6, 4, 0.95)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function SunsetFx() {
  return (
    <div className="sunset-fx" aria-hidden="true">
      <div className="fx-rays fx-anim fx-ray-pulse" />
      <Bird className="fx-anim fx-bird-a" />
      <Bird className="fx-anim fx-bird-b" />
      <Bird className="fx-anim fx-bird-c" />
    </div>
  );
}
