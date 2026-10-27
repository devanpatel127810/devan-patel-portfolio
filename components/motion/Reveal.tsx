"use client";

import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";

/**
 * Gentle fade-and-rise when a block scrolls into view.
 * Runs at any width, but only when the user allows motion — with reduced
 * motion (or no JS) the content is simply visible, untouched.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        gsap.from(ref.current, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
