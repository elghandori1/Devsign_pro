// /app/[locale]/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Award,
  Code2,
  FileCheck,
  Sparkles} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import Statistics from "../../components/Statistics";

type Props = { params: Promise<{ locale: string }> };

const getSEOKeywords = (locale: Locale): string[] =>
  ({
    en: [
      "web development services Morocco",
      "SEO services Morocco",
      "AI automation services",
      "website design Morocco",
      "business automation solutions",
    ],
    fr: [
      "développement web Maroc",
      "services SEO Maroc",
      "automatisation IA entreprise",
      "création site web Casablanca",
      "solutions automatisation business",
    ],
    ar: [
      "تطوير ويب المغرب",
      "خدمات SEO المغرب",
      "أتمتة الذكاء الاصطناعي",
      "تصميم مواقع المغرب",
      "حلول أتمتة الأعمال",
    ],
  })[locale] ?? [];

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const titles = {
    en: "Web Development, SEO & AI Automation Services in Morocco | Devsign",
    fr: "Développement Web, SEO & Automatisation IA au Maroc | Devsign",
    ar: "تطوير الويب وتحسين SEO وأتمتة الذكاء الاصطناعي في المغرب | Devsign",
  };
  const descriptions = {
    en: "Expert web development, SEO optimization, AI business automation, and high-converting ad design in Morocco. Boost your online presence with Devsign.",
    fr: "Services professionnels au Maroc : développement web, optimisation SEO, automatisation IA et design publicitaire performant.",
    ar: "خدمات احترافية في تطوير الويب، تحسين SEO، أتمتة الأعمال بالذكاء الاصطناعي وتصميم إعلانات عالية التحويل في المغرب.",
  };

  return buildPageMetadata({
    locale,
    title: titles[locale],
    description: descriptions[locale],
    route: "/services",
    keywords: getSEOKeywords(locale),
  });
}

