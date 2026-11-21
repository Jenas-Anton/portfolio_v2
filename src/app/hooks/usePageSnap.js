"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// One smooth snap for the whole page: home, each horizontal slide
// (Education / Skills / Projects) and Contact. Snap points are recalculated
// whenever ScrollTrigger refreshes (resize, rotation, fonts/images loading).
export default function usePageSnap() {
  useEffect(() => {
    let points = [0];

    const compute = () => {
      const max = ScrollTrigger.maxScroll(window);
      if (!max) return;
      const px = [0];

      const h = ScrollTrigger.getById("horizontal");
      if (h) {
        const panels = h.trigger.querySelectorAll(".panel").length;
        const step = panels > 1 ? (h.end - h.start) / (panels - 1) : 0;
        for (let i = 0; i < panels; i++) px.push(h.start + step * i);
      }

      const contact = document.querySelector("#contact");
      if (contact) {
        const top = contact.getBoundingClientRect().top + window.scrollY;
        px.push(Math.min(top, max));
      }
      px.push(max);

      points = [...new Set(px.map((v) => Math.round(v)))]
        .sort((a, b) => a - b)
        .map((v) => v / max);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = ScrollTrigger.create({
      id: "page-snap",
      start: 0,
      end: "max",
      snap: {
        snapTo: (progress, self) => {
          // Direction-aware: a small flick moves on to the next section
          const dir = self?.direction ?? 0;
          let best = points[0];
          let bestDist = Infinity;
          for (const p of points) {
            const d = Math.abs(p - progress);
            if (d < bestDist) { best = p; bestDist = d; }
          }
          if (dir !== 0 && bestDist > 0.002) {
            const ahead = dir > 0
              ? points.find((p) => p > progress + 0.002)
              : [...points].reverse().find((p) => p < progress - 0.002);
            // Only move ahead if we've already travelled a bit toward it
            const behind = dir > 0
              ? [...points].reverse().find((p) => p <= progress)
              : points.find((p) => p >= progress);
            if (ahead !== undefined && behind !== undefined) {
              const travelled = Math.abs(progress - behind) / Math.abs(ahead - behind);
              if (travelled > 0.12) best = ahead;
            }
          }
          return best;
        },
        duration: reduced ? 0 : { min: 0.35, max: 0.9 },
        delay: 0.08,
        ease: "power3.inOut",
        inertia: false,
      },
    });

    ScrollTrigger.addEventListener("refresh", compute);
    ScrollTrigger.refresh();
    compute();

    return () => {
      ScrollTrigger.removeEventListener("refresh", compute);
      st.kill();
    };
  }, []);
}
