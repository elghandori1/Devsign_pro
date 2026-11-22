import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileSearch,
  Gauge,
  GitBranch,
  Globe2,
  Network,
  Search,
  ShieldCheck,
} from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { i18n, localeToBcp47, type Locale } from "@/i18n-config";

type Props = { params: Promise<{ locale: string }> };

type TextCard = { title: string; text: string };
type FAQ = { q: string; a: string };

type Landing = {
  seo: { title: string; description: string; keywords: string[] };
  breadcrumb: { label: string; home: string; services: string; current: string };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    price: string;
    priceNote: string;
    promise: string[];
    imageAlt: string;
    imageCaption: string;
  };
  symptoms: {
    eyebrow: string;
    heading: string;
    description: string;
    items: string[];
  };
  definition: {
    eyebrow: string;
    heading: string;
    answer: string;
    note: string;
  };
  coverage: {
    eyebrow: string;
    heading: string;
    description: string;
    items: TextCard[];
  };
  deliverables: {
    eyebrow: string;
    heading: string;
    description: string;
    items: TextCard[];
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: TextCard[];
  };
  implementation: {
    eyebrow: string;
    heading: string;
    description: string;
    platformLabel: string;
    platforms: string[];
    toolsLabel: string;
    tools: string[];
  };
  aiSearch: {
    eyebrow: string;
    heading: string;
    description: string;
    items: string[];
  };
  fit: {
    eyebrow: string;
    heading: string;
    items: TextCard[];
  };
  faq: { eyebrow: string; heading: string; items: FAQ[] };
  related: {
    heading: string;
    items: { title: string; href: string; label: string }[];
  };
  cta: { heading: string; description: string; button: string };
};

const COVERAGE_ICONS = [Search, Code2, Network, Gauge, FileSearch, GitBranch] as const;
const FIT_ICONS = [Globe2, Search, ShieldCheck] as const;
const PAGE_UPDATED = "2026-11-21T09:00:00+01:00"; // ISO 8601 date-time with timezone (required by Google)

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
  const landing = dict.pages.services_page.services.technical_seo.landing as Landing;

  return buildPageMetadata({
    locale,
    title: landing.seo.title,
    description: landing.seo.description,
    keywords: landing.seo.keywords,
    route: "/services/technical-seo",
    ogImagePath: "/images/services/technical-seo-audit-core-web-vitals-optimization.png",
    type: "website",
  });
}

