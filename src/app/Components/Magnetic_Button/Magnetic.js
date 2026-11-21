import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Mag({children}) {
    const magnetic = useRef(null);

    useEffect( () => {
        const el = magnetic.current;
        if (!el) return;
        const xTo = gsap.quickTo(el, "x", {duration: 0.3, ease: "elastic.out(2.5, 0.1)"})
        const yTo = gsap.quickTo(el, "y", {duration: 0.3, ease: "elastic.out(2.5, 0.1)"})

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = el.getBoundingClientRect();
            const x = clientX - (left + width/2) 
            const y = clientY - (top + height/2) 
            xTo(x);
            yTo(y)
        }

        const mouseLeave = (e) => {
            gsap.to(el, {x: 0, duration: 0.2})
            gsap.to(el, {y: 0, duration: 0.2})
            xTo(0);
            yTo(0)
        }

        el.addEventListener("mousemove", mouseMove)
        el.addEventListener("mouseleave", mouseLeave)

        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        }
    }, [])

    return (
        React.cloneElement(children, {ref:magnetic})
    )
}