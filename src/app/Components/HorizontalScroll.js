  "use client";
  import React, { useRef } from "react";
  import useHorizontalScroll from "./useHorizontalScroll";
  import Skills from "./Skills";
  import Project from "./Project"; 
  import { projects } from "../data";
  import {motion} from "framer-motion";

  export default function HorizontalScroll() {
    const containerRef = useRef(null);

    // Apply horizontal scroll effect
    useHorizontalScroll(containerRef);

    return (
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="flex">
          {/* Panel 1 */}
          <section id = "skills" className="panel bg-[#FCFCFC]">
            <Skills />
          </section>

          {/* Panel 2 */}
          <section id = "projects" className="panel bg-[#FCFCFC] text-black">
            <motion.div
              className="w-screen h-screen  flex flex-col items-center gap-10 p-6 "
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.75 }}
            >
              <div className="text-center mt-20 mb-20 justify-start">
                <h1 className="text-[8vh] position-top justify-start font-bold bg-clip-text text-black mb-4">
                  My Projects
                </h1>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
              </div>
            <div className="gallery ">
              {projects.map((project, index) => (
                <Project key={index} project={project} />
              ))}
            </div>
            </motion.div>
          </section>
        </div>
      </div>
    );
  }
