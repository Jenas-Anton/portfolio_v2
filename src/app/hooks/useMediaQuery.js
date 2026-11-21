"use client";
import { useEffect, useState } from "react";

// Returns whether a CSS media query matches. Starts as `false` on the server
// and first client render so hydration stays consistent, then updates.
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

// Phones and tablets: no hover, coarse (finger) pointer.
export const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
