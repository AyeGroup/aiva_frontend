"use client";
import { motion } from "motion/react";
import Section from "./Section-faq";

export default function Section10WithAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
      style={{ minHeight: "930px" }}
    >
      <Section />
    </motion.div>
  );
}
