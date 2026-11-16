import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Gauge,
  Search,
} from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { flattenPortfolioProjects, parseTechList } from "@/app/lib/portfolio";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { i18n, localeToBcp47, type Locale } from "@/i18n-config";

type Props = { params: Promise<{ locale: string }> };

type ServiceCard = {
  id: string;
  problem: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  price: string;
  items: string[];
  href: string;
  linkLabel: string;
};

type Project = {
  title: string;
  href: string;
  image: string;
  description: string;
  tech: string | string[];
};

type Hub = {
  seo: { title: string; description: string; keywords: string[] };
  breadcrumb: { label: string; home: string; current: string };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    promise: string;
    location: string;
    delivery: string;
  };
  servicesIntro: {
    eyebrow: string;
    heading: string;
    description: string;
    pricingNote: string;
  };
  cards: ServiceCard[];
  decision: {
    eyebrow: string;
    heading: string;
    description: string;
    items: { need: string; answer: string; href: string }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    description: string;
    steps: { title: string; text: string }[];
  };
  proof: {
    eyebrow: string;
    heading: string;
    description: string;
    allProjects: string;
    caseStudy: string;
  };
  why: {
    eyebrow: string;
    heading: string;
    items: { title: string; text: string }[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  cta: { heading: string; description: string; button: string };
};

const FEATURED_PROJECTS = [
  "/portfolio/corporate-website",
  "/portfolio/nutritia-shopify-store",
  "/portfolio/business-automation-dashboard",
];

const WHY_ICONS = [Search, Code2, Gauge] as const;

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
  const hub = dict.pages.services_page.hub as Hub;

  return buildPageMetadata({
    locale,
    title: hub.seo.title,
    description: hub.seo.description,
    keywords: hub.seo.keywords,
    route: "/services",
    ogImagePath: "/cover/Designpro-cover.jpg",
    type: "website",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const hub = dict.pages.services_page.hub as Hub;
  const baseUrl = getBaseUrl();
  const projects = flattenPortfolioProjects<Project>(dict.pages.portfolio_page.projects)
    .filter((project) => FEATURED_PROJECTS.includes(project.href))
    .sort(
      (a, b) =>
        FEATURED_PROJECTS.indexOf(a.href) - FEATURED_PROJECTS.indexOf(b.href),
    );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/${locale}/services#webpage`,
        "url": `${baseUrl}/${locale}/services`,
        "name": hub.seo.title,
        "description": hub.seo.description,
        "inLanguage": localeToBcp47(locale),
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "breadcrumb": { "@id": `${baseUrl}/${locale}/services#breadcrumb` },
        "mainEntity": { "@id": `${baseUrl}/${locale}/services#service-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/${locale}/services#service-list`,
        "name": hub.servicesIntro.heading,
        "numberOfItems": hub.cards.length,
        "itemListElement": hub.cards.map((service, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "url": `${baseUrl}/${locale}${service.href}`,
            "provider": { "@id": `${baseUrl}/#business` },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/${locale}/services#faq`,
        "inLanguage": localeToBcp47(locale),
        "mainEntity": hub.faq.items.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/${locale}/services#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": hub.breadcrumb.home,
            "item": `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": hub.breadcrumb.current,
            "item": `${baseUrl}/${locale}/services`,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />

      <section
        aria-labelledby="services-heading"
        className="relative overflow-hidden border-b border-border hero-section-light"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_76%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <nav aria-label={hub.breadcrumb.label} className="mb-8 text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-primary"
                >
                  {hub.breadcrumb.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {hub.breadcrumb.current}
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.62fr)] lg:gap-16">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {hub.hero.eyebrow}
              </p>
              <h1
                id="services-heading"
                className="mt-4 max-w-5xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                {hub.hero.heading}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {hub.hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {hub.hero.primaryCta}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a
                  href="#services-list"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {hub.hero.secondaryCta}
                </a>
              </div>
            </header>

            <ul className="border-y border-border">
              {[hub.hero.promise, hub.hero.location, hub.hero.delivery].map((item) => (
                <li key={item} className="flex gap-3 border-b border-border py-4 last:border-b-0">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium leading-relaxed sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="services-list"
        aria-labelledby="services-list-heading"
        className="scroll-mt-24 border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {hub.servicesIntro.eyebrow}
            </p>
            <h2 id="services-list-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {hub.servicesIntro.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {hub.servicesIntro.description}
            </p>
          </header>

          <ul className="mt-9 grid gap-6 md:grid-cols-2">
            {hub.cards.map((service) => (
              <li key={service.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5">
                  <Link
                    href={`/${locale}${service.href}`}
                    className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <figure className="relative aspect-[16/8] overflow-hidden border-b border-border bg-muted">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </figure>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-sm font-semibold text-primary">{service.problem}</p>
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="max-w-xl text-xl font-semibold leading-snug sm:text-2xl">{service.title}</h3>
                        <span className="shrink-0 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                          {service.price}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {service.description}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {service.items.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-primary">
                        {service.linkLabel}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {hub.servicesIntro.pricingNote}
          </p>
        </div>
      </section>

      <section aria-labelledby="decision-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{hub.decision.eyebrow}</p>
            <h2 id="decision-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {hub.decision.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{hub.decision.description}</p>
          </header>
          <ol className="divide-y divide-border border-y border-border">
            {hub.decision.items.map((item, index) => (
              <li key={item.need} className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr] sm:py-6">
                <span className="text-sm font-semibold text-primary" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium leading-relaxed">{item.need}</p>
                  <Link href={`/${locale}${item.href}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    {item.answer}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{hub.process.eyebrow}</p>
            <h2 id="process-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{hub.process.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{hub.process.description}</p>
          </header>
          <ol className="mt-9 grid gap-5 md:grid-cols-3">
            {hub.process.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                <span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="proof-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{hub.proof.eyebrow}</p>
              <h2 id="proof-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{hub.proof.heading}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{hub.proof.description}</p>
            </div>
            <Link href={`/${locale}/portfolio`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
              {hub.proof.allProjects}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </header>
          <ul className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.href}>
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card">
                  <Link href={`/${locale}${project.href}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                        {parseTechList(project.tech).slice(0, 3).join(" · ")}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug">{project.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {hub.proof.caseStudy}
                        <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{hub.why.eyebrow}</p>
            <h2 id="why-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{hub.why.heading}</h2>
          </header>
          <ul className="mt-9 grid gap-5 md:grid-cols-3">
            {hub.why.items.map((item, index) => {
              const Icon = WHY_ICONS[index] ?? Search;
              return (
                <li key={item.title} className="rounded-2xl border border-border bg-background p-6 sm:p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true"><Icon size={21} /></span>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{hub.faq.eyebrow}</p>
            <h2 id="faq-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{hub.faq.heading}</h2>
          </header>
          <div>
            {hub.faq.items.map((item, index) => (
              <details key={item.q} open={index === 0} className="group border-t border-border first:border-t-0">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">{item.q}</h3>
                  <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="services-cta-heading" className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border hero-section-light px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 id="services-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{hub.cta.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{hub.cta.description}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {hub.cta.button}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
