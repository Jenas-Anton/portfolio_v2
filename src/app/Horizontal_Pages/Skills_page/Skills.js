"use client";
import React, { useEffect, useRef } from "react";
import BallCanvas from "./Canvas/Ball";
import { SkillData } from "../../data";
import { motion } from "framer-motion";
import useMediaQuery, {
  TOUCH_QUERY,
  REDUCED_MOTION_QUERY,
} from "../../hooks/useMediaQuery";

const staggerContainer = (staggerChildren = 0.2, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0, ease: "easeOut" } },
};

// When the skills grid can't scroll any further in the direction the user is
// scrolling, hand the scroll to the page so the horizontal section keeps moving
// instead of getting stuck on the grid.
function useScrollHandoff(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const atEnd = (dy) =>
      dy > 0
        ? el.scrollTop + el.clientHeight >= el.scrollHeight - 1
        : el.scrollTop <= 0;

    const onWheel = (e) => {
      // Normalise line/page deltas (Firefox) to pixels
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
      if (!dy || !atEnd(dy)) return;
      e.preventDefault();
      window.scrollBy(0, dy);
    };

    let lastY = null;
    const onTouchStart = (e) => { lastY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (lastY === null) return;
      const y = e.touches[0].clientY;
      const dy = lastY - y;
      lastY = y;
      if (!dy || !atEnd(dy)) return;
      e.preventDefault();
      window.scrollBy(0, dy);
    };
    const onTouchEnd = () => { lastY = null; };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref]);
}

const Skills = () => {
  const gridRef = useRef(null);
  useScrollHandoff(gridRef);
  // Phones/tablets get flat icons instead of 15 WebGL canvases: iOS Safari
  // limits live WebGL contexts, and the 3D balls capture touch so the page
  // can't be scrolled over them.
  const isTouch = useMediaQuery(TOUCH_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const showStaticIcons = isTouch || reducedMotion;

  return (
    <motion.div
      className="w-screen min-h-svh flex flex-col items-center gap-10 p-6 sm:p-6"
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.75 }}
    >
      {/* I put my skills here Title */}
      <div className="text-center mt-10">
        <h1 className="text-[clamp(2.25rem,8vh,5rem)] font-bold bg-clip-text text-black mb-4">
          My Skills
        </h1>
      </div>

      {/* Skills Grid */}
      <motion.div
        ref={gridRef}
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="
          flex flex-wrap justify-center items-center 
          gap-4 sm:gap-6 md:gap-10 mt-6 w-full px-4
          max-h-[70svh] overflow-y-auto pb-20
        "
      >
        {SkillData.map((skillData) => (
          <motion.div
            key={skillData.name}
            className="
              w-20 h-24 
              sm:w-24 sm:h-28 
              md:w-28 md:h-32 
              lg:w-36 lg:h-40 
              flex flex-col items-center 
              group transition-transform duration-300 hover:scale-105 
            "
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center">
              {showStaticIcons ? (
                <div className="w-[80%] h-[80%] rounded-full bg-[#797575] p-2 shadow-md flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skillData.src}
                    alt={skillData.name}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <BallCanvas icon={skillData.src} />
              )}
            </div>
            <p className="text-black text-sm sm:text-base md:text-lg font-semibold mt-3 text-center">
              {skillData.name}
            </p>
          </motion.div>
        ))}
</motion.div>

    </motion.div>
  );
};

export default Skills;
