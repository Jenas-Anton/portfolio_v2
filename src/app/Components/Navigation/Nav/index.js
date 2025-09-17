"use client"
import React, { useState } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../Header/anime';
import NavLink from '../Link';
import { BtnList } from '@/app/data';
import Curve from '../Curve';
export default function Menu() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (

    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >

      <Curve />
      <div className={styles.body}>
        <div
          onMouseLeave={() => setSelectedIndicator(pathname)}
          className={styles.nav}
        >
          {BtnList.map((data, index) => (
            <NavLink
              key={data.label}
              data={{ ...data, index }}
              isActive={selectedIndicator === data.link}
              setSelectedIndicator={setSelectedIndicator}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
