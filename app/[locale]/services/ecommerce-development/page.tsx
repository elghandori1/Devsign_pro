// /app/[locale]/services/ecommerce-development/page.tsx
import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Rocket,
  Database,
  Code2,
  Globe,
  Zap,
  Sparkles,
  TrendingUp,
  Users,
  BarChart3,
  ChevronDown,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import { buildPageMetadata } from "@/app/lib/buildPageMetadata";
import { getBaseUrl } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = dict.pages.services_page.services.ecommerce_development;
  const keywords =
    locale === "ar"
      ? [
          "تطوير متجر إلكتروني المغرب",
          "إنشاء متجر إلكتروني المغرب",
          "متجر إلكتروني احترافي",
          "البيع عبر الإنترنت المغرب",
          "الدفع عند الاستلام المغرب",
          "بوابة الدفع CMI",
          "SEO متجر إلكتروني",
          "مطور متاجر إلكترونية المغرب",
          "تكلفة متجر إلكتروني المغرب",
          "متجر إلكتروني مخصص",
          "بيع منتجات أونلاين المغرب",
          "متجر سريع وآمن",
        ]
      : locale === "fr"
        ? [
            "développement e-commerce Maroc",
            "création boutique en ligne Maroc",
            "boutique en ligne Maroc",
            "site e-commerce Maroc",
            "vendre en ligne Maroc",
            "paiement CMI Maroc",
            "paiement à la livraison Maroc",
            "SEO e-commerce Maroc",
            "développeur e-commerce Maroc",
            "prix site e-commerce Maroc",
            "boutique en ligne sur mesure",
            "boutique rapide et sécurisée",
          ]
        : [
            "ecommerce development Morocco",
            "online store Morocco",
            "ecommerce website Morocco",
            "custom online store",
            "sell online Morocco",
            "CMI payment integration Morocco",
            "cash on delivery ecommerce Morocco",
            "Shopify vs custom store",
            "ecommerce SEO Morocco",
            "online store developer Morocco",
            "Next.js ecommerce",
            "ecommerce website cost Morocco",
          ];

  return buildPageMetadata({
    locale,
    title: data.title_metadata,
    description: data.description_metadata,
    route: "/services/ecommerce-development",
    keywords: keywords,
    ogImagePath: data.image || "/cover/Designpro-cover.jpg",
    type: "website",
  });
}

const BENEFIT_ICONS = [ShoppingCart, TrendingUp, BarChart3];
const TECH_STACK = [
  { name: "Next.js", icon: Code2 },
  { name: "Stripe & CMI", icon: CreditCard },
  { name: "Tailwind CSS", icon: Zap },
  { name: "Nest.js", icon: Rocket },
  { name: "MongoDB", icon: Database },
  { name: "Technical SEO", icon: Globe },
];

