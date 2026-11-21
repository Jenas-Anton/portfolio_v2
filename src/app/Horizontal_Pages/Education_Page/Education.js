"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { educationData } from "../../data";
import useMediaQuery, { REDUCED_MOTION_QUERY } from "../../hooks/useMediaQuery";

// ---- Timing (seconds) --------------------------------------------------------
const LINE_DURATION = 4.5; // the slow main line
const LINE_START = 4; // % from left (desktop)
const LINE_END = 96;
const ITEM_X = [10, 40, 70]; // % from left where each branch sprouts (desktop)

// Desktop branch geometry (px, relative to the junction on the main line)
const H = 130; // how far the branch travels up/down
const R = 28; // corner radius of the bend
const ARM = 56; // horizontal reach to the card
const SPLIT_Y = 40; // where the score branch splits off

const ease = [0.65, 0, 0.35, 1];

// "96.2%" -> { value: 96.2, decimals: 1, suffix: "%" }
function parseScore(score) {
  const m = String(score).match(/([\d.]+)(.*)/);
  if (!m) return { value: 0, decimals: 0, suffix: score };
  const decimals = (m[1].split(".")[1] || "").length;
  return { value: parseFloat(m[1]), decimals, suffix: m[2] };
}

function CountUp({ score, play, delay, instant }) {
  const { value, decimals, suffix } = parseScore(score);
  const [text, setText] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!play) {
      setText((0).toFixed(decimals));
      return;
    }
    if (instant) {
      setText(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      delay,
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [play, value, decimals, delay, instant]);

  return (
    <span className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}

// Variants that snap back instantly when leaving, and play with a delay when entering
const draw = (delay, duration = 0.9) => ({
  hidden: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
  show: { pathLength: 1, opacity: 1, transition: { delay, duration, ease } },
});
const pop = (delay) => ({
  hidden: { scale: 0, transition: { duration: 0 } },
  show: { scale: 1, transition: { delay, type: "spring", stiffness: 320, damping: 16 } },
});
const rise = (delay, y = 12) => ({
  hidden: { opacity: 0, y, transition: { duration: 0 } },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
});

// ---- Desktop: horizontal line with branches ---------------------------------
function DesktopTimeline({ play, instant }) {
  const t = (s) => (instant ? 0 : s);

  return (
    <div className="relative w-full h-full">
      {/* Main line */}
      <motion.div
        className="absolute h-[2px] bg-black origin-left"
        style={{ left: `${LINE_START}%`, right: `${100 - LINE_END}%`, top: "56%" }}
        variants={{
          hidden: { scaleX: 0, transition: { duration: 0 } },
          show: { scaleX: 1, transition: { duration: t(LINE_DURATION), ease: "linear" } },
        }}
      />
      {/* Fading tail at the end of the line */}
      <motion.div
        className="absolute h-[2px] bg-gradient-to-r from-black to-transparent"
        style={{ left: `${LINE_END}%`, width: "3%", top: "56%" }}
        variants={rise(t(LINE_DURATION), 0)}
      />
      {/* Glowing head that leads the line */}
      <motion.div
        className="absolute w-3 h-3 -ml-1.5 -mt-[5px] rounded-full bg-black shadow-[0_0_0_6px_rgba(0,0,0,0.08),0_0_18px_4px_rgba(0,0,0,0.25)]"
        style={{ top: "56%" }}
        variants={{
          hidden: { left: `${LINE_START}%`, opacity: 0, transition: { duration: 0 } },
          show: {
            left: `${LINE_END}%`,
            opacity: [0, 1, 1, 0],
            transition: {
              left: { duration: t(LINE_DURATION), ease: "linear" },
              opacity: { duration: t(LINE_DURATION + 0.4), times: [0, 0.03, 0.95, 1] },
            },
          },
        }}
      />

      {educationData.map((item, i) => {
        const up = i % 2 === 0;
        const s = up ? -1 : 1; // y direction
        const t0 = t((LINE_DURATION * (ITEM_X[i] - LINE_START)) / (LINE_END - LINE_START));
        const mainPath = `M0 0 V${s * (H - R)} Q0 ${s * H} ${R} ${s * H} H${ARM}`;
        const splitPath = `M0 ${s * (SPLIT_Y - 24)} Q0 ${s * SPLIT_Y} 24 ${s * SPLIT_Y} H52`;

        return (
          <div
            key={item.institution}
            className="absolute w-0 h-0"
            style={{ left: `${ITEM_X[i]}%`, top: "56%" }}
          >
            <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1" aria-hidden>
              <motion.path d={mainPath} fill="none" stroke="black" strokeWidth="1.5" variants={draw(t0 + t(0.15))} />
              <motion.path
                d={splitPath}
                fill="none"
                stroke="black"
                strokeWidth="1.5"
                variants={draw(t0 + t(0.5), 0.6)}
              />
            </svg>

            {/* Junction node + pulse */}
            <motion.span
              className="absolute -left-[7px] -top-[7px] w-3.5 h-3.5 rounded-full bg-white border-2 border-black"
              variants={pop(t0)}
            />
            <motion.span
              className="absolute -left-[7px] -top-[7px] w-3.5 h-3.5 rounded-full border border-black"
              variants={{
                hidden: { scale: 1, opacity: 0, transition: { duration: 0 } },
                show: { scale: [1, 3.2], opacity: [0.6, 0], transition: { delay: t0, duration: t(1.1), ease: "easeOut" } },
              }}
            />

            {/* Year on the opposite side of the branch */}
            <motion.span
              className={`absolute -translate-x-1/2 text-sm font-semibold tracking-[0.2em] text-black/50 ${
                up ? "top-4" : "bottom-4"
              }`}
              variants={rise(t0 + t(0.1), up ? -8 : 8)}
            >
              {item.year}
            </motion.span>

            {/* Where: card at the end of the main branch */}
            <motion.div
              className="absolute w-[clamp(220px,22vw,300px)] -translate-y-1/2"
              style={{ left: ARM + 10, top: s * H }}
              variants={rise(t0 + t(0.9), s * 12)}
            >
              <div className="bg-white border border-black/10 rounded-2xl px-5 py-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
                <p className="text-xs uppercase tracking-[0.18em] text-black/45">{item.period}</p>
                <h3 className="mt-1 text-lg xl:text-xl font-bold text-black leading-tight">{item.institution}</h3>
                <p className="mt-1 text-sm text-black/65">
                  {item.level} · {item.degree}
                </p>
              </div>
            </motion.div>

            {/* How much: score at the end of the split branch */}
            <motion.div
              className="absolute -translate-y-1/2 whitespace-nowrap"
              style={{ left: 58, top: s * SPLIT_Y }}
              variants={rise(t0 + t(1.0), 0)}
            >
              <span className="inline-block bg-black text-white text-sm font-semibold px-3 py-1 rounded-full">
                <CountUp score={item.score} play={play} delay={t0 + t(1.0)} instant={instant} />
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// ---- Phones / iPad portrait: vertical line with branches --------------------
function MobileTimeline({ play, instant }) {
  const t = (s) => (instant ? 0 : s);
  const n = educationData.length;

  return (
    <div className="relative w-full max-w-md mx-auto pl-10 pr-2">
      <motion.div
        className="absolute left-4 top-0 bottom-0 w-[2px] bg-black origin-top"
        variants={{
          hidden: { scaleY: 0, transition: { duration: 0 } },
          show: { scaleY: 1, transition: { duration: t(LINE_DURATION * 0.8), ease: "linear" } },
        }}
      />
      <div className="flex flex-col gap-6 py-2">
        {educationData.map((item, i) => {
          const t0 = t(LINE_DURATION * 0.8 * ((i + 0.3) / n));
          return (
            <div key={item.institution} className="relative">
              {/* node on the line */}
              <motion.span
                className="absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-white border-2 border-black"
                variants={pop(t0)}
              />
              {/* branch from line to card */}
              <motion.span
                className="absolute -left-[18px] top-[30px] w-[18px] h-[1.5px] bg-black origin-left"
                variants={{
                  hidden: { scaleX: 0, transition: { duration: 0 } },
                  show: { scaleX: 1, transition: { delay: t0 + t(0.15), duration: t(0.4), ease } },
                }}
              />
              <motion.div
                variants={rise(t0 + t(0.45), 10)}
                className="bg-white border border-black/10 rounded-2xl px-4 py-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-black/45">{item.period}</p>
                  <span className="shrink-0 bg-black text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    <CountUp score={item.score} play={play} delay={t0 + t(0.6)} instant={instant} />
                  </span>
                </div>
                <h3 className="mt-1 text-base font-bold text-black leading-tight">{item.institution}</h3>
                <p className="mt-0.5 text-sm text-black/65">
                  {item.level} · {item.degree}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Education() {
  const ref = useRef(null);
  // Replays every time the slide comes back into view
  const inView = useInView(ref, { amount: 0.55 });
  const instant = useMediaQuery(REDUCED_MOTION_QUERY);
  const state = inView ? "show" : "hidden";

  return (
    <div
      ref={ref}
      className="w-screen h-svh flex flex-col items-center bg-[#FCFCFC] text-black px-4 py-6 sm:p-6 overflow-y-auto lg:overflow-hidden"
    >
      <div className="text-center mt-10 mb-6 lg:mb-0">
        <h1 className="text-[clamp(2.25rem,8vh,5rem)] font-bold text-black mb-4">Education</h1>
      </div>

      {/* Desktop / laptop / iPad landscape */}
      <motion.div className="hidden lg:block relative w-full flex-1" initial="hidden" animate={state}>
        <DesktopTimeline play={inView} instant={instant} />
      </motion.div>

      {/* Phones / iPad portrait */}
      <motion.div className="lg:hidden w-full" initial="hidden" animate={state}>
        <MobileTimeline play={inView} instant={instant} />
      </motion.div>
    </div>
  );
}
