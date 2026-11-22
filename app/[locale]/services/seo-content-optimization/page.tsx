import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  FileText,
  Link2,
  MessageSquareText,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { i18n, localeToBcp47, type Locale } from "@/i18n-config";

type Props = { params: Promise<{ locale: string }> };
type Card = { title: string; text: string };
type FAQ = { q: string; a: string };

type Content = {
  seo: { title: string; description: string; keywords: string[] };
  breadcrumb: { label: string; home: string; services: string; current: string };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    promise: string[];
    imageAlt: string;
  };
  problems: { eyebrow: string; heading: string; description: string; items: string[] };
  definition: { eyebrow: string; heading: string; answer: string; note: string };
  scope: { eyebrow: string; heading: string; description: string; items: Card[] };
  deliverables: { eyebrow: string; heading: string; description: string; items: Card[] };
  process: { eyebrow: string; heading: string; steps: Card[] };
  related: { heading: string; items: { title: string; href: string; label: string }[] };
  faq: { eyebrow: string; heading: string; items: FAQ[] };
  cta: { heading: string; description: string; button: string };
};

const SCOPE_ICONS = [Target, FileText, MessageSquareText, ShieldCheck, Link2, BarChart3] as const;
const PAGE_UPDATED = "2026-11-22";
const HERO_IMAGE = "/images/services/seo-geo-content-optimization-search-visibility.png";

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
  const content = dict.pages.services_page.services.seo_content_optimization.landing as Content;

  return buildPageMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    route: "/services/seo-content-optimization",
    ogImagePath: "/cover/Designpro-cover.jpg",
    type: "website",
  });
}

export default async function SeoContentOptimizationPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const content = dict.pages.services_page.services.seo_content_optimization.landing as Content;
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/services/seo-content-optimization`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.seo.title,
        description: content.seo.description,
        inLanguage: localeToBcp47(locale),
        dateModified: PAGE_UPDATED,
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: content.hero.heading,
        description: content.hero.description,
        url: pageUrl,
        serviceType:
          locale === "fr"
            ? "Optimisation de contenu SEO et GEO"
            : "SEO and GEO content optimization",
        provider: { "@id": `${baseUrl}/#person` },
        brand: { "@id": `${baseUrl}/#business` },
        audience: {
          "@type": "BusinessAudience",
          audienceType: locale === "fr" ? "TPE, PME, e-commerçants et agences web" : "Small businesses, ecommerce brands and web agencies",
        },
        areaServed:
          locale === "fr"
            ? [{ "@type": "Country", name: "France" }, { "@type": "Place", name: "Europe" }]
            : { "@type": "Place", name: "Worldwide" },
        offers: {
          "@type": "Offer",
          url: pageUrl,
          availability: "https://schema.org/InStock",
          description: locale === "fr" ? "Tarif sur devis selon le nombre de pages et le périmètre" : "Custom quote based on page count and scope",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: localeToBcp47(locale),
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: content.breadcrumb.home, item: `${baseUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name: content.breadcrumb.services, item: `${baseUrl}/${locale}/services` },
          { "@type": "ListItem", position: 3, name: content.breadcrumb.current, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />

      <section aria-labelledby="content-optimization-heading" className="relative overflow-hidden border-b border-border hero-section-light">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_74%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <nav aria-label={content.breadcrumb.label} className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={`/${locale}`} className="inline-flex min-h-11 items-center hover:text-primary">{content.breadcrumb.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${locale}/services`} className="inline-flex min-h-11 items-center hover:text-primary">{content.breadcrumb.services}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{content.breadcrumb.current}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:gap-16">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.hero.eyebrow}</p>
              <h1 id="content-optimization-heading" className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">{content.hero.heading}</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{content.hero.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  {content.hero.primaryCta}<ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="#method" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary">{content.hero.secondaryCta}</a>
              </div>
              <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">
                {content.hero.promise.map((item) => <li key={item} className="flex gap-2 leading-relaxed"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </header>

            {/* Replace the file at HERO_IMAGE to change this picture; keep the same name. */}
            <figure className="mx-auto w-full max-w-lg">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10">
                <Image
                  src={HERO_IMAGE}
                  alt={content.hero.imageAlt}
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="problems-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.problems.eyebrow}</p><h2 id="problems-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.problems.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{content.problems.description}</p></header>
          <ul className="mt-9 grid gap-x-8 md:grid-cols-2">{content.problems.items.map((item) => <li key={item} className="flex gap-3 border-t border-border py-5"><Search className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><span className="font-medium leading-relaxed">{item}</span></li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="definition-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.definition.eyebrow}</p><h2 id="definition-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{content.definition.heading}</h2></header>
          <div>
            <p className="text-lg font-medium leading-relaxed sm:text-xl">{content.definition.answer}</p>
            <p className="mt-5 border-l-2 border-primary pl-4 leading-relaxed text-muted-foreground">{content.definition.note}</p>
            <Link href={`/${locale}/services/technical-seo`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
              {locale === "fr" ? "Vérifier la base avec un audit SEO technique" : "Check the foundation with a technical SEO audit"}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="scope-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.scope.eyebrow}</p><h2 id="scope-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.scope.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{content.scope.description}</p></header>
          <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{content.scope.items.map((item, index) => { const Icon = SCOPE_ICONS[index] ?? Target; return <li key={item.title} className="rounded-2xl border border-border bg-card p-6 sm:p-7"><span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true"><Icon size={21} /></span><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p></li>; })}</ul>
        </div>
      </section>

      <section aria-labelledby="deliverables-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.deliverables.eyebrow}</p><h2 id="deliverables-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.deliverables.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{content.deliverables.description}</p></header>
          <ol className="divide-y divide-border border-y border-border">{content.deliverables.items.map((item, index) => <li key={item.title} className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr] sm:py-6"><span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p></div></li>)}</ol>
        </div>
      </section>

      <section id="method" aria-labelledby="process-heading" className="scroll-mt-24 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.process.eyebrow}</p><h2 id="process-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.process.heading}</h2></header>
          <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{content.process.steps.map((step, index) => <li key={step.title} className="rounded-2xl border border-border bg-background p-6"><span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"><h2 id="related-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">{content.related.heading}</h2><ul className="mt-7 grid gap-4 md:grid-cols-3">{content.related.items.map((item) => <li key={item.href}><Link href={`/${locale}${item.href}`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-primary/35"><span className="font-semibold leading-relaxed">{item.title}</span><span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">{item.label}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link></li>)}</ul></div>
      </section>

      <section aria-labelledby="faq-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"><header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.faq.eyebrow}</p><h2 id="faq-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.faq.heading}</h2></header><div>{content.faq.items.map((item, index) => <details key={item.q} open={index === 0} className="group border-t border-border first:border-t-0"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden"><h3 className="text-base font-semibold leading-snug sm:text-lg">{item.q}</h3><ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p></details>)}</div></div>
      </section>

      <section aria-labelledby="content-cta-heading" className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border hero-section-light px-6 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" /><div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-3xl"><h2 id="content-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.cta.heading}</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{content.cta.description}</p></div><Link href={`/${locale}/contact`} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110">{content.cta.button}<ArrowRight size={17} aria-hidden="true" /></Link></div></div>
      </section>
    </main>
  );
}
