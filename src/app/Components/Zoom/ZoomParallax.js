'use client';

import styles from './styles.module.scss';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function ZoomParallax({ 
  imageSrc = "/computer.png", 
  imageAlt = "computer",
  maxScale = 9,
  originX = 0.485,
  originY = 0.35,
  zoomScroll = "120vh" 
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, maxScale]);

  return (
    <>
      {/* Zoom section */}
      <div 
        ref={container} 
        className={styles.container}
        style={{ height: zoomScroll }}
      >
        <div className={styles.sticky}>
          <motion.div 
            style={{ scale, originX, originY }} 
            className={styles.el}
          >
            <div className={styles.imageContainer}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
