"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Locale } from "@/i18n-config";

interface ProjectSummary {
  title: string;
  description: string;
  tech: string;
  image: string;
  linkLabel: string;
  category?: string;
  href: string;
}

interface ProjectsShowcaseScrollerProps {
  projects: ProjectSummary[];
  locale: Locale;
}

const LABELS: Record<
  Locale,
  {
    previous: string;
    next: string;
    viewAll: string;
    scrollHint: string;
    tech: string;
    preview: string;
    goTo: string;
  }
> = {
  fr: {
    previous: "Réalisation précédente",
    next: "Réalisation suivante",
    viewAll: "Voir toutes les réalisations",
    scrollHint: "Faites défiler pour explorer les projets",
    tech: "Technologies utilisées",
    preview: "Aperçu du projet",
    goTo: "Aller à la réalisation",
  },
  en: {
    previous: "Previous project",
    next: "Next project",
    viewAll: "View all projects",
    scrollHint: "Scroll to explore the projects",
    tech: "Technologies used",
    preview: "Project preview:",
    goTo: "Go to project",
  },
  ar: {
    previous: "المشروع السابق",
    next: "المشروع التالي",
    viewAll: "عرض جميع المشاريع",
    scrollHint: "مرّر لاستكشاف المشاريع",
    tech: "التقنيات المستخدمة",
    preview: "معاينة المشروع",
    goTo: "الانتقال إلى المشروع",
  },
};

export default function ProjectsShowcaseScroller({
  projects,
  locale,
}: ProjectsShowcaseScrollerProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isRtl = locale === "ar";
  const labels = LABELS[locale];

  const scrollToProject = (index: number) => {
    const list = listRef.current;
    const item = list?.children.item(index) as HTMLElement | null;

    if (!list || !item) return;

    item.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(index);
  };

  const updateActiveProject = () => {
    const list = listRef.current;
    if (!list || scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const listStart = list.getBoundingClientRect().left;
      const nextIndex = Array.from(list.children).reduce(
        (closest, item, index) => {
          const distance = Math.abs(item.getBoundingClientRect().left - listStart);
          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      ).index;

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
      scrollFrameRef.current = null;
    });
  };

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const PreviousArrow = isRtl ? ArrowRight : ArrowLeft;
  const NextArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="mx-auto max-w-7xl" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-medium text-muted-foreground sm:text-sm">
          {labels.scrollHint}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToProject(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label={labels.previous}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
          >
            <PreviousArrow size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToProject(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            aria-label={labels.next}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
          >
            <NextArrow size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ol
        ref={listRef}
        onScroll={updateActiveProject}
        className="m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth p-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
        aria-label={labels.viewAll}
      >
        {projects.map((project, index) => {
          const href = `/${locale}${project.href}`;

          return (
            <li
              key={project.href}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`w-[92%] max-w-[1160px] shrink-0 snap-start transition-opacity duration-500 first:ms-0 sm:w-[88%] lg:w-[86%] ${
                index === activeIndex ? "opacity-100" : "opacity-70"
              }`}
            >
              <article
                className={`group grid h-full overflow-hidden rounded-[1.75rem] border bg-card transition-all duration-500 md:min-h-[500px] md:grid-cols-[1.08fr_0.92fr] ${
                  index === activeIndex
                    ? "border-primary/25 shadow-[0_24px_70px_-42px_rgba(37,99,235,0.65)]"
                    : "border-border shadow-sm"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto md:min-h-full">
                  <Image
                    src={project.image}
                    alt={`${labels.preview} ${project.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 640px"
                    className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.025]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="relative flex min-w-0 flex-col p-5 sm:p-7 lg:p-10">
                  <div
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                    {project.category && (
                      <span className="max-w-[70%] rounded-full border border-border px-3 py-1 text-end text-xs font-medium text-muted-foreground">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex list-none flex-wrap gap-2 p-0" aria-label={labels.tech}>
                    {project.tech
                      .split(",")
                      .slice(0, 4)
                      .map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {technology.trim()}
                        </li>
                      ))}
                  </ul>

                  <Link
                    href={href}
                    className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mt-auto"
                  >
                    {project.linkLabel}
                    <NextArrow size={17} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-1" aria-label={labels.scrollHint}>
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.href}
              onClick={() => scrollToProject(index)}
              aria-label={`${labels.goTo} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className="flex size-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <Link
          href={`/${locale}/portfolio`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:text-primary"
        >
          {labels.viewAll}
          <NextArrow size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
