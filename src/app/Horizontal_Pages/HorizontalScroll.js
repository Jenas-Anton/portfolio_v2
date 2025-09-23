  "use client";
  import React, { useRef } from "react";
  import useHorizontalScroll from "./useHorizontalScroll";
  import Skills from "./Skills_page/Skills";
  import Project from "./Project_Page/Project"; 
  import { projects } from "../data";
  import {motion} from "framer-motion";

  export default function HorizontalScroll() {
    const containerRef = useRef(null);

    useHorizontalScroll(containerRef);

    return (
      <div ref={containerRef} className="relative bg-[#FCFCFC] h-screen overflow-hidden">
        <div className="flex">

          {/* <section id="education" className="panel">
            <EducationTimeline />
          </section> */}
          

          {/* First Horizontal Section */}
          <section id = "skills" className="panel ">
            <Skills />
          </section>

          {/* second Horizontal section */}
          <section id = "projects" className="panel  text-black">
            <motion.div
              className="w-screen h-screen  flex flex-col items-center gap-10 p-6 "
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.75 }}
            >
              <div className="text-center mt-10 mb-20 justify-start">
                <h1 className="text-[8vh] position-top justify-start font-bold bg-clip-text text-black mb-4">
                  My Projects
                </h1>
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