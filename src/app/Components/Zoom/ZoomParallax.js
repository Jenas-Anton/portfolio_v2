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
  // Fade to the Skills background (#FCFCFC) at the end of the zoom so the
  // off-white, pixelated screen edge doesn't show as a seam.
  const washOpacity = useTransform(scrollYProgress, [0.75, 0.98], [0, 1]);

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
                // Small pixel-art PNG: serve as-is (resizing only blurs it, and
                // skips the WebP conversion that hangs in local dev)
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </div>
          </motion.div>
          <motion.div className={styles.wash} style={{ opacity: washOpacity }} />
        </div>
      </div>
    </>
  );
}
