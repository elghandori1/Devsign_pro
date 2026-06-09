// /app/[locale]/services/business-systems/page.tsx
import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldAlert,
  BarChart3,
  Bot,
  Network,
  Database,
  Code2,
  Layout,
  Server,
  Briefcase,
  Package,
  Workflow,
  Sparkles,
} from "lucide-react";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = dict.pages.services_page.services.systems;

  const keywords = locale === "ar"
    ? [
        "أتمتة الأعمال المغرب",
        "أنظمة ذكاء اصطناعي",
        "أتمتة سير العمل",
        "لوحات تحكم مخصصة",
        "كفاءة الأعمال",
        "تحسين العمليات",
        "تكامل الذكاء الاصطناعي",
        "أتمتة المهام المتكررة",
      ]
    : locale === "fr"
      ? [
          "automatisation entreprise Maroc",
          "systèmes IA",
          "automatisation flux de travail",
          "tableaux de bord personnalisés",
          "efficacité entreprise",
          "optimisation processus",
          "intégration IA",
          "automatisation tâches répétitives",
        ]
      : [
          "business automation Morocco",
          "AI systems Morocco",
          "workflow automation",
          "custom dashboards",
          "business efficiency",
          "process optimization",
          "AI integration",
          "automated reporting",
          "scalable solutions",
        ];

  return buildPageMetadata({
    locale,
    title: `${data.title} | Devsign`,
    description: data.description,
    route: "/services/business-systems",
    keywords: keywords,
  });
}

// Icons for Benefits
const BENEFIT_ICONS = [Clock, ShieldAlert, BarChart3];

// Icons for Use Cases
const USE_CASE_ICONS = [Briefcase, Package, BarChart3, Bot];

// Helper to map string tech names from JSON to Lucide Icons dynamically
const getTechIcon = (techName: string) => {
  const name = techName.toLowerCase();
  if (name.includes("node")) return Server;
  if (name.includes("python")) return Code2;
  if (name.includes("openai") || name.includes("ai")) return Bot;
  if (name.includes("api") || name.includes("rest")) return Network;
  if (name.includes("mongo") || name.includes("sql") || name.includes("database"))
    return Database;
  if (name.includes("react") || name.includes("vue")) return Layout;
  return Workflow;
};

