import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { LinkCard } from "./LinkCard";
export type ProjectCaseStudyDetail = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  intro: string;
  sections?: { title: string; body: string }[];
  highlights: string[];
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
};

type ProjectCard = {
  title: string;
  description: string;
  tech: string;
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
  locale: string;
  isRtl: boolean;
}

export default function PortfolioProjectDetail({
  project,
  caseStudyUi,
  portfolioHref,
  ctaLabel,
  locale,
  isRtl,
}: PortfolioProjectDetailProps) {
  const { detail } = project;
  const techItems = project.tech
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const showLiveSiteLink = project.href === "/portfolio/corporate-website";
  const showLandingPageLink = project.href === "/portfolio/landing-page-ecommerce";
  const showPesscoreLinks = project.href === "/portfolio/pesscore-efootball-tracker";
  const typeBadgeClass =
    project.type === "professional"
      ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20"
      : project.type === "personal"
        ? "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20"
        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";

  return (
    <main
      className="min-h-screen bg-primary/6 text-foreground"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href={`/${locale}`}
              className="hover:text-foreground transition-colors"
            >
              {caseStudyUi.breadcrumbHome}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li>
            <Link
              href={portfolioHref}
              className="hover:text-foreground transition-colors"
            >
              {caseStudyUi.breadcrumbPortfolio}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li className="text-foreground font-medium truncate max-w-[220px] sm:max-w-none">
            {project.title}
          </li>
        </ol>
      </nav>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* ── Back link ── */}
        <Link
          href={portfolioHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-4 mb-10"
        >
          <BackIcon className="w-4 h-4 shrink-0" aria-hidden />
          {caseStudyUi.backToPortfolio}
        </Link>

        <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Left: meta + title + desc */}
          <div className="flex flex-col gap-5 mt-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-primary/20 w-fit">
              <Sparkles size={13} aria-hidden />
              <span className="capitalize">{project.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight leading-[1.15]">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            {/* Tech stack */}
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

          {/* Right: square image */}
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
          {/* ── Main column ── */}
          <div className="min-w-0 space-y-10 sm:space-y-12">
            {/* Intro */}
            <section aria-labelledby="case-intro">
              <h2 id="case-intro" className="sr-only">
                Overview
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                {detail.intro}
              </p>
            </section>

            {/* Body sections */}
            {detail.sections?.map((sec, idx) => (
              <section
                key={`${sec.title}-${idx}`}
                aria-labelledby={`case-section-${idx}`}
                className="border-l-2 border-primary/30 pl-5"
              >
                <h2
                  id={`case-section-${idx}`}
                  className="text-xl sm:text-2xl font-semibold mb-3"
                >
                  {sec.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed text-base sm:text-[1.05rem]">
                  {sec.body}
                </p>
              </section>
            ))}

            {showLiveSiteLink && (
              <div className="flex flex-wrap gap-2 mt-4 justify-start sm:justify-between">
                <img
                  src="/images/Corporate-website/Generate-leads-overview.jpg"
                  alt="Generate leads overview"
                  className="w-[30%] sm:w-40 md:w-60 aspect-square object-cover rounded-md"
                />
                <img
                  src="/images/Corporate-website/Result-google-search.jpg"
                  alt="Result google search"
                  className="w-[30%] sm:w-40 md:w-60 aspect-square object-cover rounded-md"
                />
                <img
                  src="/images/Corporate-website/first-at-google-search.jpg"
                  alt="First at google search"
                  className="w-[30%] sm:w-40 md:w-60 aspect-square object-cover rounded-md"
                />
              </div>
            )}
            {/* Highlights */}
            <section aria-labelledby="highlights-heading">
              <h2
                id="highlights-heading"
                className="text-xl sm:text-2xl font-semibold mb-5 flex items-center gap-2"
              >
                <CheckCircle2
                  className="w-5 h-5 text-primary shrink-0"
                  aria-hidden
                />
                {project.highlightsHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 items-start rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground leading-relaxed hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-5">
            {/* Meta details */}
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
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${typeBadgeClass}`}
                >
                  {project.type}
                </span>
              </div>
              {project.status && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    {caseStudyUi.statusLabel}
                  </span>
                  <span className="font-medium capitalize">
                    {project.status}
                  </span>
                </div>
              )}
            </div>

            {showLiveSiteLink && (
              <LinkCard
                href="https://neodyngrp.com"
                content={
                  locale === "en"
                    ? "Website Link"
                    : locale === "fr"
                      ? "Lien du site"
                      : "رابط الموقع"
                }
              />
            )}

            {showLandingPageLink && (
              <LinkCard
                href="https://washmachine.vercel.app"
                content={
                  locale === "en"
                    ? "Landing Page"
                    : locale === "fr"
                      ? "Page d'atterrissage"
                      : "صفحة الهبوط"
                }
              />
            )}

                  {showPesscoreLinks && (
              <LinkCard
                href="https://pesscore.vercel.app"
                content={
                  locale === "en"
                    ? "Pesscore Page"
                    : locale === "fr"
                      ? "Page de Pesscore"
                      : "صفحة Pesscore"
                }
              />
            )}
          </aside>
        </div>

        {/* Collaboration CTA — unchanged */}
        <section
          className="mt-14 sm:mt-20 relative rounded-3xl border border-border bg-card overflow-hidden p-8 sm:p-12 lg:p-14 text-center"
          aria-labelledby="collab-heading"
        >
          <div className="relative max-w-2xl mx-auto">
            <h2
              id="collab-heading"
              className="text-2xl sm:text-3xl font-bold mb-4 leading-tight"
            >
              {caseStudyUi.collaborationTitle}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {caseStudyUi.collaborationBody}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              {ctaLabel}
              <ArrowRight
                size={17}
                className={isRtl ? "rotate-180" : ""}
                aria-hidden
              />
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
