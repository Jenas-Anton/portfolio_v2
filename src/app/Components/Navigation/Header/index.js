"use client";

import styles from "./style.module.scss";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Menu from "../Nav";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className={styles.button}
        aria-label={isActive ? "Close menu" : "Open menu"}
        aria-expanded={isActive}
      >
        <div
          className={`${styles.burger} ${
            isActive ? styles.burgerActive : ""
          }`}
        ></div>
      </button>

      <AnimatePresence mode="wait">
        {isActive && (
          <div className={styles.menuWrapper}>
            <Menu onClose={() => setIsActive(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
