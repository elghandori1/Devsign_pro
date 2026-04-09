"use client";

import { motion } from "framer-motion";

interface WhyWeAreIntroAnimatedProps {
  description: string;
  subtitle: string;
}

export default function WhyWeAreIntroAnimated({
  description,
  subtitle,
}: WhyWeAreIntroAnimatedProps) {
  return (
    <motion.div
      className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed italic mb-6 sm:mb-8 px-2">
        &ldquo;{description}&rdquo;
      </p>
      <h3 className="text-primary font-semibold uppercase tracking-widest text-xs sm:text-sm inline-block pb-2">
        {subtitle}
      </h3>
    </motion.div>
  );
}
