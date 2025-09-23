"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function Curve() {
  const [paths, setPaths] = useState({ initial: "", target: "" });

  useEffect(() => {
    const h = window.innerHeight;
    const initialPath = `M100 0 L100 ${h} Q-100 ${h / 2} 100 0`;
    const targetPath = `M100 0 L100 ${h} Q100 ${h / 2} 100 0`;
    setPaths({ initial: initialPath, target: targetPath });
  }, []);

  if (!paths.initial) return null; 

  const curve = {
    initial: { d: paths.initial },
    enter: {
      d: paths.target,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: paths.initial,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className={styles.svgCurve}>
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}
