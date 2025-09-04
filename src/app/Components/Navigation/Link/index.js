"use client";
import styles from "./style.module.scss";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "../Header/anime";

export default function NavLink({ data, isActive, setSelectedIndicator }) {
  const { label, link, index } = data;

  const handleClick = (e) => {
    if (link.startsWith("/#") || link.startsWith("#")) {
      e.preventDefault();
      const id = link.replace("/#", "#"); 
      const section = document.querySelector(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setSelectedIndicator(link);
      }
    } else {
      setSelectedIndicator(link);
    }
  };

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => setSelectedIndicator(link)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      />
      <NextLink href={link} onClick={handleClick}>
        {label}
      </NextLink>
    </motion.div>
  );
}