export default async function TechnicalSEOPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const service = dict.pages.services_page.services.technical_seo;
  const landing = service.landing as Landing;
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/services/technical-seo`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": landing.seo.title,
        "description": landing.seo.description,
        "inLanguage": localeToBcp47(locale),
        "dateModified": PAGE_UPDATED,
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
        "mainEntity": { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": landing.hero.heading,
        "description": landing.hero.description,
        "url": pageUrl,
        "image": `${baseUrl}${service.image}`,
        "serviceType": locale === "fr" ? "Audit SEO technique et corrections" : "Technical SEO audit and implementation",
        "provider": { "@id": `${baseUrl}/#person` },
        "brand": { "@id": `${baseUrl}/#business` },
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": locale === "fr" ? "TPE, PME, e-commerçants et agences web" : "Small businesses, ecommerce brands and web agencies",
        },
        "areaServed": locale === "fr"
          ? [{ "@type": "Country", "name": "France" }, { "@type": "Place", "name": "Europe" }]
          : { "@type": "Place", "name": "Worldwide" },
        "offers": {
          "@type": "Offer",
          "url": pageUrl,
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "minPrice": 450,
            "priceCurrency": "EUR",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "inLanguage": localeToBcp47(locale),
        "mainEntity": landing.faq.items.slice(0, 3).map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": landing.breadcrumb.home,
            "item": `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": landing.breadcrumb.services,
            "item": `${baseUrl}/${locale}/services`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": landing.breadcrumb.current,
            "item": pageUrl,
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

      <section aria-labelledby="technical-seo-heading" className="relative overflow-hidden border-b border-border hero-section-light">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_74%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <nav aria-label={landing.breadcrumb.label} className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={`/${locale}`} className="inline-flex min-h-11 items-center hover:text-primary">{landing.breadcrumb.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${locale}/services`} className="inline-flex min-h-11 items-center hover:text-primary">{landing.breadcrumb.services}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{landing.breadcrumb.current}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:gap-16">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.hero.eyebrow}</p>
              <h1 id="technical-seo-heading" className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                {landing.hero.heading}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{landing.hero.description}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-semibold text-primary">{landing.hero.price}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{landing.hero.priceNote}</span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  {landing.hero.primaryCta}<ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="#audit-scope" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  {landing.hero.secondaryCta}
                </a>
              </div>
              <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">
                {landing.hero.promise.map((item) => (
                  <li key={item} className="flex gap-2 leading-relaxed"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{item}</span></li>
                ))}
              </ul>
            </header>

            <figure className="mx-auto w-full max-w-lg">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10">
                <Image src={service.image} alt={landing.hero.imageAlt} fill priority sizes="(max-width: 1024px) 92vw, 38vw" className="object-cover" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-black/70 px-4 py-3 text-center text-sm font-medium text-white backdrop-blur-sm">
                  {landing.hero.imageCaption}
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="symptoms-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.symptoms.eyebrow}</p>
            <h2 id="symptoms-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.symptoms.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{landing.symptoms.description}</p>
          </header>
          <ul className="mt-9 grid gap-x-8 md:grid-cols-2">
            {landing.symptoms.items.map((item) => (
              <li key={item} className="flex gap-3 border-t border-border py-5"><Search className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><span className="font-medium leading-relaxed">{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="definition-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.definition.eyebrow}</p>
            <h2 id="definition-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{landing.definition.heading}</h2>
          </header>
          <div>
            <p className="text-lg font-medium leading-relaxed sm:text-xl">{landing.definition.answer}</p>
            <p className="mt-5 border-l-2 border-primary pl-4 text-base leading-relaxed text-muted-foreground">{landing.definition.note}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="complete-seo-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-6 rounded-2xl border border-primary/25 bg-primary/5 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <h2 id="complete-seo-heading" className="text-xl font-semibold sm:text-2xl">
                {locale === "fr" ? "Un audit technique ne suffit pas toujours" : "A technical audit is not always the complete solution"}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {locale === "fr"
                  ? "Si le site est techniquement accessible mais que ses pages répondent mal aux recherches ou convainquent peu, il faut aussi travailler les intentions, les contenus, le maillage interne et les CTA."
                  : "If the website is technically accessible but its pages miss search intent or fail to persuade, the next step is improving content, internal links and CTAs."}
              </p>
            </div>
            <Link href={`/${locale}/services/seo-content-optimization`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-background px-5 py-3 font-semibold text-primary hover:border-primary/50 hover:bg-primary/5">
              {locale === "fr" ? "Voir l’optimisation de contenu SEO et GEO" : "Explore SEO content and AI search optimization"}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="audit-scope" aria-labelledby="coverage-heading" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.coverage.eyebrow}</p>
            <h2 id="coverage-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.coverage.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{landing.coverage.description}</p>
          </header>
          <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {landing.coverage.items.map((item, index) => {
              const Icon = COVERAGE_ICONS[index] ?? Search;
              return (
                <li key={item.title} className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true"><Icon size={21} /></span>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="deliverables-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.deliverables.eyebrow}</p>
            <h2 id="deliverables-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.deliverables.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{landing.deliverables.description}</p>
            <div className="mt-7 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-2xl font-bold text-primary">{landing.hero.price}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{landing.hero.priceNote}</p>
            </div>
          </header>
          <ul className="divide-y divide-border border-y border-border">
            {landing.deliverables.items.map((item, index) => (
              <li key={item.title} className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr] sm:py-6">
                <span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.process.eyebrow}</p>
            <h2 id="process-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.process.heading}</h2>
          </header>
          <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {landing.process.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="implementation-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.implementation.eyebrow}</p>
            <h2 id="implementation-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.implementation.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{landing.implementation.description}</p>
          </header>
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="font-semibold">{landing.implementation.platformLabel}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">{landing.implementation.platforms.map((item) => <li key={item} className="rounded-full border border-border px-3 py-1.5 text-sm font-medium">{item}</li>)}</ul>
            <h3 className="mt-7 font-semibold">{landing.implementation.toolsLabel}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">{landing.implementation.tools.map((item) => <li key={item} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="fit-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.fit.eyebrow}</p>
            <h2 id="fit-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.fit.heading}</h2>
          </header>
          <ul className="mt-9 grid gap-5 md:grid-cols-3">
            {landing.fit.items.map((item, index) => {
              const Icon = FIT_ICONS[index] ?? Search;
              return <li key={item.title} className="rounded-2xl border border-border bg-card p-6 sm:p-7"><span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true"><Icon size={21} /></span><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p></li>;
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.faq.eyebrow}</p><h2 id="faq-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.faq.heading}</h2></header>
          <div>
            {landing.faq.items.slice(0, 3).map((item, index) => (
              <details key={item.q} open={index === 0} className="group border-t border-border first:border-t-0">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden"><h3 className="text-base font-semibold leading-snug sm:text-lg">{item.q}</h3><ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="related-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">{landing.related.heading}</h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-3">
            {landing.related.items.map((item) => <li key={item.href}><Link href={`/${locale}${item.href}`} className="group flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-primary/35"><span className="font-semibold leading-relaxed">{item.title}</span><span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">{item.label}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link></li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="technical-seo-cta-heading" className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border hero-section-light px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl"><h2 id="technical-seo-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.cta.heading}</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{landing.cta.description}</p></div>
            <Link href={`/${locale}/contact`} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{landing.cta.button}<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
