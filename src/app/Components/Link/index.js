// Components/NavLink.js
import styles from './style.module.scss';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../Header/anime';

export default function NavLink({ data, isActive, setSelectedIndicator }) {
  const { label, link, index } = data;

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
        animate={isActive ? 'open' : 'closed'}
        className={styles.indicator}
      />
      <NextLink 
        href={link} 
        onClick={() => setSelectedIndicator(link)}  // update active state on click
      >
        {label}
      </NextLink>
    </motion.div>
  );
}
