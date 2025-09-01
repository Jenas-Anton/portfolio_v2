"use client";
import React, { useRef } from "react";
import useHorizontalScroll from "./useHorizontalScroll"; // adjust path
import Skills from "../Skills";

export default function HorizontalScroll() {
  const containerRef = useRef(null);

  // Apply horizontal scroll effect
  useHorizontalScroll(containerRef);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="flex">
        <section className="panel bg-[#FCFCFC]">
          <Skills />
        </section>
        <section className="panel w-screen h-screen flex-shrink-0 flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
        
          Panel 2
        </section>
        <section className="panel w-screen h-screen flex-shrink-0 flex items-center justify-center bg-green-500 text-white text-4xl font-bold">
          Panel 3
        </section>
        <section className="panel w-screen h-screen flex-shrink-0 flex items-center justify-center bg-purple-500 text-white text-4xl font-bold">
          Panel 4
        </section>
      </div>
    </div>
  );
}
