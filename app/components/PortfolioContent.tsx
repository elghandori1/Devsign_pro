import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Award,
  Code2,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { Locale } from "@/i18n-config";
import { parseTechList } from "@/app/lib/portfolio";

type ProjectType = "professional" | "personal" | "academic";
type FilterKey = "all" | ProjectType;

interface Project {
  title: string;
  description: string;
  tech: string | string[];
  image: string;
  category?: string;
  type: ProjectType;
  status?: string;
  href: string;
  linkLabel?: string;
}

interface WhyChooseUs {
  title: string;
  subtitle: string;
  reasons: Array<{ title: string; text: string }>;
}

interface PortfolioUi {
  filterBy?: string;
  filterHint?: string;
  showAll?: string;
  showcaseLabel?: string;
  filters?: Record<string, string>;
  typeLabels?: Record<string, string>;
  statusLabels?: Record<string, string>;
  emptyStateTitle?: string;
  emptyStateText?: string;
  ctaTitle?: string;
  ctaExplore?: string;
  ctaDescription?: string;
}

interface PortfolioData {
  subtitle: string;
  heading: string;
  description: string;
  viewCase: string;
  cta: string;
  Warning?: string;
  ui?: PortfolioUi;
  whyChooseUs?: WhyChooseUs;
}

interface PortfolioContentProps {
  data: PortfolioData;
  locale: Locale;
  isRtl: boolean;
  allProjects: Project[];
  filteredProjects: Project[];
  activeFilter: FilterKey;
}

const WHY_CHOOSE_ICONS = [Award, Code2, FileCheck];

