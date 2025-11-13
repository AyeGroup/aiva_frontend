"use client";
import { motion } from "motion/react";
import Footer from "./Footer";

export default function Section12WithAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      <Footer />
    </motion.div>
  );
}
