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
    <main>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Page Content */}
      <div className="snap-y snap-mandatory">
        <Header />

        {/* Home Section */}
        <section id="home" className="snap-start">
          <div>
            <h1 className="name text-[5vw] font-extrabold w-full bg-gradient-to-t from-gray-500 to-white 
                 bg-clip-text text-transparent items-center justify-center mt-10 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              Jenas Anton
            </h1>
            <div className="type mb-6 sm:mb-8 md:mb-10"></div>
            
            {/* Added container with proper spacing */}
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
              <ZoomParallax
                imageSrc="/computer.png"
                imageAlt="computer"
                maxScale={6.5}
                originX={0.45}
                originY={0.3}
              />
            </div>
          </div>
        </section>

        {/* Horizontal Scroll Section */}
        <HorizontalScroll />

        <section id="contact">
          <EmailSection/>
        </section>
      </div>
    </main>
  );
}