"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Code2, FileCheck, Sparkles } from "lucide-react";

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
  ui?: {
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
    ctaDescription?: string;
  };
  whyChooseUs?: WhyChooseUs;
}

interface PortfolioClientProps {
  data: PortfolioData;
  locale: string;
  isRtl: boolean;
}

export default function PortfolioClient({ data, locale, isRtl }: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const projects = data.projects;
  const WHY_CHOOSE_ICONS = [Award, Code2, FileCheck];

  const ui = data.ui ?? {};
  const filters = [
    { id: "all" as const, label: ui.filters?.all ?? "All Projects" },
    { id: "professional" as const, label: ui.filters?.professional ?? "Professional" },
    { id: "personal" as const, label: ui.filters?.personal ?? "Personal" },
    { id: "academic" as const, label: ui.filters?.academic ?? "Academic" },
  ];

  const typeLabels = {
    professional: ui.typeLabels?.professional ?? "Professional",
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
    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter, projects]);

  const emptyTitle = ui.emptyStateTitle ?? "No projects found";
  const emptyText = ui.emptyStateText ?? "Try another filter.";
  const ctaTitle = ui.ctaTitle ?? "Ready to launch your next project?";
  const ctaDescription =
    ui.ctaDescription ?? "Let's build a modern, high-performing experience together.";

  const badgeColor = (type: string) => {
    if (type === "professional") {
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
    if (type === "personal") {
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20";
    }
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  };

  return (
    <main className="min-h-screen bg-background hero-section-light text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
        <div className="px-4 sm:px-6 py-14 sm:py-18 md:py-22">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-5">
              <Sparkles size={14} />
              {data.subtitle}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">{data.heading}</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">{data.description}</p>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-y border-border bg-background/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-all ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/70"
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeFilter === filter.id ? "bg-primary-foreground/20" : "bg-muted"}`}>
                  {counts[filter.id]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">{emptyTitle}</h2>
              <p className="text-muted-foreground">{emptyText}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={`${project.title}-${project.href}`}
                  href={`/${locale}${project.href}`}
                  className="group rounded-2xl border border-border bg-card/90 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} flex items-center gap-2`}>
                      <span className={`px-2.5 py-1 text-[11px] rounded-full border backdrop-blur-sm ${badgeColor(project.type)}`}>
                        {typeLabels[project.type as keyof typeof typeLabels]}
                      </span>
                      <span className="px-2.5 py-1 text-[11px] rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.split(",").map((tech) => (
                        <span key={`${project.title}-${tech}`} className="px-2 py-1 text-xs rounded-md bg-muted border border-border text-muted-foreground">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <div className={`inline-flex items-center gap-2 text-sm font-medium text-primary ${isRtl ? "flex-row-reverse" : ""}`}>
                      <span>{project.linkLabel || data.viewCase}</span>
                      <ArrowRight size={15} className={isRtl ? "rotate-180" : ""} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {data.whyChooseUs?.reasons?.length ? (
        <section className="px-4 sm:px-6 py-14 sm:py-18 bg-gradient-to-b from-background via-muted/5 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">{data.whyChooseUs.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{data.whyChooseUs.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.whyChooseUs.reasons.map((reason, index) => {
                const Icon = WHY_CHOOSE_ICONS[index % WHY_CHOOSE_ICONS.length];
                return (
                  <div key={reason.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 sm:px-6 py-14 sm:py-18 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{ctaTitle}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{ctaDescription}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              {data.cta}
              <ArrowRight size={18} className={isRtl ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}