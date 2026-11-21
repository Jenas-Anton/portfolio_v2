'use client'
import { motion } from 'framer-motion';
import styles from './project.module.scss';
import { useState } from 'react';

const anim = {
    initial: {width: 0},
    open: {width: "auto", transition: {duration: 0.4, ease: [0.23, 1, 0.32, 1]}},
    closed: {width: 0}
}

export default function Project({project}) {
    const [isActive, setIsActive] = useState(false);
    const { title1, title2, src, link } = project;
    const [imgOk, setImgOk] = useState(true);

    // Mouse users get hover; touch users (iPhone/iPad) tap to toggle the preview.
    const onPointerEnter = (e) => { if (e.pointerType === "mouse") setIsActive(true); };
    const onPointerLeave = (e) => { if (e.pointerType === "mouse") setIsActive(false); };
    const openLink = () => window.open(link, "_blank", "noopener,noreferrer");
    // Mouse: click opens the project link. Touch: first tap previews, second tap opens.
    const onClick = (e) => {
        const isMouse = e.nativeEvent.pointerType === "mouse";
        if (link && (isMouse || isActive)) return openLink();
        if (!isMouse) setIsActive((v) => !v);
    };

    return (
        <div
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
            className={styles.project}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (link && e.key === "Enter") openLink(); else setIsActive((v) => !v); } }}
        >
            <p>{title1}</p>
            <motion.div variants={anim} initial="initial" animate={isActive ? "open" : "closed"} className={styles.imgContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {imgOk && <img src={src} alt={`${title1} ${title2}`} loading="lazy" onError={() => setImgOk(false)} />}
            </motion.div>
            <p>{title2}</p>
        </div>
    )
}
