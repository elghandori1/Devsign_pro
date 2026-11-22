import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  Code2,
  GraduationCap,
  Network,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { flattenPortfolioProjects } from "@/app/lib/portfolio";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import infos from "@/app/dictionaries/global.json";
import { i18n, localeToBcp47, type Locale } from "@/i18n-config";

type Props = { params: Promise<{ locale: string }> };

/** Date of the last meaningful content update. Change it when the page copy changes. */
const PAGE_UPDATED = "2026-11-21";

/**
 * Card lists become a horizontal swipe row on phones (the next card peeks in
 * as the hint) and a normal grid from the `sm` breakpoint up. Everything stays
 * in the HTML, so crawlers read every card.
 */
const SWIPE_ROW =
  "flex list-none snap-x snap-mandatory scroll-px-4 overflow-x-auto -mx-4 px-4 pb-3 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0";
const SWIPE_ITEM = "w-[86%] shrink-0 snap-start sm:w-auto sm:shrink";

/** Tools named on the page, also declared in the Person schema's knowsAbout. */
const SEO_TOOLS = [
  "Google Search Console",
  "Lighthouse",
  "Semrush",
  "Google Keyword Planner",
  "Google Trends",
];

const PROFILE_LABELS = {
  fr: { profiles: "Profils vérifiables :" },
  en: { profiles: "Verifiable profiles:" },
} as const;

interface AboutProject {
  title: string;
  description: string;
  tech: string;
  image: string;
  href: string;
}

const FEATURED_PROJECTS = [
  "/portfolio/corporate-website",
  "/portfolio/shopify-supplements-store",
  "/portfolio/business-automation-dashboard",
];

const CAPABILITY_ICONS = [Search, Network, Code2] as const;
const COLLABORATION_ICONS = [Building2, Users, BriefcaseBusiness] as const;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

