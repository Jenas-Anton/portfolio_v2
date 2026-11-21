"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// On iOS/Android the address bar shows/hides while scrolling, which changes
// the viewport height. Without this, ScrollTrigger recalculates on every
// change and the pinned section jumps.
ScrollTrigger.config({ ignoreMobileResize: true });

export default function useHorizontalScroll(containerRef) {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray(
      containerRef.current.querySelectorAll(".panel")
    );
    if (sections.length < 2) return;

    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          id: "horizontal",
          pin: true,
          scrub: true,
          // Recompute distances after rotation / window resize (iPad split view, Mac window resize)
          invalidateOnRefresh: true,
          // Snapping is handled page-wide by usePageSnap
          end: () =>
            "+=" + containerRef.current.offsetWidth * (sections.length - 1),
        },
      });
    }, containerRef);

    // Images/fonts can change layout after mount; re-measure once loaded.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [containerRef]);
}
