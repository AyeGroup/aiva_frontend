"use client";
import { motion } from "motion/react";
import Section from "./Section-starting";
interface Section1WithAnimationProps {
  id: string;
}

export default function Section11WithAnimation( ) {
  return (
    <motion.div
      // id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full overflow-hidden"
    >
      <div
        className="w-full flex items-center justify-center"
        style={{ height: "502px" }}
      >
        <div className="w-[1431px] h-[502px]">
          <Section />
        </div>
      </div>
    </motion.div>
  );
}