const badgeConfig = {
  professional: {
    dot: "bg-sky-400",
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  personal: {
    dot: "bg-violet-400",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
  academic: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
};

export default function PortfolioContent({
  data,
  locale,
  isRtl,
  allProjects,
  filteredProjects,
  activeFilter,
}: PortfolioContentProps) {
  const ui = data.ui ?? {};

  const filters: { id: FilterKey; label: string }[] = [
    { id: "all", label: ui.filters?.all ?? "All Projects" },
    { id: "professional", label: ui.filters?.professional ?? "Client Work" },
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
    professional: allProjects.filter((p) => p.type === "professional").length,
    personal: allProjects.filter((p) => p.type === "personal").length,
    academic: allProjects.filter((p) => p.type === "academic").length,
  };

  const getBadge = (type: string) =>
    badgeConfig[type as keyof typeof badgeConfig] ?? badgeConfig.academic;

  const localizeStatus = (status: string) => ui.statusLabels?.[status] ?? status;

  const emptyTitle = ui.emptyStateTitle ?? "No projects found";
  const emptyText = ui.emptyStateText ?? "Try another filter.";
  const ctaTitle = ui.ctaTitle ?? "Got a project idea? Let's make it happen.";
  const ctaDescription = ui.ctaDescription ?? "Let's build something great together.";
  const viewDetails = ui.ctaExplore ?? data.viewCase;
  const showAll = ui.showAll ?? "Show all";
  const filterHint = ui.filterHint ?? "";
  const showcaseLabel = ui.showcaseLabel ?? "Project showcase";

  return (
    <main className="min-h-screen bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden hero-section-light border-b border-border" aria-labelledby="portfolio-heading">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "48px 48px" }} aria-hidden="true" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-16 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Sparkles size={13} aria-hidden="true" />
            {data.subtitle}
          </div>

          <h1 id="portfolio-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-5xl leading-[1.15]">
            {data.heading}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            {(["professional", "personal", "academic"] as ProjectType[]).map((type) => (
              <Link key={type} href={`/${locale}/portfolio?filter=${type}`} scroll={false} className="flex items-center gap-2 group" aria-label={`${typeLabels[type]}: ${counts[type]}`}>
                <span className={`w-2 h-2 rounded-full ${getBadge(type).dot}`} aria-hidden="true" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {counts[type]} {typeLabels[type]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label={ui.filterBy ?? "Project filters"} className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-col shrink-0">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {ui.filterBy ?? "Filter by"}
              </span>
              {filterHint ? (
                <span className="text-[10px] text-muted-foreground/60 italic mt-0.5">
                  {filterHint}
                </span>
              ) : null}
            </div>

            <div className="hidden sm:block w-px h-8 bg-border shrink-0 mx-2" aria-hidden="true" />

            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const isActive = activeFilter === f.id;
                const href = f.id === "all" ? `/${locale}/portfolio` : `/${locale}/portfolio?filter=${f.id}`;
                return (
                  <Link
                    key={f.id}
                    href={href}
                    scroll={false}
                    className={`group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:bg-muted/40 hover:text-foreground hover:border-muted-foreground/10"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {f.id !== "all" && (
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getBadge(f.id).dot}`} aria-hidden="true" />
                    )}
                    <span>{f.label}</span>
                    <span className="text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded-md bg-primary/80 text-primary-foreground">
                      {counts[f.id]}
                    </span>
                  </Link>
                );
              })}
            </div>

            <span className="hidden lg:block text-xs text-muted-foreground ms-auto shrink-0" aria-live="polite">
              {filteredProjects.length} / {allProjects.length}
            </span>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14" aria-label={showcaseLabel}>
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <h2 className="text-lg font-semibold mb-1">{emptyTitle}</h2>
            <p className="text-sm text-muted-foreground max-w-xs">{emptyText}</p>
            <Link href={`/${locale}/portfolio`} scroll={false} className="mt-4 text-sm text-primary hover:underline">
              {showAll}
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" role="list">
              {filteredProjects.map((project, i) => {
                const techList = parseTechList(project.tech);
                const caseLabel = project.linkLabel || data.viewCase;

                return (
                  <article
                    key={`${project.href}-${i}`}
                    className="group relative flex flex-col rounded-xl bg-card overflow-hidden border border-border/50 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                    role="listitem"
                  >
                    <Link
                      href={`/${locale}${project.href}`}
                      className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                      aria-label={`${caseLabel}: ${project.title}`}
                    >
                      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-muted to-muted/80 shrink-0">
                        <div className="absolute inset-0 scale-110 blur-xl opacity-30 pointer-events-none" aria-hidden="true">
                          <Image src={project.image} alt="" fill className="object-cover" sizes="33vw" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" aria-hidden="true" />

                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          loading={i < 3 ? "eager" : "lazy"}
                        />

                        <div className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} z-20`}>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white shadow-lg">
                            {typeLabels[project.type] ?? project.type}
                          </span>
                        </div>

                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-sm" aria-hidden="true">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 text-primary rounded-full font-semibold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {viewDetails}
                            {isRtl ? <ArrowLeft className="w-4 h-4" aria-hidden="true" /> : <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col flex-1 p-6 gap-4 bg-card">
                        <h3 className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {project.status && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 border border-emerald-500/20 w-fit">
                            <span className="font-medium text-emerald-600 dark:text-emerald-400 tracking-wide">
                              {localizeStatus(project.status)}
                            </span>
                          </div>
                        )}

                        {techList.length > 0 && (
                          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                            {techList.map((t, idx) => (
                              <li
                                key={`${t}-${idx}`}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/25 group-hover:bg-primary/15 group-hover:border-primary/40 transition-all duration-300"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="h-px bg-gradient-to-r from-border via-border to-transparent" aria-hidden="true" />

                        <div className="flex items-center justify-between pt-1 mt-auto">
                          <span className="text-xs text-muted-foreground">
                            {ui.ctaExplore ?? "Explore"}
                          </span>
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            <span className="text-xs whitespace-nowrap tracking-wide">
                              {caseLabel}
                            </span>
                            {isRtl ? <ArrowLeft className="w-4 h-4" aria-hidden="true" /> : <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                          </span>
                        </div>
                      </div>

                      <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isRtl ? "origin-right" : "origin-left"} rounded-b-full`} aria-hidden="true" />

                      <div className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} w-20 h-20 overflow-hidden pointer-events-none`} aria-hidden="true">
                        <div className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} w-24 h-24 bg-gradient-to-bl from-primary/15 to-transparent ${isRtl ? "-rotate-45 -translate-x-10 -translate-y-10 group-hover:-translate-x-8 group-hover:-translate-y-8" : "rotate-45 translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8"} transition-transform duration-500`} />
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>

            {data.Warning && (
              <div className="mt-6 px-4 sm:px-0">
                <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 text-xs sm:text-sm w-fit">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.451 11.48c.75 1.335-.213 2.991-1.742 2.991H3.548c-1.53 0-2.492-1.656-1.743-2.99l6.452-11.48zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-7a1 1 0 00-.993.883L9 8v3a1 1 0 001.993.117L11 11V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="leading-tight">{data.Warning}</p>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {data.whyChooseUs?.reasons?.length ? (
        <section className="bg-primary/5 border-y border-border" aria-labelledby="why-choose-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="text-center mb-12">
              <h2 id="why-choose-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                {data.whyChooseUs.title}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {data.whyChooseUs.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
              {data.whyChooseUs.reasons.map((reason, index) => {
                const Icon = WHY_CHOOSE_ICONS[index % WHY_CHOOSE_ICONS.length];
                return (
                  <article key={reason.title} className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group" role="listitem">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" aria-hidden="true" />
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="portfolio-cta-heading">
        <div className="relative rounded-3xl border border-border bg-card overflow-hidden p-8 sm:p-14 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" aria-hidden="true" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative">
            <h2 id="portfolio-cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-tight">
              {ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {ctaDescription}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {data.cta}
              <ArrowRight size={17} className={isRtl ? "rotate-180" : ""} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
