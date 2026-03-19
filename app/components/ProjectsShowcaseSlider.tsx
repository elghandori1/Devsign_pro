"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/i18n-config";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ProjectItem {
  title: string;
  description: string;
  tech: string;
  image: string;
  linkLabel: string;
}

interface ProjectsShowcaseSliderProps {
  projects: ProjectItem[];
  locale: Locale;
}

export default function ProjectsShowcaseSlider({
  projects,
  locale,
}: ProjectsShowcaseSliderProps) {
  const [index, setIndex] = useState(0);
  const isRtl = locale === "ar";
  const project = projects[index];

  const goNext = () => setIndex((i) => (i + 1) % projects.length);
  const goPrev = () =>
    setIndex((i) => (i - 1 + projects.length) % projects.length);

  const slideVariant = {
    initial: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const [direction, setDirection] = useState(0);
  const handleNext = () => {
    setDirection(1);
    goNext();
  };
  const handlePrev = () => {
    setDirection(-1);
    goPrev();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-stretch">
      {/* Image swipe area */}
      <div className="relative aspect-square w-full max-w-[510px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border bg-muted/30">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.image + index}
            custom={direction}
            variants={slideVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 540px"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Dots + Swipe controls in one row */}
        <div
          className={`absolute bottom-4 inset-x-4 flex items-center justify-between ${isRtl ? "flex-row-reverse" : ""}`}
          aria-label="Project navigation"
        >
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-background/60 hover:bg-background/80"
                }`}
                aria-label={`Project ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              aria-label={isRtl ? "Next project" : "Previous project"}
            >
              {isRtl ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              aria-label={isRtl ? "Previous project" : "Next project"}
            >
              {isRtl ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Project details */}
      <div
        className={`flex flex-col justify-center ${isRtl ? "text-right" : "text-left"}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <p className="text-sm text-primary font-medium">{project.tech}</p>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {project.linkLabel}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
