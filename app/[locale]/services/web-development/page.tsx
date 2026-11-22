import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Gauge,
  LayoutTemplate,
  PenTool,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { i18n, localeToBcp47, type Locale } from "@/i18n-config";

type Props = { params: Promise<{ locale: string }> };
type TextCard = { title: string; text: string; link?: { href: string; label: string } };
type Landing = {
  seo: { title: string; description: string; keywords: string[] };
  breadcrumb: { label: string; home: string; services: string; current: string };
  hero: { eyebrow: string; heading: string; description: string; primaryCta: string; secondaryCta: string; price: string; priceNote: string; promise: string[]; imageAlt: string; imageCaption: string };
  needs: { eyebrow: string; heading: string; description: string; items: string[] };
  value: { eyebrow: string; heading: string; answer: string; note: string };
  included: { eyebrow: string; heading: string; description: string; items: TextCard[] };
  platforms: { eyebrow: string; heading: string; description: string; items: TextCard[]; ecommerceText: string; ecommerceLabel: string };
  process: { eyebrow: string; heading: string; description: string; steps: TextCard[] };
  seoBridge: { eyebrow: string; heading: string; description: string; includedTitle: string; included: string[]; auditTitle: string; auditText: string; auditLabel: string };
  fit: { eyebrow: string; heading: string; items: TextCard[] };
  related: { heading: string; items: { title: string; href: string; label: string }[] };
  cta: { heading: string; description: string; button: string };
};
type CaseStudy = { badge: string; title: string; description: string; results: { value: string; label: string }[]; image: string; imageAlt: string; link: { href: string; label: string } };

const INCLUDED_ICONS = [LayoutTemplate, Smartphone, Search, Gauge, ShieldCheck, Code2] as const;
const PAGE_UPDATED = "2026-11-22T09:00:00+01:00"; // ISO 8601 date-time with timezone (required by Google)

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

function resolveLocale(rawLocale: string): Locale {
  return i18n.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : i18n.defaultLocale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const service = dict.pages.services_page.services.web_development;
  const landing = service.landing as Landing;

  return buildPageMetadata({
    locale,
    title: landing.seo.title,
    description: landing.seo.description,
    keywords: landing.seo.keywords,
    route: "/services/web-development",
    ogImagePath: service.image,
    type: "website",
  });
}

