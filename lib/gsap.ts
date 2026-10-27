"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

/**
 * Plugins are registered exactly once, at module scope, the first time any
 * client component imports this module. Never register inside an effect.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin, Draggable, InertiaPlugin);

/** The single motion gate: full scenes only on wider screens, motion allowed. */
export const FULL_MOTION = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
/** Gentle reveals at any width, still only when motion is allowed. */
export const ANY_MOTION = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, MotionPathPlugin, Draggable, useGSAP };
