"use client";

import styles from "./style.module.scss";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Menu from "../Nav";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsActive(!isActive)}
        className={styles.button}
      >
        <div
          className={`${styles.burger} ${
            isActive ? styles.burgerActive : ""
          }`}
        ></div>
      </div>

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