const WHY_ICONS = [Award, Code2, FileCheck];

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const data = dict.pages?.services_page;
  const portfolioProjects = dict.pages?.portfolio_page?.projects ?? [];
  if (!data) return null;

  const isRtl = locale === "ar";
  const baseUrl = getBaseUrl();

  const servicesList = Object.values(data.services) as Array<{
    title: string;
    description: string;
    link: string;
    image: string;
    features: string[];
  }>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/${locale}/services#page`,
        url: `${baseUrl}/${locale}/services`,
        name: data.heading,
        description: data.description,
        inLanguage: locale,
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/${locale}/services#list`,
        itemListElement: servicesList.map((svc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: svc.title,
            description: svc.description,
            image: `${baseUrl}${svc.image}`,
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: { "@type": "Country", name: "Morocco" },
          },
        })),
      },
    ],
  };

  const Arr = isRtl ? ArrowLeft : ArrowRight;
  const arrClass = isRtl ? "rotate-180" : "";

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden hero-section-light border-b border-border"
      >
        {/* grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
          {/* pill */}
          <div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary
                          border border-primary/20 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles size={13} aria-hidden="true" />
            {data.subtitle}
          </div>

          {/* h1 — primary SEO target */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight
                       leading-[1.1] mb-5 max-w-4xl"
          >
            {data.heading}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-7">
            {data.description}
          </p>

          {/* hashtag chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(data.hashtags ?? []).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full
                           text-xs sm:text-sm font-medium border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES ── */}
      <section
        aria-labelledby="services-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20"
      >
        {/* section label */}
        <div className="text-center mb-10 sm:mb-14">
          <h2
            id="services-heading"
            className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-2"
          >
            <Award
              className="w-6 h-6 text-primary shrink-0"
              aria-hidden="true"
            />
            {data.subtitle}
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, idx) => (
            <article
              key={service.title ?? idx}
              className="group relative flex flex-col rounded-2xl border border-border bg-card
                         overflow-hidden transition-all duration-300
                         hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
            >
              <Link
                href={`/${locale}${service.link}`}
                className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* thumbnail */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={idx < 2 ? "eager" : "lazy"}
                    priority={idx < 2}
                    quality={80}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* body */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2.5 leading-snug
                                 group-hover:text-primary transition-colors duration-200 line-clamp-2"
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-4">
                    {service.description}
                  </p>

                  {/* feature pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.features.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium
                                   rounded-full border
                                   border-primary/20 group-hover:bg-primary/5
                                   text-primary transition-all duration-200"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-primary opacity-60"
                          aria-hidden="true"
                        />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* divider */}
                  <div className="border-t border-border mb-4" />

                  {/* CTA row */}
                  <div
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold text-primary
                                   ${isRtl ? "flex-row-reverse" : ""}`}
                  >
                    <span>{data.cta}</span>
                    <Arr
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-200
                        group-hover:${isRtl ? "-translate-x-1" : "translate-x-1"} ${arrClass}`}
                    />
                  </div>
                </div>

                {/* bottom accent bar */}
                <div
                  className="absolute bottom-0 inset-x-0 h-[3px] bg-primary
                                scale-x-0 group-hover:scale-x-100
                                transition-transform duration-300 origin-left
                                rounded-b-2xl"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── 3. SELECTED PROJECTS ── */}
      <section
        aria-labelledby="projects-heading"
        className="border-t border-border bg-muted/20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center mb-10 sm:mb-14">
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              {data.Selected_projects}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {data.Real_results}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {portfolioProjects
              .filter((p) => p.type === "professional")
              .slice(0, 3)
              .map((project, idx) => (
                <article
                  key={project.title ?? idx}
                  className="group flex flex-col rounded-2xl border border-border bg-card
                             overflow-hidden transition-all duration-300
                             hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                >
                  <Link
                    href={`/${locale}${project.href}`}
                    className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {/* image */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-muted shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* category badge */}
                      <div
                        className={`absolute top-3 ${isRtl ? "right-3" : "left-3"}`}
                      >
                        <span
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full
                                         bg-black/50 backdrop-blur-sm border border-white/20 text-white"
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* view overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center
                                      bg-black/50 backdrop-blur-[2px] opacity-0
                                      group-hover:opacity-100 transition-all duration-300"
                        aria-hidden="true"
                      >
                        <span
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                         bg-background text-primary font-semibold text-xs sm:text-sm
                                         translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          {data.viewDetails ?? "View details"}
                          <Arr size={14} className={arrClass} />
                        </span>
                      </div>
                    </div>

                    {/* body */}
                    <div className="flex flex-col flex-1 p-5">
                      <h3
                        className="font-semibold text-base sm:text-lg mb-2 line-clamp-2
                                     group-hover:text-primary transition-colors duration-200 leading-snug"
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1">
                        {project.description}
                      </p>

                      {/* tech tags + status */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech
                          .split(",")
                          .slice(0, 3)
                          .map((tech, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium
                                   rounded-full border
                                   border-primary/20 group-hover:bg-primary/5
                                   text-primary transition-all duration-200"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                      </div>

                      {project.status && (
                        <div
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                         bg-emerald-500/10 border border-emerald-500/20 w-fit"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                            aria-hidden="true"
                          />
                          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 capitalize">
                            {project.status}
                          </span>
                        </div>
                      )}

                      <span className="inline-flex items-center justify-end gap-2 text-primary font-semibold text-sm group/link">
                        <span className="relative">
                          {project.linkLabel}
                          <span
                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full"
                            aria-hidden="true"
                          />
                        </span>
                        {isRtl ? (
                          <ArrowLeft
                            className="w-4 h-4 transition-transform duration-300 group-hover/link:-translate-x-1"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowRight
                            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                         border border-border bg-card text-foreground font-semibold text-sm
                         hover:border-primary/40 hover:text-primary hover:bg-primary/5
                         active:scale-95 transition-all duration-200"
            >
              {data.View_All_Projects}
              <Arr size={15} aria-hidden="true" className={arrClass} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE US ── */}
      {data.whyChooseUs && (
        <section
          aria-labelledby="why-heading"
          className="border-t border-border"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="text-center mb-10 sm:mb-14">
              <h2
                id="why-heading"
                className="text-2xl sm:text-3xl font-bold mb-3"
              >
                {data.whyChooseUs.title}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {data.whyChooseUs.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {data.whyChooseUs.reasons?.map(
                (r: { title: string; text: string }, i: number) => {
                  const Icon = WHY_ICONS[i % WHY_ICONS.length];
                  return (
                    <div
                      key={r.title}
                      className="group relative p-5 sm:p-6 rounded-2xl border border-border bg-card
                               hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                    >
                      {/* top shimmer on hover */}
                      <div
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent
                                    via-primary/40 to-transparent opacity-0 group-hover:opacity-100
                                    transition-opacity rounded-t-2xl"
                        aria-hidden="true"
                      />

                      <div
                        className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center
                                    mb-4 group-hover:bg-primary/20 transition-colors"
                      >
                        <Icon
                          className="w-5 h-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 text-base">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {r.text}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. STATISTICS ── */}
      <div className="border-t border-border">
        <Statistics translations={dict.homepage.stats} />
      </div>

      {/* ── 6. FINAL CTA ── */}
      <section aria-labelledby="cta-heading" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center py-12 sm:py-16 px-5 sm:px-12">
              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-tight"
              >
                {data.ctat_title}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                {data.cta_desc}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                           bg-primary text-primary-foreground font-semibold text-sm sm:text-base
                           hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                {data.cta_btn}
                {isRtl ? (
                  <ArrowLeft
                    className="w-4 h-4 transition-transform duration-300 group-hover/link:-translate-x-1"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
