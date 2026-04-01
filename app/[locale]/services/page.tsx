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
  Briefcase,
} from "lucide-react";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import Statistics from "../../components/Statistics";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

const getSEOKeywords = (locale: Locale): string[] => {
  const keywordsMap = {
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
  };
  return keywordsMap[locale] || keywordsMap.en;
};

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
    en: "Expert web development, SEO optimization, AI business automation, and high-converting ads design services in Morocco. Boost your online presence with Devsign.",
    fr: "Services professionnels au Maroc : développement web expert, optimisation SEO, automatisation IA et design publicitaire performant. Augmentez votre présence en ligne.",
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

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const data = dict.pages?.services_page;
  const portfolioProjects = dict.pages?.portfolio_page?.projects || [];
  const WHY_CHOOSE_ICONS = [Award, Code2, FileCheck];
  if (!data) return null;

  const isRtl = locale === "ar";
  const baseUrl = getBaseUrl();

  const title =
    locale === "en"
      ? "Web Development, SEO & AI Automation Services in Morocco"
      : locale === "ar"
        ? "خدمات تطوير الويب وSEO وأتمتة الذكاء الاصطناعي"
        : "Services Développement Web, SEO & Automatisation IA";

  const description =
    locale === "en"
      ? "Professional web development, SEO optimization, and AI automation services in Morocco. Boost your online presence with expert digital solutions."
      : locale === "ar"
        ? "خدمات تطوير الويب وتحسين SEO وأتمتة الأعمال في المغرب. عزز وجودك الرقمي مع حلول احترافية."
        : "Services professionnels de développement web, optimisation SEO et automatisation IA au Maroc. Boostez votre présence en ligne.";

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
        name: title,
        description: description,
        inLanguage: locale,
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/${locale}/services#list`,
        name:
          locale === "en"
            ? "Web Development and Digital Services"
            : locale === "ar"
              ? "الخدمات الرقمية"
              : "Services Digitaux",
        itemListElement: servicesList.map((svc, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${baseUrl}/services#service-${index + 1}`,
            name: svc.title,
            image: `${baseUrl}${svc.image}`,
            serviceType: svc.title,
            description: svc.description,
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: { "@type": "Country", name: "Morocco" },
          },
        })),
      },
    ],
  };

  const hashtags = {
    en: [
      "#WebDevelopment",
      "#SEOServices",
      "#AIAutomation",
      "#DigitalSolutions",
    ],
    fr: [
      "#DéveloppementWeb",
      "#ServicesSEO",
      "#AutomatisationIA",
      "#SolutionsNumériques",
    ],
    ar: [
      "#تطوير_الويب",
      "#خدمات_SEO",
      "#أتمتة_الذكاء_الاصطناعي",
      "#حلول_رقمية",
    ],
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-background hero-section-light overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        aria-labelledby="hero-heading"
        className="px-4 sm:px-6 py-14 sm:py-16 md:py-18"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
            <div className="fade-in-section">
              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-foreground"
              >
                {data.heading}
              </h1>

              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {data.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                {hashtags[locale]?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/contact`}
              aria-label={data?.cta}
              className="hidden lg:inline-flex items-center gap-2 px-6 py-3 text-sm bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-primary/20 shrink-0 min-h-[48px]"
            >
              {data?.cta}
              {isRtl ? (
                <ArrowLeft size={16} aria-hidden="true" />
              ) : (
                <ArrowRight size={16} aria-hidden="true" />
              )}
            </Link>
          </div>

          <div className="w-full px-4 sm:px-6 text-center max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16 mt-6 sm:mt-8 fade-in-section">
            <h2
              id="services-heading"
              className="flex items-center justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4"
            >
              <Award
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                aria-hidden="true"
              />
              <span>{data?.subtitle}</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 fade-in-section mb-8 sm:mb-12">
            {servicesList.map((service, idx) => (
              <div
                key={service.title || idx}
                className="group relative flex flex-col h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30"
              >
                <Link
                  href={`/${locale}${service.link}`}
                  className="flex flex-col h-full relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {/* Image Header */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                    <Image
                      src={service.image}
                      alt={`Service: ${service.title}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading={idx < 2 ? "eager" : "lazy"}
                      quality={80}
                      priority={idx < 2}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow p-6 sm:p-8 relative z-10 bg-gradient-to-br from-card via-card to-card/95">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 flex-grow line-clamp-4">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature, fIdx) => (
                        <span
                          key={fIdx}
                          className="group/badge px-2 py-1 text-xs font-medium bg-background/60 backdrop-blur-sm rounded-full border border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-1"
                        >
                          <span
                            className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity"
                            aria-hidden="true"
                          />
                          {feature}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center text-primary font-semibold text-sm mt-auto pt-2">
                      <span className="relative">
                        {data?.cta}
                        <span
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 h-1 bg-primary transition-all duration-500 ease-out w-0 group-hover:w-full"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-10 flex justify-center lg:hidden">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3.5 text-sm bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md shadow-primary/20 min-h-[48px] flex items-center justify-center"
            >
              {data.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Projects Section */}
      <section
        aria-labelledby="projects-heading"
        className="px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 fade-in-section">
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-bold mb-4 text-primary"
            >
              {data.Selected_projects}
            </h2>
            <p className="text-muted-foreground text-lg">{data.Real_results}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects
              .filter((p) => p.type === "professional")
              .slice(0, 3)
              .map((project, idx) => (
                <article
                  key={project.title || idx}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 transition-all duration-500"
                >
                  <Link
                    href={`/${locale}${project.href}`}
                    className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div
                        className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        aria-hidden="true"
                      />
                      <Image
                        src={project.image}
                        alt={`Project: ${project.title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 3}
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1.5 bg-primary/95 backdrop-blur-sm text-primary-foreground text-xs font-bold rounded-lg shadow-lg">
                          {project.category}
                        </span>
                      </div>

                      {/* Quick View Overlay */}
                      <div
                        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/50 backdrop-blur-sm"
                        aria-hidden="true"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 text-primary rounded-full font-semibold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {isRtl ? "عرض التفاصيل" : "View Details"}
                          {isRtl ? (
                            <ArrowLeft className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow bg-gradient-to-br from-card to-card/80">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {project.status && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 border border-emerald-500/20 w-fit mb-4">
                          <span className=" font-medium text-emerald-600 dark:text-emerald-500 capitalize tracking-wide">
                            {project.status}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech
                          .split(",")
                          .slice(0, 3)
                          .map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium border border-primary/20"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                      </div>

                      <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link mt-2">
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

          <div className="text-center mt-16">
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group min-h-[48px]"
            >
              <span>{data.View_All_Projects}</span>
              {isRtl ? (
                <ArrowLeft
                  className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              ) : (
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      {data.whyChooseUs && (
        <section
          aria-labelledby="why-choose-us-heading"
          className="px-4 sm:px-6 py-14 sm:py-16"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center fade-in-section">
              <h2
                id="why-choose-us-heading"
                className="text-2xl sm:text-3xl font-bold text-primary mb-2"
              >
                {data.whyChooseUs.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {data.whyChooseUs.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.whyChooseUs.reasons?.map((r, i) => {
                const Icon = WHY_CHOOSE_ICONS[i % WHY_CHOOSE_ICONS.length];
                return (
                  <div
                    key={r.title}
                    className="p-6 rounded-2xl border border-border bg-card hover:bg-card/50 transition-colors text-center"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                      <Icon
                        className="w-5 h-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Statistics translations={dict.homepage.stats} />
      <br />
      <section
        aria-labelledby="cta-heading"
        className="bg-primary/5 px-4 sm:px-6 py-16 sm:py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-bold mb-4 text-primary"
          >
            {data.ctat_title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">{data.cta_desc}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:gap-3 group min-h-[48px]"
          >
            {data.cta_btn}
            {isRtl ? (
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                aria-hidden="true"
              />
            ) : (
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            )}
          </Link>
        </div>
      </section>
    </main>
  );
}
