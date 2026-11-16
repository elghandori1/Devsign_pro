import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCheck2,
  Search,
  Sparkles,
} from "lucide-react";
import type { Locale } from "@/i18n-config";
import { parseTechList } from "@/app/lib/portfolio";

type ProjectType = "professional" | "personal" | "academic";
type FilterKey = "all" | ProjectType;
type Project = {
  title: string;
  description: string;
  tech: string | string[];
  image: string;
  category?: string;
  type: ProjectType;
  status?: string;
  href: string;
  linkLabel?: string;
};
type PortfolioData = {
  subtitle: string;
  heading: string;
  description: string;
  viewCase: string;
  cta: string;
  Warning?: string;
  ui?: {
    filterBy?: string;
    filterHint?: string;
    showAll?: string;
    showcaseLabel?: string;
    projectsEyebrow?: string;
    projectsHeading?: string;
    projectsDescription?: string;
    filters?: Record<string, string>;
    typeLabels?: Record<string, string>;
    statusLabels?: Record<string, string>;
    emptyStateTitle?: string;
    emptyStateText?: string;
    ctaTitle?: string;
    ctaExplore?: string;
    ctaDescription?: string;
  };
  whyChooseUs?: {
    title: string;
    subtitle: string;
    reasons: Array<{ title: string; text: string }>;
  };
  relatedServices?: {
    title: string;
    items: Array<{ title: string; description: string; href: string; label: string }>;
  };
};
type Props = {
  data: PortfolioData;
  locale: Locale;
  isRtl: boolean;
  allProjects: Project[];
  filteredProjects: Project[];
  activeFilter: FilterKey;
};

const PROOF_ICONS = [Search, Code2, CheckCircle2] as const;
const badgeConfig = {
  professional: "border-sky-400/30 bg-sky-500/15 text-sky-100",
  personal: "border-violet-400/30 bg-violet-500/15 text-violet-100",
  academic: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
};

export default function PortfolioContent({
  data,
  locale,
  isRtl,
  allProjects,
  filteredProjects,
  activeFilter,
}: Props) {
  const ui = data.ui ?? {};
  const filters: { id: FilterKey; label: string }[] = [
    { id: "all", label: ui.filters?.all ?? "All projects" },
    { id: "professional", label: ui.filters?.professional ?? "Client work" },
    { id: "personal", label: ui.filters?.personal ?? "Personal" },
    { id: "academic", label: ui.filters?.academic ?? "Academic" },
  ];
  const typeLabels = {
    professional: ui.typeLabels?.professional ?? "Client",
    personal: ui.typeLabels?.personal ?? "Personal",
    academic: ui.typeLabels?.academic ?? "Academic",
  };
  const counts = {
    all: allProjects.length,
    professional: allProjects.filter((project) => project.type === "professional").length,
    personal: allProjects.filter((project) => project.type === "personal").length,
    academic: allProjects.filter((project) => project.type === "academic").length,
  };
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <main className="min-h-screen bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <section
        className="relative overflow-hidden border-b border-border hero-section-light"
        aria-labelledby="portfolio-heading"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_74%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles size={15} aria-hidden="true" />
            {data.subtitle}
          </p>
          <h1
            id="portfolio-heading"
            className="mt-4 max-w-5xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            {data.heading}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {data.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {ui.ctaExplore ?? data.viewCase}
              <Arrow size={17} aria-hidden="true" />
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary"
            >
              {data.cta}
            </Link>
          </div>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-7 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {ui.projectsEyebrow ?? data.subtitle}
              </p>
              <h2 id="projects-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {ui.projectsHeading ?? ui.showcaseLabel ?? "Selected projects"}
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                {ui.projectsDescription}
              </p>
            </header>
            {data.Warning ? (
              <aside className="rounded-2xl border border-border bg-card p-5" aria-label={ui.projectsEyebrow}>
                <div className="flex gap-3">
                  <FileCheck2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{data.Warning}</p>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <nav
        aria-label={ui.filterBy ?? "Project filters"}
        className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const href =
                filter.id === "all"
                  ? `/${locale}/portfolio`
                  : `/${locale}/portfolio?filter=${filter.id}`;
              return (
                <Link
                  key={filter.id}
                  href={href}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[11px] tabular-nums ${
                      isActive ? "bg-white/15" : "bg-muted text-foreground"
                    }`}
                  >
                    {counts[filter.id]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <section
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16"
        aria-label={ui.showcaseLabel ?? "Project showcase"}
      >
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-6 py-20 text-center">
            <h2 className="text-xl font-semibold">{ui.emptyStateTitle ?? "No projects found"}</h2>
            <p className="mt-2 text-muted-foreground">{ui.emptyStateText ?? "Try another filter."}</p>
            <Link href={`/${locale}/portfolio`} className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary hover:underline">
              {ui.showAll ?? "Show all"}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2" role="list">
            {filteredProjects.map((project, index) => {
              const tech = parseTechList(project.tech).slice(0, 5);
              const label = project.linkLabel || data.viewCase;
              return (
                <article
                  key={project.href}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-black/10"
                  role="listitem"
                >
                  <Link
                    href={`/${locale}${project.href}`}
                    className="flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={`${label}: ${project.title}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" aria-hidden="true" />
                      <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
                            badgeConfig[project.type]
                          }`}
                        >
                          {typeLabels[project.type]}
                        </span>
                        {project.status ? (
                          <span className="rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                            {ui.statusLabels?.[project.status] ?? project.status}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {project.category ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">
                          {project.category}
                        </p>
                      ) : null}
                      <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight group-hover:text-primary sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {project.description}
                      </p>
                      {tech.length ? (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {tech.map((item) => (
                            <li key={item} className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <span className="mt-6 inline-flex min-h-11 items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary">
                        {label}
                        <Arrow className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {data.whyChooseUs?.reasons?.length ? (
        <section className="border-y border-border bg-card" aria-labelledby="case-study-content-heading">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
            <header className="max-w-3xl">
              <h2 id="case-study-content-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {data.whyChooseUs.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{data.whyChooseUs.subtitle}</p>
            </header>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {data.whyChooseUs.reasons.map((reason, index) => {
                const Icon = PROOF_ICONS[index] ?? CheckCircle2;
                return (
                  <article key={reason.title} className="rounded-2xl border border-border bg-background p-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
                      <Icon size={21} />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{reason.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{reason.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {data.relatedServices?.items?.length ? (
        <section aria-labelledby="portfolio-services-heading" className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 id="portfolio-services-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
              {data.relatedServices.title}
            </h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-3">
              {data.relatedServices.items.map((item) => (
                <li key={item.href}>
                  <Link href={`/${locale}${item.href}`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-primary/35">
                    <span className="text-lg font-semibold">{item.title}</span>
                    <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
                    <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-primary">
                      {item.label}<Arrow className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-12 sm:px-6 sm:py-20" aria-labelledby="portfolio-cta-heading">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border hero-section-light px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 id="portfolio-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {ui.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{ui.ctaDescription}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {data.cta}<Arrow size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