export default async function BusinessSystemsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const svc = dict.pages.services_page;
  const data = svc.services.systems;
  const isRtl = locale === "ar";

  const Arr = isRtl ? ArrowRight : ArrowLeft;
  const ArrFwd = isRtl ? ArrowLeft : ArrowRight;

  const overviewHeadline =
    locale === "ar"
      ? "أنظمة تعمل بدلاً منك، لا مجرد أدوات"
      : locale === "fr"
        ? "Des systèmes qui travaillent pour vous, pas seulement des outils"
        : "Systems That Work for You, Not Just Tools";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    image: data.image || `${getBaseUrl()}/og-image.jpg`,
    url: `${getBaseUrl()}/${locale}/services/business-systems`,
    provider: {
      "@type": "Organization",
      name: "Devsign",
      url: "https://devsign.ma",
      telephone: "+212 7 78 00 00 06",
      email: "contact@devsign.ma",
    },
    serviceType:
      locale === "en"
        ? "Business Systems and Automation"
        : locale === "fr"
          ? "Systèmes d'entreprise et automatisation"
          : "أنظمة الأعمال والأتمتة",
    areaServed: { "@type": "Country", name: "Morocco" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${getBaseUrl()}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${getBaseUrl()}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: `${getBaseUrl()}/${locale}/services/business-systems`,
      },
    ],
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. HERO — Same Style as Web Dev Page*/}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-border"
      >
        {/* Subtle background tint */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"
          aria-hidden="true"
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        {/* Soft glows */}
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
          {/* Large faint squares */}
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/[0.04] rotate-12" />
          <div className="absolute top-24 left-32 w-48 h-48 border border-white/[0.03] -rotate-6" />
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-white/[0.04] rotate-45" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-white/[0.03] -rotate-12" />
          <div className="absolute bottom-32 left-1/4 w-56 h-56 border border-white/[0.02] rotate-6" />

          {/* Small scattered squares */}
          <div className="absolute top-16 right-16 w-8 h-8 bg-primary/10 rotate-12" />
          <div className="absolute top-40 right-40 w-6 h-6 bg-primary/15 -rotate-6" />
          <div className="absolute bottom-40 left-16 w-10 h-10 bg-primary/10 rotate-45" />
          <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-white/5 rotate-12" />
          <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-white/5 -rotate-12" />
          <div className="absolute top-20 left-1/2 w-3 h-3 bg-primary/20 rotate-6" />
          <div className="absolute bottom-24 right-1/2 w-7 h-7 bg-white/[0.03] -rotate-45" />

          {/* Filled squares with blur glow */}
          <div className="absolute top-1/4 left-[15%] w-20 h-20 bg-primary/5 blur-2xl rounded-sm" />
          <div className="absolute bottom-1/4 right-[15%] w-28 h-28 bg-blue-500/5 blur-3xl rounded-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/[0.03] blur-3xl rounded-sm" />
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary
                          border border-primary/20 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Arr size={14} aria-hidden="true" />
              {svc.title}
            </Link>
          </nav>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight
                       leading-[1.1] text-foreground mb-5 max-w-4xl"
          >
            {data.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-7">
            {data.description}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(data.features ?? []).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full
                           text-xs sm:text-sm font-medium border border-primary/20
                           hover:bg-primary/15 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
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

      {/* 2. OVERVIEW — Text + Image Square*/}
      {data.features?.length > 0 && (
        <section
          aria-labelledby="overview-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} />
                {data.overviewTitle}
              </div>
              <h2
                id="overview-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
              >
                {overviewHeadline}
              </h2>
              <div
                className="w-12 h-1.5 bg-primary rounded-full"
                aria-hidden="true"
              />
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  {data.startDescription}
                </span>{" "}
                {data.longDescription}
              </p>
              {data.company_recruitment && (
                <p className="text-primary font-medium">
                  {data.company_recruitment}
                </p>
              )}
            </div>

            {/* Right: Image as a Square */}
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none w-full rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image
                src={data.image}
                alt={`${data.title} — preview`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          2b. SIMPLE STATS — Square Cards, No Description
         ═══════════════════════════════════════ */}
      {data.stats?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {data.stats.map(
              (stat: { value: string; label: string }, i: number) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-1 p-5 sm:p-6 rounded-xl border border-border bg-card
                             hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary">{stat.value}</div>
                  <div className="text-sm sm:text-base font-semibold text-foreground text-center">{stat.label}</div>
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {/* ── 3. WHAT'S INCLUDED ── */}
      {data.features?.length > 0 && (
        <section
          aria-labelledby="included-heading"
          className="max-w-6xl mx-auto px-4 py-12 sm:py-16 border-t border-border"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {data.features.map((f: string, i: number) => (
              <article
                key={i}
                className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-border
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
                <span className="text-sm sm:text-base font-medium text-foreground">
                  {f}
                </span>
              </article>
            ))}
          </div>
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

                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors">
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

      {/* ── 5. USE CASES ── */}
      {data.useCases?.length > 0 && (
        <section
          aria-labelledby="usecases-heading"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-border"
        >
          <div className="text-center mb-10 sm:mb-12">
            <h2
              id="usecases-heading"
              className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
            >
              {data.useCasesTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {data.useCasesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {data.useCases.map(
              (uc: { title: string; text: string }, i: number) => {
                const Icon = USE_CASE_ICONS[i % USE_CASE_ICONS.length];
                return (
                  <article
                    key={i}
                    className="group p-5 sm:p-6 rounded-2xl border border-border bg-card
                             hover:border-primary/30 hover:shadow-lg hover:-translate-y-1
                             transition-all duration-300"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon
                        className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-base sm:text-lg">
                      {uc.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {uc.text}
                    </p>
                  </article>
                );
              },
            )}
          </div>
        </section>
      )}

      {/* ── 6. PROCESS ── */}
      {data.process?.length > 0 && (
        <section
          aria-labelledby="process-heading"
          className="bg-muted/5 border-t border-border"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
              <div
                className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-border"
                aria-hidden="true"
              />

              {data.process.map(
                (p: { step: string; title: string; text: string }, i: number) => (
                  <article
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
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. TECH STACK ── */}
      {data.techStackList?.length > 0 && (
        <section
          aria-labelledby="tech-heading"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-border"
        >
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {data.techStackList.map((tech: string, i: number) => {
              const Icon = getTechIcon(tech);
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-xl
                             border border-border bg-muted/10 hover:border-primary/30 hover:bg-primary/5 
                             transition-all group cursor-default"
                >
                  <Icon
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                    {tech}
                  </span>
                </div>
              );
            })}
          </div>
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
              {svc.ctat_title}
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