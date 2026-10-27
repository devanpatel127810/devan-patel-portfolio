"use client";

import { useRef } from "react";
import { gsap, Draggable, useGSAP, FULL_MOTION } from "@/lib/gsap";

export type BoardCard = {
  kicker: string;
  title: string;
  text: string;
  motif: MotifName;
  tone: "dark" | "gold" | "orange" | "light" | "court";
  x: string;
  y: number;
  r: number;
};

const TONE_FG: Record<BoardCard["tone"], string> = {
  dark: "#f6ead0",
  gold: "#063e36",
  orange: "#fff4e0",
  light: "#063e36",
  court: "#f6ead0",
};

type MotifName =
  | "book"
  | "dumbbell"
  | "wave"
  | "pin"
  | "car"
  | "pan"
  | "tennis"
  | "pickleball"
  | "basketball"
  | "cup";

function Motif({ name }: { name: MotifName }) {
  const common = {
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "book":
      return (
        <svg {...common}>
          <path d="M32 18 h36 a4 4 0 0 1 4 4 v56 a4 4 0 0 1 -4 4 h-36 z" />
          <path d="M32 18 v64" />
          <path d="M42 34 h20 M42 46 h20 M42 58 h14" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg {...common}>
          <path d="M28 50 h44" />
          <rect x="18" y="34" width="9" height="32" rx="2" />
          <rect x="73" y="34" width="9" height="32" rx="2" />
          <rect x="6" y="41" width="9" height="18" rx="2" />
          <rect x="85" y="41" width="9" height="18" rx="2" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M20 40 v20 M33 30 v40 M46 20 v60 M59 34 v32 M72 26 v48 M85 42 v16" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M50 90 C50 90 24 60 24 40 a26 26 0 1 1 52 0 C76 60 50 90 50 90 z" />
          <circle cx="50" cy="40" r="10" />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M10 64 C12 52 22 48 32 46 L42 33 C44 30 48 28 54 28 L64 29 C71 30 76 36 79 44 C87 47 91 54 91 64" />
          <path d="M8 64 h84" />
          <circle cx="29" cy="66" r="7.5" />
          <circle cx="73" cy="66" r="7.5" />
          <path d="M45 33 L42 46 M64 30 L68 44" />
        </svg>
      );
    case "pan":
      return (
        <svg {...common}>
          <circle cx="42" cy="56" r="24" />
          <path d="M62 42 L90 26" />
          <path d="M32 20 c-4 -5 4 -7 0 -12 M46 22 c-4 -5 4 -7 0 -12" />
        </svg>
      );
    case "tennis":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="31" />
          <path d="M27 27 C45 42 45 58 27 73 M73 27 C55 42 55 58 73 73" />
        </svg>
      );
    case "pickleball":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="31" />
          <circle cx="38" cy="38" r="3.4" />
          <circle cx="58" cy="34" r="3.4" />
          <circle cx="68" cy="52" r="3.4" />
          <circle cx="48" cy="54" r="3.4" />
          <circle cx="34" cy="60" r="3.4" />
          <circle cx="58" cy="70" r="3.4" />
        </svg>
      );
    case "basketball":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="31" />
          <path d="M19 50 h62 M50 19 v62" />
          <path d="M28 26 C40 40 40 60 28 74 M72 26 C60 40 60 60 72 74" />
        </svg>
      );
    case "cup":
      return (
        <svg {...common}>
          <path d="M28 38 h44 l-4 38 a7 7 0 0 1 -7 6 h-22 a7 7 0 0 1 -7 -6 z" />
          <path d="M72 44 c11 1 11 17 -1 20" />
          <path d="M22 90 h52" />
          <path d="M40 26 c-4 -5 4 -7 0 -12 M56 26 c-4 -5 4 -7 0 -12" />
        </svg>
      );
  }
}

const PHOTO_BG: Record<string, string> = {
  dark: "linear-gradient(150deg, #0d6a5a, #063e36)",
  gold: "linear-gradient(150deg, #f0c569, #dd9435)",
  orange: "linear-gradient(150deg, #ef9250, #cf6224)",
  light: "linear-gradient(150deg, #f6e7bd, #ecd096)",
  court: "linear-gradient(150deg, #3f8f6d, #256b4c)",
};

/**
 * The off-the-clock polaroid board. On desktop (motion allowed) the cards
 * deal in on scroll and can be dragged around with inertia (GSAP Draggable
 * + InertiaPlugin). On mobile and reduced motion it is a tidy static grid —
 * same cards, same words.
 */
export default function CourtsBoard({ cards }: { cards: BoardCard[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const zTop = useRef(10);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q(".polaroid"), {
          y: 90,
          opacity: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "opacity",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
        const draggables = Draggable.create(q(".polaroid"), {
          type: "x,y",
          bounds: ref.current,
          inertia: true,
          edgeResistance: 0.78,
          onPress(this: { target: HTMLElement }) {
            zTop.current += 1;
            gsap.set(this.target, { zIndex: zTop.current });
          },
        });
        return () => draggables.forEach((d) => d.kill());
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div className="board-wrap" data-lenis-prevent>
      <div className="board" ref={ref}>
        {cards.map((c) => (
          <article
            className="polaroid"
            key={c.title}
            style={{
              left: c.x,
              top: c.y,
              transform: `rotate(${c.r}deg)`,
              backgroundColor: undefined,
            }}
          >
            <span className="tape" aria-hidden="true" />
            <div
              className="pol-photo"
              style={{
                background: PHOTO_BG[c.tone],
                color: TONE_FG[c.tone],
              }}
              aria-hidden="true"
            >
              <Motif name={c.motif} />
            </div>
            <p className="pol-kicker">{c.kicker}</p>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </article>
        ))}
      </div>
      <p className="board-hint">it&rsquo;s my board, but go ahead — drag things around ;)</p>
    </div>
  );
}
