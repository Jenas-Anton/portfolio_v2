"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHorizontalScroll(containerRef) {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let sections = gsap.utils.toArray(
      containerRef.current.querySelectorAll(".panel")
    );

    let ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: true,  // immediate, no lag
            snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0,   // instant snap (hard lock)
            },
            end: () => "+=" + containerRef.current.offsetWidth * (sections.length - 1),
        },
        });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