export default async function EcommercePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const svc = dict.pages.services_page;
  const data = svc.services.ecommerce_development;
  const isRtl = locale === "ar";
  const Arr = isRtl ? ArrowRight : ArrowLeft;
  const ArrFwd = isRtl ? ArrowLeft : ArrowRight;

  const includedItems: string[] = data.included ?? data.features ?? [];
  const faqs: { q: string; a: string }[] = data.faqs ?? [];

  const baseUrl = getBaseUrl();

  // --- E-COMMERCE SCHEMA ---
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/${locale}/services/ecommerce-development#service`,
    name: data.title,
    description: data.description_metadata,
    image: data.image
      ? `${baseUrl}${data.image}`
      : `${baseUrl}/cover/Designpro-cover.jpg`,
    url: `${baseUrl}/${locale}/services/ecommerce-development`,
    provider: { "@id": `${baseUrl}/#person` },
    isPartOf: { "@id": `${baseUrl}/#website` },
    inLanguage:
      locale === "en" ? "en-US" : locale === "ar" ? "ar-MA" : "fr-MA",
    serviceType:
      locale === "en"
        ? "Custom E-commerce Development, SEO & AI Optimization"
        : locale === "fr"
          ? "Développement E-commerce sur Mesure, SEO & Optimisation IA"
          : "تطوير التجارة الإلكترونية المخصص، SEO وتحسين الذكاء الاصطناعي",
    areaServed: [
      { "@type": "Country", name: "Morocco" },
      { "@type": "Place", name: "Worldwide" },
    ],
  };

  // --- E-COMMERCE BREADCRUMB ---
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name:
          locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          locale === "en"
            ? "What I Do"
            : locale === "ar"
              ? "ما أقدمه"
              : "Ce que je fais",
        item: `${baseUrl}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          locale === "en"
            ? "E-commerce web development"
            : locale === "ar"
              ? "تطوير مواقع التجارة الإلكترونية"
              : "Développement de sites E-commerce",
        item: `${baseUrl}/${locale}/services/ecommerce-development`,
      },
    ],
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── 1. HERO ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-border"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        {/* Geometric Squares Pattern */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/[0.04] rotate-12" />
          <div className="absolute top-24 left-32 w-48 h-48 border border-white/[0.03] -rotate-6" />
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-white/[0.04] rotate-45" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-white/[0.03] -rotate-12" />
          <div className="absolute bottom-32 left-1/4 w-56 h-56 border border-white/[0.02] rotate-6" />
          <div className="absolute top-16 right-16 w-8 h-8 bg-primary/10 rotate-12" />
          <div className="absolute top-40 right-40 w-6 h-6 bg-primary/15 -rotate-6" />
          <div className="absolute top-1/4 left-[15%] w-20 h-20 bg-primary/5 blur-2xl rounded-sm" />
          <div className="absolute bottom-1/4 right-[15%] w-28 h-28 bg-blue-500/5 blur-3xl rounded-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/[0.03] blur-3xl rounded-sm" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary
             border border-primary/20 px-4 py-2 rounded-full font-medium
             hover:bg-primary/15 transition-colors"
                >
                  <Arr size={14} aria-hidden="true" />
                  {locale === "en" ? "All " : locale === "fr" ? "Tous " : "كل "}
                  {svc.page_title}{" "}
                </Link>
              </li>
              <li aria-current="page" className="sr-only">
                {data.title}
              </li>
            </ol>
          </nav>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight
                       leading-[1.1] text-foreground mb-5 max-w-5xl"
          >
            {data.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-7">
            {data.description}
          </p>

          {/* Keyword chips */}
          <ul className="flex flex-wrap gap-2 mb-8 list-none p-0">
            {(data.features ?? []).map((tag: string) => (
              <li
                key={tag}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full
                           text-xs sm:text-sm font-medium border border-primary/20
                           hover:bg-primary/15 transition-colors"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center justify-center gap-2
                         px-7 py-3.5 rounded-xl bg-primary text-primary-foreground
                         font-bold text-sm sm:text-base
                         hover:brightness-110 active:scale-[0.98] transition-all
                         shadow-lg shadow-primary/20"
            >
              {data.start_btn}
              <ArrFwd
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center gap-2
                         px-7 py-3.5 rounded-xl border border-border bg-background
                         text-foreground font-semibold text-sm sm:text-base
                         hover:bg-muted active:scale-[0.98] transition-all"
            >
              {data.allServicesBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. OVERVIEW ── */}
      <section
        aria-labelledby="overview-heading"
        className="relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-background"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ── Left: Text ── */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles size={12} aria-hidden="true" />
                {data.overviewTitle}
              </div>

              <h2
                id="overview-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-[1.30] mb-6"
              >
                {data.overviewHeadline}
              </h2>

              <div className="flex items-center gap-2 mb-6" aria-hidden="true">
                <div className="w-14 h-1 bg-primary rounded-full" />
              </div>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                <span className="font-semibold text-foreground">
                  {data.startDescription}
                </span>{" "}
                <br />
                {data.longDescription}
              </p>

              {data.company_recruitment && (
                <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <div
                    className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Users
                      className="w-4 h-4 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
                    {data.company_recruitment}
                  </p>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2 relative max-w-md mx-auto lg:max-w-none w-full">
              <div
                className="absolute -inset-3 sm:-inset-4 rounded-3xl border-2 border-primary/20"
                aria-hidden="true"
              />
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT'S INCLUDED ── */}
      {includedItems.length > 0 && (
        <section
          aria-labelledby="included-heading"
          className="max-w-6xl mx-auto px-4 py-10 sm:pb-12 sm:pt-0"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h2
              id="included-heading"
              className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
            >
              {data.includedTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {data.includedDesc}
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 list-none p-0">
            {includedItems.map((item: string, i: number) => (
              <li
                key={i}
                className="group flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-border
                           bg-card hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-200"
              >
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center
                                shrink-0 group-hover:bg-primary/20 transition-colors"
                >
                  <CheckCircle2
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── 4. WHAT YOU'LL GAIN ── */}
      {data.benefits?.length > 0 && (
        <section
          aria-labelledby="benefits-heading"
          className="bg-muted/5 border-t border-border"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="text-center mb-8 sm:mb-10">
              <h2
                id="benefits-heading"
                className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
              >
                {data.benefitsTitle}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                {data.benefitsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {data.benefits.map(
                (b: { title: string; text: string }, i: number) => {
                  const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                  return (
                    <article
                      key={i}
                      className="group relative p-5 sm:p-6 rounded-2xl border border-border bg-background
                               hover:border-primary/30 hover:shadow-lg hover:-translate-y-1
                               transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 sm:mb-5">
                        <Icon
                          className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 text-base sm:text-lg">
                        {b.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-grow">
                        {b.text}
                      </p>
                    </article>
                  );
                },
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. PROCESS — 4 steps ── */}
      {data.process?.length > 0 && (
        <section
          aria-labelledby="process-heading"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-border"
        >
          <div className="text-center mb-10 sm:mb-12">
            <h2
              id="process-heading"
              className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
            >
              {data.processTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {data.processDesc}
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative list-none p-0">
            <div
              className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-border"
              aria-hidden="true"
            />
            {data.process.map(
              (p: { step: string; title: string; text: string }, i: number) => (
                <li
                  key={i}
                  className="flex flex-col items-center text-center gap-3 sm:gap-4"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card border border-primary/20 flex items-center justify-center z-10 shrink-0 shadow-sm">
                    <span className="text-base sm:text-lg font-bold text-primary">
                      {p.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5 sm:mb-2 text-base sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                      {p.text}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </section>
      )}

      {/* ── 6. TECH STACK ── */}
      <section
        aria-labelledby="tech-heading"
        className="py-12 sm:py-16 border-t border-border bg-muted/5"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2
              id="tech-heading"
              className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
            >
              {data.techTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {data.techDesc}
            </p>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 list-none p-0">
            {TECH_STACK.map((tech, i) => (
              <li
                key={i}
                className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-xl
                           border border-border bg-muted/10 hover:border-primary/30 hover:bg-primary/5
                           transition-all group cursor-default"
              >
                <tech.icon
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                  {tech.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. FAQ — AEO / GEO section (native details = zero JS) ── */}
      {faqs.length > 0 && (
        <section
          aria-labelledby="faq-heading"
          className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-border"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
            >
              {data.faqTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {data.faqDesc}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card overflow-hidden
                           hover:border-primary/30 transition-colors"
              >
                <summary
                  className="flex items-center justify-between gap-4 cursor-pointer p-4 sm:p-5
                             font-semibold text-foreground text-sm sm:text-base
                             list-none [&::-webkit-details-marker]:hidden
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <h3 className="text-left">{f.q}</h3>
                  <ChevronDown
                    className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ── 9. CROSS-LINK (related service) ── */}
      {data.crossLink && (
        <section
          aria-label="Related service"
          className="max-w-6xl mx-auto px-4 sm:px-6 pb-4"
        >
          <Link
            href={`/${locale}${data.crossLink.href}`}
            className="group flex flex-col sm:flex-row items-center justify-between gap-3
                       p-5 sm:p-6 rounded-2xl border border-primary/20 bg-primary/5
                       hover:border-primary/40 hover:bg-primary/10 transition-all"
          >
            <p className="text-sm sm:text-base font-medium text-foreground text-center sm:text-start">
              {data.crossLink.text}
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base shrink-0">
              {data.crossLink.linkText}
              <ArrFwd
                size={16}
                className="group-hover:translate-x-0.5 transition-transform rtl:rotate-180"
                aria-hidden="true"
              />
            </span>
          </Link>
        </section>
      )}

      {/* ── 8. CTA ── */}
      <section
        aria-label="Call to Action"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
      >
        <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative text-center py-10 sm:py-16 px-5 sm:px-12 z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 max-w-2xl mx-auto leading-tight text-foreground">
              {svc.cta_title}
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
              {svc.cta_desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2
                           px-8 py-3.5 rounded-xl bg-primary text-primary-foreground
                           font-semibold text-sm sm:text-base
                           hover:opacity-90 active:scale-95 transition-all
                           shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {svc.cta_btn}
                <ArrFwd
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                           px-8 py-3.5 rounded-xl border border-border bg-background
                           text-foreground font-semibold text-sm sm:text-base
                           hover:border-primary/30 hover:bg-muted/50 active:scale-95 transition-all
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {data.AnothersrvcBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
