"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ZoomParallax from "./Components/ZoomParallax";
import HorizontalScroll from "./Horizontal_Pages/HorizontalScroll";
import Header from "./Components/Navigation/Header";
import Preloader from "./Components/Preloader";
import EmailSection from "./Components/Contact/Contact";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();

      document.body.style.cursor = "progress";

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "auto";
        window.scrollTo(0, 0);
      }, 3500);
    })();
  }, []);

  return (
    <main className="relative w-full">
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Page Content */}
      <div className="snap-y snap-mandatory">
        <Header />

        {/* Home Section */}
        <section
          id="home"
          className="snap-start flex flex-col items-center justify-center py-20 px-4 md:px-16 lg:px-32"
        >
          <div className="flex flex-col items-center justify-center space-y-10 md:space-y-16">
            <h1
              className="name text-[10vw] md:text-[5vw] lg:text-[4vw] font-extrabold 
                         w-full text-center bg-gradient-to-t from-gray-500 to-white 
                         bg-clip-text text-transparent z-10"
            >
              Jenas Anton
            </h1>

            {/* ZoomParallax Image */}
            <ZoomParallax
              imageSrc="/computer.png"
              imageAlt="computer"
              maxScale={6.5}
              originX={0.45}
              originY={0.3}
              className="w-[80vw] max-w-[700px] h-auto"
            />
          </div>
        </section>

        {/* Horizontal Scroll Section */}
        <HorizontalScroll />

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-16 lg:px-32">
          <EmailSection />
        </section>
      </div>
    </main>
  );
}
