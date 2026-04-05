"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Award,
  Code2,
  FileCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";

type ProjectType = "professional" | "personal" | "academic";
type FilterKey = "all" | ProjectType;

interface Project {
  title: string;
  description: string;
  tech: string;
  image: string;
  linkLabel: string;
  category: string;
  type: string;
  status?: string;
  href: string;
}

interface WhyChooseUs {
  title: string;
  subtitle: string;
  reasons: Array<{ title: string; text: string }>;
}

interface PortfolioData {
  subtitle: string;
  heading: string;
  description: string;
  viewCase: string;
  cta: string;
  projects: Project[];
  Warning: string;
  ui?: {
    filterBy?: string;
    filters?: {
      all?: string;
      professional?: string;
      personal?: string;
      academic?: string;
    };
    typeLabels?: {
      professional?: string;
      personal?: string;
      academic?: string;
    };
    emptyStateTitle?: string;
    emptyStateText?: string;
    ctaTitle?: string;
    ctaExplore?: string;
    ctaDescription?: string;
  };
  whyChooseUs?: WhyChooseUs;
}

interface PortfolioClientProps {
  data: PortfolioData;
  locale: string;
  isRtl: boolean;
}

export default function PortfolioClient({
  data,
  locale,
  isRtl,
}: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const projects = data.projects;
  const WHY_CHOOSE_ICONS = [Award, Code2, FileCheck];

  const ui = data.ui ?? {};

  const filters = [
    { id: "all" as const, label: ui.filters?.all ?? "All Projects" },
    {
      id: "professional" as const,
      label: ui.filters?.professional ?? "Client Work",
    },
    { id: "personal" as const, label: ui.filters?.personal ?? "Personal" },
    { id: "academic" as const, label: ui.filters?.academic ?? "Academic" },
  ];

  const typeLabels = {
    professional: ui.typeLabels?.professional ?? "Client",
    personal: ui.typeLabels?.personal ?? "Personal",
    academic: ui.typeLabels?.academic ?? "Academic",
  };

  const counts = {
    all: projects.length,
    professional: projects.filter((p) => p.type === "professional").length,
    personal: projects.filter((p) => p.type === "personal").length,
    academic: projects.filter((p) => p.type === "academic").length,
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [activeFilter, projects]);

  const ctaTitle = ui.ctaTitle ?? "Got a project idea? Let's make it happen.";
  const ctaDescription =
    ui.ctaDescription ?? "Let's build something great together.";
  const emptyTitle = ui.emptyStateTitle ?? "No projects found";
  const emptyText = ui.emptyStateText ?? "Try another filter.";

  const badgeConfig = {
    professional: {
      dot: "bg-sky-400",
      badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    },
    personal: {
      dot: "bg-violet-400",
      badge:
        "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    },
    academic: {
      dot: "bg-emerald-400",
      badge:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
  };

  const getBadge = (type: string) =>
    badgeConfig[type as keyof typeof badgeConfig] ?? badgeConfig.academic;

  return (
    <main
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden hero-section-light">
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-16 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Sparkles size={13} />
            {data.subtitle}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-[1.1]">
            {data.heading}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {data.description}
          </p>

          {/* project count strip */}
          <div className="flex flex-wrap gap-4 mt-10">
            {(["professional", "personal", "academic"] as ProjectType[]).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className="flex items-center gap-2 group"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${getBadge(type).dot}`}
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {counts[type]} {typeLabels[type as keyof typeof typeLabels]}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </section>
      {/* ── Filter Panel ── */}
      <section className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* label */}
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground shrink-0">
              {ui.filterBy ?? "Filter by"}
            </span>

            {/* divider (desktop only) */}
            <div className="hidden sm:block w-px h-5 bg-border shrink-0" />

            {/* segmented pill group */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:bg-muted/40 hover:text-foreground hover:border-muted-foreground/10"
                    }`}
                  >
                    {/* colored dot per type */}
                    {f.id !== "all" && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-opacity ${
                          isActive
                            ? "opacity-70"
                            : "opacity-50 group-hover:opacity-100"
                        } ${
                          f.id === "professional"
                            ? "bg-sky-400"
                            : f.id === "personal"
                              ? "bg-violet-400"
                              : "bg-emerald-400"
                        }`}
                      />
                    )}

                    <span>{f.label}</span>

                    {/* count badge */}
                    <span className="text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded-md transition-colors bg-primary/80 text-primary-foreground">
                      {counts[f.id]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* right: showing x of total */}
            <span className="hidden lg:block text-xs text-muted-foreground ms-auto shrink-0">
              {filteredProjects.length} / {projects.length}
            </span>
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4 border border-border">
              <Sparkles className="w-6 h-6 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold mb-1">{emptyTitle}</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              {emptyText}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => {
                return (
                  <Link
                    key={`${project.title}-${i}`}
                    href={`/${locale}${project.href}`}
                    className="group relative flex flex-col rounded-xl bg-card overflow-hidden
             border border-border/50 shadow-lg shadow-black/5
             hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30
             transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Image Container - Card Style */}
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-muted to-muted/80 shrink-0">
                      {/* Blurred background image for depth */}
                      <div className="absolute inset-0 scale-110 blur-xl opacity-30">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Main image with card-style overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />

                      {/* Modern badge design - top left */}
                      <div
                        className={`absolute top-4 ${isRtl ? "right-4" : "left-4"} z-20 flex flex-wrap gap-2`}
                      >
                        <span
                          className="px-3 py-1 text-xs font-medium rounded-full 
                             bg-black/60 backdrop-blur-md border border-white/30 
                             text-white shadow-lg"
                        >
                          {project.type}
                        </span>
                      </div>

                      {/* Hover overlay with CTA button */}
                      <div
                        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                      >
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 text-primary rounded-full font-semibold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {isRtl ? "عرض التفاصيل" : "View Details"}
                          {isRtl ? (
                            <ArrowLeft className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="relative z-10 flex flex-col flex-1 p-6 gap-4 bg-card">
                      {/* Title with underline animation */}
                      <div>
                        <h3
                          className="text-lg font-bold leading-tight line-clamp-2
                   group-hover:text-primary transition-colors duration-300"
                        >
                          {project.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Status Badge */}
                      {project.status && (
                        <div
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs 
                          bg-emerald-500/10 border border-emerald-500/20 w-fit"
                        >
                          <span className="font-medium text-emerald-600 dark:text-emerald-400 capitalize tracking-wide">
                            {project.status}
                          </span>
                        </div>
                      )}

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech
                          .split(",")
                          .slice(0, 3)
                          .map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg
                           bg-primary/10 text-primary border border-primary/25
                           group-hover:bg-primary/15 group-hover:border-primary/40
                           transition-all duration-300"
                            >
                              {t.trim()}
                            </span>
                          ))}
                      </div>

                      {/* Divider with gradient */}
                      <div className="h-px bg-gradient-to-r from-border via-border to-transparent" />

                      {/* Footer with enhanced CTA */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-muted-foreground">
                          {ui.ctaExplore}
                        </span>

                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group/cta">
                          <span className="text-xs whitespace-nowrap tracking-wide">
                            {data.viewCase}
                          </span>
                          <div className="relative w-4 h-4 flex items-center justify-center">
                            {isRtl ? (
                              <ArrowLeft
                                className="w-4 h-4 transition-transform duration-300 group-hover/cta:-translate-x-1"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowRight
                                className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary
               scale-x-0 group-hover:scale-x-100
               transition-transform duration-500 origin-left rounded-b-full"
                    />

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                      <div
                        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/15 to-transparent 
                          rotate-45 translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8
                          transition-transform duration-500"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Warning Message - Card Style with Primary Text Color */}
            <div className="mt-6 px-4 sm:px-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 text-xs sm:text-sm w-fit">
                {/* Icon */}
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.451 11.48c.75 1.335-.213 2.991-1.742 2.991H3.548c-1.53 0-2.492-1.656-1.743-2.99l6.452-11.48zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-7a1 1 0 00-.993.883L9 8v3a1 1 0 001.993.117L11 11V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>

                {/* Text */}
                <p className="leading-tight">{data.Warning}</p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ── Why Work With Me ── */}
      {data.whyChooseUs?.reasons?.length ? (
        <section className="bg-primary/5 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                {data.whyChooseUs.title}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {data.whyChooseUs.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.whyChooseUs.reasons.map((reason, index) => {
                const Icon = WHY_CHOOSE_ICONS[index % WHY_CHOOSE_ICONS.length];
                return (
                  <div
                    key={reason.title}
                    className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reason.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="relative rounded-3xl border border-border bg-card overflow-hidden p-8 sm:p-14 text-center">
          {/* background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-tight">
              {ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {ctaDescription}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              {data.cta}
              <ArrowRight size={17} className={isRtl ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
