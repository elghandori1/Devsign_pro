// components/ProjectsShowcaseSlider.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Locale } from "@/i18n-config";
import { ProjectItem } from "./ProjectsShowcase";

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
  const goPrev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  if (!project) return null;

return (
<div
  role="region"
  aria-roledescription="carousel"
  aria-label={
    locale === "ar"
      ? "عرض المشاريع"
      : locale === "fr"
        ? "Études de cas"
        : "Project showcase"} 
      className="relative mb-12 sm:mb-16 bg-muted/10 p-6 rounded-xl">
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
        {/* ── Image Side ── */}
        <div className="relative group">
          <div className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-muted">
            {projects.map((p, i) => (
              <div
                key={p.href}
                className={`absolute inset-0 ${
                  i === index
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
                aria-hidden={i !== index}
              >
                <Image
                  src={p.image}
                  alt={`${p.title} project screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}

            {/* Category Badge */}
            {project.category && (
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm rounded-full shadow-sm">
                  {project.category}
                </span>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex items-center justify-between z-20">
              {/* Dots */}
              <div className="hidden sm:flex gap-1.5 sm:gap-2 bg-background/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-6 sm:w-8 bg-primary"
                        : "w-1.5 sm:w-2 bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`${
                      locale === "ar"
                        ? "الانتقال إلى المشروع"
                        : locale === "fr"
                          ? "Aller au projet"
                          : "Go to project"
                    } ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-1.5 sm:gap-2 ml-auto sm:ml-0">
                <button
                  type="button"
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 shadow-sm"
                  aria-label={isRtl ? "Next project" : "Previous project"}
                >
                  {isRtl ? (
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 shadow-sm"
                  aria-label={isRtl ? "Previous project" : "Next project"}
                >
                  {isRtl ? (
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 lg:hidden">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-6 px-1 inline-flex items-center justify-center rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 sm:w-10 bg-primary/20"
                    : "w-6 sm:w-8 bg-muted-foreground/15"
                }`}
                aria-label={`${
                  locale === "ar"
                    ? "الانتقال إلى المشروع"
                    : locale === "fr"
                      ? "Aller au projet"
                      : "Go to project"
                } ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-4 sm:w-6 bg-primary"
                      : "w-1.5 sm:w-2 bg-muted-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Text Side ── */}
        <div
          className={`flex flex-col justify-center px-2 sm:px-0 ${
            isRtl ? "text-right" : "text-left"
          }`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div
            className="space-y-4 sm:space-y-6"
            aria-live="polite"
            aria-atomic="true"
          >
            {project.status && (
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-500 capitalize tracking-wide">
                  {project.status}
                </span>
              </div>
            )}

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {project.title}
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <ul className="flex flex-wrap gap-1.5 sm:gap-2 list-none p-0 m-0">
              {project.tech.split(",").map((tech, idx) => (
                <li
                  key={idx}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full font-medium"
                >
                  {tech.trim()}
                </li>
              ))}
            </ul>

            <div className="pt-3 sm:pt-4">
              <Link
                href={`/${locale}${project.href}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>{project.linkLabel}</span>
                {isRtl ? (
                  <ArrowLeft size={16} aria-hidden="true" />
                ) : (
                  <ArrowRight size={16} aria-hidden="true" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}