export default async function WebDevelopmentPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const service = dict.pages.services_page.services.web_development;
  const landing = service.landing as Landing;
  const caseStudy = service.caseStudy as CaseStudy;
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/services/web-development`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: landing.seo.title,
        description: landing.seo.description,
        inLanguage: localeToBcp47(locale),
        dateModified: PAGE_UPDATED,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: landing.hero.heading,
        description: landing.seo.description,
        url: pageUrl,
        image: `${baseUrl}${service.image}`,
        serviceType: locale === "fr" ? "Création et refonte de site internet professionnel" : "Professional website design and development",
        provider: { "@id": `${baseUrl}/#person` },
        brand: { "@id": `${baseUrl}/#business` },
        audience: {
          "@type": "BusinessAudience",
          audienceType: locale === "fr" ? "TPE, PME, commerçants et indépendants" : "Small businesses, shops and independent professionals",
        },
        areaServed: locale === "fr"
          ? [{ "@type": "Country", name: "France" }, { "@type": "Place", name: "Europe" }]
          : { "@type": "Place", name: "Worldwide" },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          url: pageUrl,
          availability: "https://schema.org/InStock",
          priceSpecification: { "@type": "UnitPriceSpecification", minPrice: 1200, priceCurrency: "EUR" },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: landing.breadcrumb.home, item: `${baseUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name: landing.breadcrumb.services, item: `${baseUrl}/${locale}/services` },
          { "@type": "ListItem", position: 3, name: landing.breadcrumb.current, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />

      <section aria-labelledby="web-development-heading" className="relative overflow-hidden border-b border-border hero-section-light">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_74%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <nav aria-label={landing.breadcrumb.label} className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={`/${locale}`} className="inline-flex min-h-11 min-w-11 items-center hover:text-primary">{landing.breadcrumb.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${locale}/services`} className="inline-flex min-h-11 items-center hover:text-primary">{landing.breadcrumb.services}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{landing.breadcrumb.current}</li>
            </ol>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:gap-16">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.hero.eyebrow}</p>
              <h1 id="web-development-heading" className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">{landing.hero.heading}</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{landing.hero.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-semibold text-primary">{landing.hero.price}</span>
                <span className="text-sm text-muted-foreground">{landing.hero.priceNote}</span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{landing.hero.primaryCta}<ArrowRight size={17} aria-hidden="true" /></Link>
                <a href="#included" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary">{landing.hero.secondaryCta}</a>
              </div>
              <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">
                {landing.hero.promise.map((item) => <li key={item} className="flex gap-2 leading-relaxed"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </header>
            <figure className="mx-auto w-full max-w-lg">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10">
                <Image src={service.image} alt={landing.hero.imageAlt} fill priority quality={75} sizes="(max-width: 1024px) 92vw, 38vw" className="object-cover" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-black/70 px-4 py-3 text-center text-sm font-medium text-white backdrop-blur-sm">{landing.hero.imageCaption}</div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="needs-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.needs.eyebrow}</p><h2 id="needs-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.needs.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{landing.needs.description}</p></header>
          <ul className="mt-9 grid gap-x-8 md:grid-cols-2">{landing.needs.items.map((item) => <li key={item} className="flex gap-3 border-t border-border py-5"><PenTool className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><span className="font-medium leading-relaxed">{item}</span></li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="value-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.value.eyebrow}</p><h2 id="value-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{landing.value.heading}</h2></header>
          <div><p className="text-lg font-medium leading-relaxed sm:text-xl">{landing.value.answer}</p><p className="mt-5 border-l-2 border-primary pl-4 leading-relaxed text-muted-foreground">{landing.value.note}</p></div>
        </div>
      </section>

      <section id="included" aria-labelledby="included-heading" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.included.eyebrow}</p><h2 id="included-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.included.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{landing.included.description}</p></header>
          <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {landing.included.items.map((item, index) => {
              const Icon = INCLUDED_ICONS[index] ?? Code2;
              return (
                <li key={item.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true"><Icon size={21} /></span>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
                  {item.link ? (
                    <Link href={`/${locale}${item.link.href}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-sm font-semibold text-primary hover:underline">
                      {item.link.label}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="platforms-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.platforms.eyebrow}</p><h2 id="platforms-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.platforms.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{landing.platforms.description}</p></header>
          <ul className="mt-9 grid gap-5 md:grid-cols-3">{landing.platforms.items.map((item) => <li key={item.title} className="rounded-2xl border border-border bg-background p-6"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p></li>)}</ul>
          <p className="mt-7 text-sm leading-relaxed text-muted-foreground">{landing.platforms.ecommerceText} <Link href={`/${locale}/services/ecommerce-development`} className="inline-flex min-h-11 items-center font-semibold text-primary hover:underline">{landing.platforms.ecommerceLabel}</Link></p>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.process.eyebrow}</p><h2 id="process-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.process.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{landing.process.description}</p></header>
          <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{landing.process.steps.map((step, index) => <li key={step.title} className="rounded-2xl border border-border bg-card p-6"><span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
        </div>
      </section>

      <section aria-labelledby="seo-bridge-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.seoBridge.eyebrow}</p><h2 id="seo-bridge-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.seoBridge.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{landing.seoBridge.description}</p></header>
          <div className="grid gap-5">
            <div className="rounded-2xl border border-border bg-background p-6"><h3 className="text-lg font-semibold">{landing.seoBridge.includedTitle}</h3><ul className="mt-4 space-y-3">{landing.seoBridge.included.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul></div>
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6">
              <h3 className="text-lg font-semibold">{landing.seoBridge.auditTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{landing.seoBridge.auditText}</p>
              <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:gap-5">
                <Link href={`/${locale}/services/technical-seo`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">{landing.seoBridge.auditLabel}<ArrowRight size={16} aria-hidden="true" /></Link>
                <Link href={`/${locale}/services/seo-content-optimization`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">
                  {locale === "fr" ? "Optimiser le contenu, le GEO et les conversions" : "Optimize content, AI search and conversions"}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="proof-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-64 border-b border-border lg:min-h-full lg:border-b-0 lg:border-r"><Image src={caseStudy.image} alt={caseStudy.imageAlt} fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /></div>
            <div className="p-6 sm:p-8 lg:p-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{caseStudy.badge}</p><h2 id="proof-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{caseStudy.title}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{caseStudy.description}</p><dl className="mt-7 grid gap-4 sm:grid-cols-3">{caseStudy.results.map((result) => <div key={result.label} className="border-t border-border pt-4"><dt className="text-2xl font-bold text-primary">{result.value}</dt><dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{result.label}</dd></div>)}</dl><Link href={`/${locale}${caseStudy.link.href}`} className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">{caseStudy.link.label}<ArrowRight size={16} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="fit-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20"><header className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.fit.eyebrow}</p><h2 id="fit-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.fit.heading}</h2></header><ul className="mt-9 grid gap-5 md:grid-cols-3">{landing.fit.items.map((item) => <li key={item.title} className="rounded-2xl border border-border bg-background p-6 sm:p-7"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p></li>)}</ul></div>
      </section>

      <section aria-labelledby="related-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"><h2 id="related-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">{landing.related.heading}</h2><ul className="mt-7 grid gap-4 md:grid-cols-3">{landing.related.items.map((item) => <li key={item.href}><Link href={`/${locale}${item.href}`} className="group flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-primary/35"><span className="font-semibold leading-relaxed">{item.title}</span><span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">{item.label}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link></li>)}</ul></div>
      </section>

      <section aria-labelledby="web-development-cta-heading" className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border hero-section-light px-6 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" /><div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-3xl"><h2 id="web-development-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.cta.heading}</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{landing.cta.description}</p></div><Link href={`/${locale}/contact`} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110">{landing.cta.button}<ArrowRight size={17} aria-hidden="true" /></Link></div></div>
      </section>
    </main>
  );
}
