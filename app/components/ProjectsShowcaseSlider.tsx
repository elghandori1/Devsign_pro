// components/ProjectsShowcaseSlider.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/i18n-config";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  tech: string;
  image: string;
  linkLabel: string;
  category?: string;
  type?: "professional" | "personal" | "academic";
  href: string;
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const isRtl = locale === "ar";

  const projectlist = projects
    .filter((p) => p.type === "professional")
    .slice(0, 3);
  const project = projectlist[index];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % projectlist.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projectlist.length]);

  const goNext = () => {
    setIsAutoPlaying(false);
    setIndex((i) => (i + 1) % projectlist.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goPrev = () => {
    setIsAutoPlaying(false);
    setIndex((i) => (i - 1 + projectlist.length) % projectlist.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setDirection(1);
    goNext();
  };

  const handlePrev = () => {
    setDirection(-1);
    goPrev();
  };

  const slideVariant = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80,
      scale: 0.95,
    }),
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative mb-12 sm:mb-16">
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
        {/* Image Section with Enhanced Design */}
        <div className="relative group">
          <div className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.image + index}
                custom={direction}
                variants={slideVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Category Badge */}
            {project.category && (
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm rounded-full">
                  {project.category}
                </span>
              </div>
            )}

            {/* Navigation Controls - Bottom */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10">
              {/* Progress Dots */}
              <div className="hidden sm:flex gap-1.5 sm:gap-2 bg-background/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2">
                {projectlist.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIsAutoPlaying(false);
                      setIndex(i);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={`relative h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === index
                      ? "w-6 sm:w-8 bg-primary"
                      : "w-1.5 sm:w-2 bg-white/60 hover:bg-white/80"
                      }`}
                    aria-label={`Project ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                    {i === index && (
                      <motion.div
                        className="absolute inset-0 bg-primary rounded-full"
                        layoutId="activeDot"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-1.5 sm:gap-2 ml-auto sm:ml-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105"
                  aria-label={isRtl ? "Next project" : "Previous project"}
                >
                  {isRtl ? (
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105"
                  aria-label={isRtl ? "Previous project" : "Next project"}
                >
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 lg:hidden">
            {projectlist.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${i === index
                  ? "w-4 sm:w-6 bg-primary"
                  : "w-1.5 sm:w-2 bg-muted-foreground/30"
                  }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div
          className={`flex flex-col justify-center px-2 sm:px-0 ${isRtl ? "text-right" : "text-left"}`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Title - Responsive font sizes */}
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {project.title}
              </h3>

              {/* Description - Responsive text */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack - Responsive chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.split(",").map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full font-medium"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              {/* CTA Button - Responsive sizing */}
              <div className="pt-3 sm:pt-4">
                <Link
                  href={`/${locale}/${project.href}`}
                  className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:pr-6 sm:hover:pr-8 hover:pl-6 sm:hover:pl-8"
                >
                  <span className="relative z-10">{project.linkLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Auto-play indicator - Responsive positioning */}
      {isAutoPlaying && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex gap-1.5 sm:gap-2 items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm border border-border">
            <div className="text-xs sm:text-sm text-muted-foreground">Auto-playing</div>
            <button
              onClick={() => setIsAutoPlaying(false)}
              className="text-xs sm:text-sm text-primary hover:underline font-medium"
            >
              Pause
            </button>
          </div>
        </div>
      )}
    </div>
  );
}