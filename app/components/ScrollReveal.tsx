"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Smaller motion (less y offset) for subtle effect */
  subtle?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  subtle = false,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: subtle ? 16 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