function resolveLocale(rawLocale: string): Locale {
  return i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const seo = dict.pages.about_page.seo;

  return buildPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    route: "/about",
    ogImagePath: "/cover/Designpro-mohammed-cover.jpg",
    type: "profile",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const t = dict.pages.about_page;
  const profileLang = locale === "fr" ? "fr" : "en";
  const baseUrl = getBaseUrl();
  const projects = flattenPortfolioProjects<AboutProject>(
    dict.pages.portfolio_page.projects,
  )
    .filter((project) => FEATURED_PROJECTS.includes(project.href))
    .sort(
      (first, second) =>
        FEATURED_PROJECTS.indexOf(first.href) - FEATURED_PROJECTS.indexOf(second.href),
    );

  const profileSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/${locale}/about#profile-page`,
        "url": `${baseUrl}/${locale}/about`,
        "name": t.seo.title,
        "description": t.seo.description,
        "inLanguage": localeToBcp47(locale),
        "primaryImageOfPage": `${baseUrl}/images/about/profile1.png`,
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "dateModified": PAGE_UPDATED,
        "mainEntity": { "@id": `${baseUrl}/#person` },
        "breadcrumb": { "@id": `${baseUrl}/${locale}/about#breadcrumb` },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/${locale}/about#faq`,
        "inLanguage": localeToBcp47(locale),
        "mainEntity": t.faq.items.slice(0, 3).map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Mohammed Elghandori",
        "alternateName": "Devsignpro",
        "url": `${baseUrl}/${locale}/about`,
        "image": `${baseUrl}/images/about/profile1.png`,
        "jobTitle": t.schema.jobTitle,
        "description": t.schema.description,
        "mainEntityOfPage": { "@id": `${baseUrl}/${locale}/about#profile-page` },
        "hasOccupation": {
          "@type": "Occupation",
          "name": t.schema.jobTitle,
          "occupationLocation": { "@type": "Country", "name": "France" },
          "skills": t.schema.knowsAbout.join(", "),
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "FR",
        },
        "nationality": {
          "@type": "Country",
          "name": "Morocco",
        },
        "worksFor": { "@id": `${baseUrl}/#business` },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "1337 UM6P",
          "parentOrganization": {
            "@type": "EducationalOrganization",
            "name": "42 Network",
          },
        },
        "affiliation": {
          "@type": "EducationalOrganization",
          "name": "42 Paris",
          "description": t.schema.currentEducation,
        },
        "award": t.credentials.items
          .filter((item) => item.kind === "award")
          .map((item) => `${item.result}, ${item.name} (${item.year})`),
        "knowsAbout": [...t.schema.knowsAbout, ...SEO_TOOLS],
        "hasCredential": t.credentials.items
          .filter((item) => item.kind === "certificate")
          .map((item) => ({
            "@type": "EducationalOccupationalCredential",
            "name": item.name,
            "credentialCategory": "certificate",
            "recognizedBy": { "@type": "Organization", "name": item.location },
          })),
        "sameAs": [
          infos.social.linkedin,
          infos.social.github,
          infos.social.instagram,
        ].filter(Boolean),
        "workExample": projects.map((project) => ({
          "@type": "CreativeWork",
          "name": project.title,
          "url": `${baseUrl}/${locale}${project.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/${locale}/about#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": t.breadcrumb.home,
            "item": `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": t.breadcrumb.current,
            "item": `${baseUrl}/${locale}/about`,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileSchema) }}
      />

      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden border-b border-border"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_34%),radial-gradient(circle_at_85%_75%,color-mix(in_srgb,var(--primary)_8%,transparent),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
          <nav aria-label={t.breadcrumb.label} className="mb-8 text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link className="inline-flex min-h-11 items-center transition-colors hover:text-primary" href={`/${locale}`}>
                  {t.breadcrumb.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {t.breadcrumb.current}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.72fr)] lg:gap-16">
            <header>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {t.hero.eyebrow}
              </p>
              <h1
                id="about-heading"
                className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                {t.hero.heading}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t.hero.intro}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t.hero.differentiator}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {t.hero.primaryCta}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  href={`/${locale}/services/technical-seo`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {t.hero.secondaryCta}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>

              {/* Verifiable profiles: the visible counterpart of the Person schema's sameAs. */}
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {PROFILE_LABELS[profileLang].profiles}
                </span>
                {[
                  { name: "LinkedIn", href: infos.social.linkedin },
                  { name: "GitHub", href: infos.social.github },
                ].map((profile) => (
                  <a
                    key={profile.name}
                    href={profile.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 font-semibold text-foreground underline decoration-primary/40 underline-offset-4 transition hover:text-primary sm:min-h-0"
                  >
                    {profile.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </p>
            </header>

            <figure className="mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl shadow-black/10">
                <Image
                  src="/images/about/profile1.png"
                  alt={t.hero.portraitAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-5 bottom-5 text-sm font-medium text-white">
                  {t.hero.caption}
                </figcaption>
              </div>
            </figure>
          </div>

          <dl className="mt-8 grid border-y sm:mt-12 border-border sm:grid-cols-2 lg:grid-cols-4">
            {t.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-border px-0 py-5 last:border-b-0 sm:px-5 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold leading-relaxed sm:text-base">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {t.approach.eyebrow}
            </p>
            <h2 id="approach-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t.approach.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t.approach.description}
            </p>
          </header>

          <ol className="divide-y divide-border border-y border-border">
            {t.approach.steps.map((step, index) => (
              <li key={step.title} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:py-6">
                <span className="text-sm font-semibold text-primary" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="background-heading" className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div>
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
              <GraduationCap size={23} />
            </div>
            <h2 id="background-heading" className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t.background.heading}
            </h2>
            {t.background.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {locale === "fr" ? (
              <aside className="mt-7 max-w-3xl rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6">
                <h3 className="text-lg font-semibold">Vous développez une activité au Maroc ?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Mon parcours marocain et mon activité actuelle en France me permettent d’accompagner à distance les entreprises qui recherchent un interlocuteur unique pour le SEO technique et le développement web.
                </p>
                <Link
                  href="/fr/consultant-seo-developpeur-web-maroc"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary"
                >
                  Découvrir les services web et SEO pour le Maroc
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </aside>
            ) : (
              <aside className="mt-7 max-w-3xl rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6">
                <h3 className="text-lg font-semibold">Growing a business in Morocco?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  My Moroccan background and current base in France allow me to support businesses remotely through one point of contact for technical SEO and web development.
                </p>
                <Link
                  href="/en/seo-consultant-web-developer-morocco"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary"
                >
                  Explore web development and SEO services for Morocco
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </aside>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-lg font-semibold">{t.background.educationHeading}</h3>
            <ol className="mt-6 space-y-0">
              {t.background.education.map((item, index) => (
                <li key={item.name} className="relative grid grid-cols-[1.75rem_1fr] gap-4 pb-7 last:pb-0">
                  {index < t.background.education.length - 1 ? (
                    <span className="absolute left-[0.4375rem] top-4 h-full w-px bg-border" aria-hidden="true" />
                  ) : null}
                  <span className="relative mt-1 size-3 rounded-full border-2 border-primary bg-background" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="credentials-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header>
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
              <Trophy size={22} />
            </div>
            <h2 id="credentials-heading" className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t.credentials.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.credentials.intro}</p>
          </header>

          <ol className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {t.credentials.items.map((item) => (
              <li key={`${item.year}-${item.name}`} className="border-t border-border py-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold leading-snug">{item.name}</h3>
                  <time className="shrink-0 text-sm font-semibold text-foreground" dateTime={item.year}>{item.year}</time>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
                <p className="mt-1 text-sm font-medium">{item.result}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {t.capabilities.eyebrow}
            </p>
            <h2 id="capabilities-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t.capabilities.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t.capabilities.intro}
            </p>
          </header>

          <ul className={`mt-7 gap-5 sm:mt-10 lg:grid-cols-3 ${SWIPE_ROW}`}>
            {t.capabilities.groups.map((group, index) => {
              const Icon = CAPABILITY_ICONS[index] ?? Code2;
              return (
                <li key={group.title} className={`flex ${SWIPE_ITEM}`}>
                  <article className="flex w-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{group.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {group.description}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${locale}${group.href}`}
                      className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {group.linkLabel}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tools-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t.tools.eyebrow}</p>
            <h2 id="tools-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t.tools.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.tools.intro}</p>
          </header>

          <ul
            className={`mt-7 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 ${SWIPE_ROW}`}
            aria-labelledby="tools-heading"
            tabIndex={0}
          >
            {t.tools.items.map((tool) => (
              <li key={tool.name} className={`rounded-2xl border border-border bg-card p-5 ${SWIPE_ITEM}`}>
                <h3 className="font-semibold leading-snug">{tool.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="work-heading">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t.work.eyebrow}</p>
              <h2 id="work-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t.work.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.work.intro}</p>
            </div>
            <Link href={`/${locale}/portfolio`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
              {t.work.allProjects}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </header>

          <ul className={`mt-7 gap-6 sm:mt-10 md:grid-cols-2 xl:grid-cols-3 ${SWIPE_ROW}`}>
            {projects.map((project) => (
              <li key={project.href} className={SWIPE_ITEM}>
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card">
                  <Link href={`/${locale}${project.href}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{project.tech}</p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">{project.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {project.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {t.work.caseStudy}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="collaboration-heading">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t.collaboration.eyebrow}</p>
            <h2 id="collaboration-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t.collaboration.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.collaboration.intro}</p>
          </header>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {t.collaboration.audiences.map((audience, index) => {
              const Icon = COLLABORATION_ICONS[index] ?? Users;
              return (
                <li key={audience.title} className="grid gap-4 py-6 sm:grid-cols-[3rem_0.7fr_1.3fr] sm:items-start sm:gap-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
                    <Icon size={21} />
                  </span>
                  <h3 className="text-lg font-semibold">{audience.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{audience.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-faq-heading" className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t.faq.eyebrow}</p>
            <h2 id="about-faq-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t.faq.heading}
            </h2>
          </header>

          {/* Native <details>: tap to open, no JavaScript, and the answers stay in the HTML for crawlers. */}
          <div>
            {t.faq.items.slice(0, 3).map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="group border-t border-border first:border-t-0"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">{item.q}</h3>
                  <ChevronDown
                    className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-cta-heading" className="px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border bg-background hero-section-light px-6 py-12 text-foreground sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 id="about-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t.cta.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{t.cta.description}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.cta.button}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
