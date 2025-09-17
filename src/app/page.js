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
      }, 2400);
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
       <section id="home">
          <div className="gap-10">
            <h1 className="name z-10 bg-gradient-to-t from-gray-500 to-white 
                        bg-clip-text text-transparent">Jenas Anton Vimal</h1>

            {/* Spacer div */}
          <div className="my-10 3xl:my-50" />
{/* You can adjust the height using margin or padding */}

            <div className="type h-5rem">
            </div>

            <div>
              <ZoomParallax 
                imageSrc="/computer.png"
                imageAlt="computer"
                maxScale={7.5}
                originX={0.45}
                inY={0.3}
              />
            </div>
          </div>
</section>

        {/* Horizontal Scroll Section */}
        <HorizontalScroll />

        <section id="contact" >
          <EmailSection/>
        </section>
      </div>
    </main>
  );
}
