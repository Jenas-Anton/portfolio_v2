"use client";
import React from "react";
import BallCanvas from "./Canvas/Ball";
import { SkillData } from "../../data";
import { motion } from "framer-motion";
const staggerContainer = (staggerChildren = 0.2, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0, ease: "easeOut" } },
};

const Skills = () => {
  return (
    <motion.div
      className="w-screen min-h-screen flex flex-col items-center gap-10 p-6 sm:p-6"
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.75 }}
    >
      {/* Heading Section */}
      <div className="text-center mt-10">
        <h1 className="text-[8vh] font-bold bg-clip-text text-black mb-4">
          My Skills
        </h1>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
      </div>

      {/* Skills Grid */}
      <motion.div
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="
          flex flex-wrap justify-center items-center 
          gap-4 sm:gap-6 md:gap-10 mt-6 w-full px-4
          max-h-[70vh] overflow-y-auto pb-20
        "
      >
        {SkillData.map((skillData) => (
          <motion.div
            key={skillData.name}
            className="
              w-20 h-24 
              sm:w-24 sm:h-28 
              md:w-28 md:h-32 
              lg:w-36 lg:h-40 
              flex flex-col items-center 
              group transition-transform duration-300 hover:scale-105 
            "
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28">
              <BallCanvas icon={skillData.src} />
            </div>
            <p className="text-black text-sm sm:text-base md:text-lg font-semibold mt-3 text-center">
              {skillData.name}
            </p>
          </motion.div>
        ))}
</motion.div>

    </motion.div>
  );
};

export default Skills;
