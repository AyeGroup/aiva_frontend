"use client";
import { motion } from "motion/react";
import Section from "./Section-security";

export default function Section9WithAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
      style={{ minHeight: "686px" }}
    >
      <Section />
    </motion.div>
  );
}
