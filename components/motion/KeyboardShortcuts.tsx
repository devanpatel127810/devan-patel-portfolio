"use client";

import { useEffect } from "react";
import { profile } from "@/lib/data";

/** James-style keyboard shortcuts: G GitHub, L LinkedIn, M mail, R résumé. */
export default function KeyboardShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      switch (e.key.toLowerCase()) {
        case "g":
          window.open(profile.github, "_blank", "noopener");
          break;
        case "l":
          window.open(profile.linkedin, "_blank", "noopener");
          break;
        case "m":
          window.location.href = `mailto:${profile.email}`;
          break;
        case "r":
          window.open("/resume.pdf", "_blank", "noopener");
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
