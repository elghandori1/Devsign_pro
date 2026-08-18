import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { LinkCard } from "./LinkCard";
import { parseTechList } from "@/app/lib/portfolio";

export type ProjectCaseStudyDetail = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  intro: string;
  sections?: { title: string; body: string }[];
  realWorld?: string;
  highlights: string[];
  gallery?: { src: string; alt: string }[];
  links?: { url: string; label: string }[];
};

export type CaseStudyUi = {
  breadcrumbHome: string;
  breadcrumbPortfolio: string;
  backToPortfolio: string;
  techHeading: string;
  categoryLabel: string;
  typeLabel: string;
  statusLabel: string;
  collaborationTitle: string;
  collaborationBody: string;
  realWorldHeading: string;
  galleryHeading: string;
  linksHeading: string;
  overviewHeading: string;
  breadcrumbAria: string;
};

type ProjectCard = {
  title: string;
  description: string;
  tech: string | string[];
  image: string;
  category: string;
  type: string;
  status?: string;
  href: string;
  highlightsHeading: string;
  detail: ProjectCaseStudyDetail;
};

interface PortfolioProjectDetailProps {
  project: ProjectCard;
  caseStudyUi: CaseStudyUi;
  portfolioHref: string;
  ctaLabel: string;
  ctaLabel_other: string;
  locale: string;
  isRtl: boolean;
  typeLabels?: Record<string, string>;
  statusLabels?: Record<string, string>;
}

const typeBadgeClass = (type: string) =>
  type === "professional"
    ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20"
    : type === "personal"
      ? "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20"
      : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";

export default function PortfolioProjectDetail({
  project,
  caseStudyUi,
  portfolioHref,
  ctaLabel,
  ctaLabel_other,
  locale,
  isRtl,
  typeLabels = {},
  statusLabels = {},
}: PortfolioProjectDetailProps) {
  const { detail } = project;
  const techItems = parseTechList(project.tech);
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const localizedType = typeLabels[project.type] ?? project.type;
  const localizedStatus = project.status
    ? (statusLabels[project.status] ?? project.status)
    : undefined;

  return (
    <main
      className="min-h-screen bg-primary/6 text-foreground"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <nav
        aria-label={caseStudyUi.breadcrumbAria}
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
              {caseStudyUi.breadcrumbHome}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li>
            <Link href={portfolioHref} className="hover:text-foreground transition-colors">
              {caseStudyUi.breadcrumbPortfolio}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li className="text-foreground font-medium truncate max-w-[220px] sm:max-w-none">
            {project.title}
          </li>
        </ol>
      </nav>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <Link
          href={portfolioHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-4 mb-10"
        >
          <BackIcon className="w-4 h-4 shrink-0" aria-hidden />
          {caseStudyUi.backToPortfolio}
        </Link>

        <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          <div className="flex flex-col gap-5 mt-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-primary/20 w-fit">
              <Sparkles size={13} aria-hidden />
              <span>{project.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight leading-[1.15]">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="inline-block w-fit max-w-[600px] rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                <Layers className="w-4 h-4 text-primary" aria-hidden />
                {caseStudyUi.techHeading}
              </div>
              <div className="flex flex-wrap gap-2">
                {techItems.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border/60 shadow-xl bg-muted order-first lg:order-last">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 576px"
              priority
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-14">
          <div className="min-w-0 space-y-10 sm:space-y-12">
            <section aria-labelledby="case-intro">
              <h2 id="case-intro" className="sr-only">{caseStudyUi.overviewHeading}</h2>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                {detail.intro}
              </p>
            </section>

            {detail.sections?.map((sec, idx) => (
              <section
                key={`${sec.title}-${idx}`}
                aria-labelledby={`case-section-${idx}`}
                className="border-l-2 border-primary/30 pl-5"
              >
                <h2 id={`case-section-${idx}`} className="text-xl sm:text-2xl font-semibold mb-3">
                  {sec.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-[1.05rem]">
                  {sec.body}
                </p>
              </section>
            ))}

            {detail.realWorld && (
              <section
                aria-labelledby="real-world-heading"
                className="relative rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 shadow-sm overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative">
                  <h2
                    id="real-world-heading"
                    className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2 text-primary"
                  >
                    <Briefcase className="w-5 h-5 shrink-0" aria-hidden />
                    {caseStudyUi.realWorldHeading}
                  </h2>
                  <p className="text-foreground/90 leading-relaxed text-base sm:text-[1.05rem] font-medium">
                    {detail.realWorld}
                  </p>
                </div>
              </section>
            )}

            {detail.gallery && detail.gallery.length > 0 && (
              <section aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="text-xl sm:text-2xl font-semibold mb-5">
                  {caseStudyUi.galleryHeading}
                </h2>
                <div className="flex flex-wrap gap-2 justify-start sm:justify-between">
                  {detail.gallery.map((img) => (
                    <div
                      key={img.src}
                      className="relative w-[30%] sm:w-40 md:w-60 aspect-square rounded-md overflow-hidden border border-border/50"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 30vw, 240px"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section aria-labelledby="highlights-heading">
              <h2 id="highlights-heading" className="text-xl sm:text-2xl font-semibold mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden />
                {project.highlightsHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 items-start rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground leading-relaxed hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit space-y-5">
            <div className="rounded-2xl border border-border bg-card/80 p-5 text-sm space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  {caseStudyUi.categoryLabel}
                </span>
                <span className="font-medium">{project.category}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  {caseStudyUi.typeLabel}
                </span>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${typeBadgeClass(project.type)}`}>
                  {localizedType}
                </span>
              </div>
              {localizedStatus && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    {caseStudyUi.statusLabel}
                  </span>
                  <span className="font-medium">{localizedStatus}</span>
                </div>
              )}
            </div>

            {detail.links && detail.links.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                  {caseStudyUi.linksHeading}
                </p>
                {detail.links.map((link) => (
                  <LinkCard key={link.url} href={link.url} content={link.label} />
                ))}
              </div>
            )}
          </aside>
        </div>

        <section
          className="mt-14 sm:mt-20 relative rounded-3xl border border-border bg-card overflow-hidden p-8 sm:p-12 lg:p-14 text-center"
          aria-labelledby="collab-heading"
        >
          <div className="relative max-w-2xl mx-auto">
            <h2 id="collab-heading" className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              {caseStudyUi.collaborationTitle}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {caseStudyUi.collaborationBody}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ctaLabel}
                <ArrowRight size={17} className={isRtl ? "rotate-180" : ""} aria-hidden />
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-background text-foreground font-semibold text-sm sm:text-base hover:border-primary/30 hover:bg-muted/50 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ctaLabel_other}
                <ArrowRight size={17} className={isRtl ? "rotate-180" : ""} aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
