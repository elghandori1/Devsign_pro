"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface Reason {
  title: string;
  description: string;
}

interface WhyWeAreReasonsAnimatedProps {
  reasons: Reason[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: "easeOut" as const,
    },
  }),
};

export default function WhyWeAreReasonsAnimated({
  reasons,
}: WhyWeAreReasonsAnimatedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {reasons.map((reason, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1.5 sm:mb-2 text-base sm:text-lg leading-tight">
                {reason.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
