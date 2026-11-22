import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Layers3,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { parseTechList } from "@/app/lib/portfolio";

export type ProjectCaseStudyDetail = {
  seo: { title: string; description: string; keywords: string[] };
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
  technicalCollaborationTitle?: string;
  technicalCollaborationBody?: string;
  technicalCtaLabel?: string;
  realWorldHeading: string;
  galleryHeading: string;
  galleryDescription?: string;
  linksHeading: string;
  overviewHeading: string;
  goalHeading?: string;
  evidenceHeading?: string;
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

type Props = {
  project: ProjectCard;
  caseStudyUi: CaseStudyUi;
  portfolioHref: string;
  ctaLabel: string;
  ctaLabel_other: string;
  locale: string;
  isRtl: boolean;
  typeLabels?: Record<string, string>;
  statusLabels?: Record<string, string>;
};

const typeBadgeClass = (type: string) =>
  type === "professional"
    ? "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300"
    : type === "academic"
      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
      : "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:text-violet-300";

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
}: Props) {
  const { detail } = project;
  const techItems = parseTechList(project.tech);
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const ForwardIcon = isRtl ? ArrowLeft : ArrowRight;
  const isTechnicalProject = ["academic", "personal", "personnel"].includes(
    project.type,
  );
  const localizedType = typeLabels[project.type] ?? project.type;
  const localizedStatus = project.status
    ? (statusLabels[project.status] ?? project.status)
    : undefined;
  const collaborationTitle = isTechnicalProject
    ? (caseStudyUi.technicalCollaborationTitle ??
      caseStudyUi.collaborationTitle)
    : caseStudyUi.collaborationTitle;
  const collaborationBody = isTechnicalProject
    ? (caseStudyUi.technicalCollaborationBody ?? caseStudyUi.collaborationBody)
    : caseStudyUi.collaborationBody;
  const primaryCtaLabel = isTechnicalProject
    ? (caseStudyUi.technicalCtaLabel ?? ctaLabel)
    : ctaLabel;

  return (
    <main
      className="min-h-screen bg-background text-foreground"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <nav
        aria-label={caseStudyUi.breadcrumbAria}
        className="mx-auto max-w-7xl px-4 pt-6 text-sm text-muted-foreground sm:px-6 sm:pt-8"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href={`/${locale}`}
              className="inline-flex min-h-8 items-center transition-colors hover:text-foreground"
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
              className="inline-flex min-h-8 items-center transition-colors hover:text-foreground"
            >
              {caseStudyUi.breadcrumbPortfolio}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li
            aria-current="page"
            className="max-w-[220px] truncate font-medium text-foreground sm:max-w-none"
          >
            {project.title}
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <Link
          href={portfolioHref}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-primary hover:underline"
        >
          <BackIcon className="size-4 shrink-0" aria-hidden="true" />
          {caseStudyUi.backToPortfolio}
        </Link>

        <header className="mt-7 grid items-center gap-8 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
              {project.category}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {project.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.description}
            </p>

            <div className="mt-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <Layers3 className="size-4 text-primary" aria-hidden="true" />
                {caseStudyUi.techHeading}
              </p>
              <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                {techItems.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain p-3 sm:p-4"
              sizes="(max-width: 1024px) 92vw, 520px"
              priority
            />
          </div>
        </header>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-14">
          <div className="min-w-0 space-y-12 sm:space-y-16">
            <section
              aria-labelledby="project-goal-heading"
              className="rounded-2xl border border-primary/25 bg-primary/5 p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                {caseStudyUi.overviewHeading}
              </p>
              <h2
                id="project-goal-heading"
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                {caseStudyUi.goalHeading ?? caseStudyUi.overviewHeading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                {detail.intro}
              </p>
            </section>

            {detail.sections?.map((section, index) => (
              <section
                key={`${section.title}-${index}`}
                aria-labelledby={`case-section-${index}`}
                className="grid gap-4 sm:grid-cols-[56px_1fr]"
              >
                <span
                  className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-sm font-bold text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2
                    id={`case-section-${index}`}
                    className="text-xl font-bold tracking-tight sm:text-2xl"
                  >
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                    {section.body}
                  </p>
                </div>
              </section>
            ))}

            {detail.realWorld ? (
              <section
                aria-labelledby="real-world-heading"
                className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/8 p-6 sm:p-8"
              >
                <div
                  className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <BriefcaseBusiness
                    className="size-6 text-primary"
                    aria-hidden="true"
                  />
                  <h2
                    id="real-world-heading"
                    className="mt-4 text-xl font-bold tracking-tight sm:text-2xl"
                  >
                    {caseStudyUi.realWorldHeading}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-[1.05rem]">
                    {detail.realWorld}
                  </p>
                </div>
              </section>
            ) : null}

            {detail.gallery?.length ? (
              <section aria-labelledby="gallery-heading">
                <h2
                  id="gallery-heading"
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {caseStudyUi.galleryHeading}
                </h2>
                {caseStudyUi.galleryDescription ? (
                  <p className="mt-3 max-w-3xl text-muted-foreground">
                    {caseStudyUi.galleryDescription}
                  </p>
                ) : null}
                {/* Two images, side by side from the sm breakpoint, stacked on phones. */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {detail.gallery.slice(0, 2).map((image, index) => (
                    <figure
                      key={`${image.src}-${index}`}
                      className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5"
                    >
                      <div className="relative aspect-square w-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain p-3"
                          sizes="(max-width: 640px) 92vw, 420px"
                        />
                      </div>
                      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-foreground/80">
                        {image.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            <section aria-labelledby="highlights-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                {caseStudyUi.evidenceHeading ?? caseStudyUi.overviewHeading}
              </p>
              <h2
                id="highlights-heading"
                className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                <CheckCircle2
                  className="size-6 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {project.highlightsHeading}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {detail.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside
            className="h-fit space-y-5 lg:sticky lg:top-24"
            aria-label={caseStudyUi.overviewHeading}
          >
            <div className="rounded-2xl border border-border bg-card p-5 text-sm">
              <SearchCheck className="size-5 text-primary" aria-hidden="true" />
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {caseStudyUi.categoryLabel}
                  </dt>
                  <dd className="mt-1.5 font-semibold">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {caseStudyUi.typeLabel}
                  </dt>
                  <dd className="mt-2">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${typeBadgeClass(project.type)}`}
                    >
                      {localizedType}
                    </span>
                  </dd>
                </div>
                {localizedStatus ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {caseStudyUi.statusLabel}
                    </dt>
                    <dd className="mt-1.5 font-semibold">{localizedStatus}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {detail.links?.length ? (
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {caseStudyUi.linksHeading}
                </p>
                <div className="mt-4 space-y-2">
                  {detail.links.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/40 hover:text-primary/70"
                    >
                      {link.label}
                      <ExternalLink
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        <section
          className="relative mt-16 overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 text-center sm:mt-24 sm:px-12 sm:py-14"
          aria-labelledby="collaboration-heading"
        >
          <div
            className="absolute inset-x-0 top-0 mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-primary to-transparent"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2
              id="collaboration-heading"
              className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
            >
              {collaborationTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {collaborationBody}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                {primaryCtaLabel}
                <ForwardIcon className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={portfolioHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-7 py-3 font-semibold transition hover:border-primary/30 hover:text-primary"
              >
                {ctaLabel_other}
                <ForwardIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
