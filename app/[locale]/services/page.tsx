import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Award,
  Code2,
  FileCheck,
} from "lucide-react";

import { Locale, i18n } from "@/i18n-config";
import getTrans from "@/app/lib/translation";
import { getBaseUrl, buildPageMetadata } from "@/app/lib/seo";

const SERVICE_IMAGES = {
  web: "/images/service-web.jpg",
  systems: "/images/service-systems.jpg",
  design: "/images/service-design.jpg",
};

const SERVICES_HERO_IMAGE = "/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const baseUrl = getBaseUrl();

  const title =
    locale === "en"
      ? "Web Development, SEO & AI Automation Services in Morocco | Devsign"
      : locale === "ar"
      ? "خدمات تطوير الويب، SEO وأتمتة الذكاء الاصطناعي في المغرب | Devsign"
      : "Services Développement Web, SEO & Automatisation IA au Maroc | Devsign";

  const description =
    locale === "en"
      ? "Expert web development, SEO optimization, AI business automation, and high-converting ad design services in Morocco."
      : locale === "ar"
      ? "خدمات احترافية في تطوير الويب، تحسين SEO، أتمتة الأعمال بالذكاء الاصطناعي وتصميم إعلانات عالية التحويل."
      : "Services professionnels au Maroc : développement web, SEO, automatisation IA et design publicitaire.";

  const keywords =
    locale === "en"
      ? [
          "web development services Morocco",
          "SEO services Morocco",
          "AI automation services",
        ]
      : locale === "ar"
      ? ["تطوير الويب المغرب", "SEO المغرب", "أتمتة الأعمال"]
      : ["développement web Maroc", "SEO Maroc", "automatisation IA"];

  return buildPageMetadata({
    locale,
    baseUrl,
    title,
    description,
    path: "/services",
    keywords,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getTrans(locale);
  const t = dict.pages?.services;

  if (!t) return null;

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
      ? "Professional services including web development, SEO optimization, and AI automation."
      : locale === "ar"
      ? "خدمات تشمل تطوير الويب وتحسين SEO وأتمتة الأعمال."
      : "Services incluant développement web, SEO et automatisation IA.";

  const services = [
    {
      key: "web",
      title: t.web.title,
      description: t.web.description,
      features: t.web.features,
      image: SERVICE_IMAGES.web,
      href: `/${locale}/services/web-development`,
    },
    {
      key: "systems",
      title: t.systems.title,
      description: t.systems.description,
      features: t.systems.features,
      image: SERVICE_IMAGES.systems,
      href: `/${locale}/services/business-systems`,
    },
    {
      key: "design",
      title: t.design.title,
      description: t.design.description,
      features: t.design.features,
      image: SERVICE_IMAGES.design,
      href: `/${locale}/services/social-design`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/${locale}/services#page`,
        "url": `${baseUrl}/${locale}/services`,
        "name": title,
        "description": description,
        "inLanguage": locale,

        "isPartOf": {
          "@id": `${baseUrl}/#website`,
        },

        "about": {
          "@id": `${baseUrl}/#organization`,
        },

        "mainEntity": {
          "@id": `${baseUrl}/${locale}/services#list`,
        },
      },

      {
        "@type": "ItemList",
        "@id": `${baseUrl}/${locale}/services#list`,
        "name":
          locale === "en"
            ? "Web Development and Digital Services"
            : locale === "ar"
            ? "الخدمات الرقمية"
            : "Services Digitaux",

        "itemListElement": services.map((svc, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "@id": `${baseUrl}/services#service-${index + 1}`,
            "name": svc.title,
            "serviceType": svc.title,
            "description": svc.description,
            "provider": {
              "@id": `${baseUrl}/#organization`,
            },
            "areaServed": {
              "@type": "Country",
              "name": "Morocco",
            },
          },
        })),
      },
    ],
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      
      />
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-wider text-primary mb-3">
                {t.subtitle}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-foreground">
                {t.heading}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t.description}
              </p>
            </div>

            {/* Desktop CTA */}
            <Link
              href={`/${locale}/contact`}
              className="hidden lg:inline-flex items-center gap-2 px-6 py-3 text-sm bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-primary/20 shrink-0"
            >
              {t.cta}
              {isRtl
                ? <ArrowLeft size={16} aria-hidden />
                : <ArrowRight size={16} aria-hidden />}
            </Link>
          </div>

          {/* ── Service cards grid ────────────────────────────────────────── */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.key}
                className="group relative flex flex-col h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
              >
                <Link href={service.href} className="flex flex-col h-full">

                  {/* Card image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted shrink-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* subtle dark overlay at bottom for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-grow p-6 sm:p-7">

                    <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                      {service.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-grow">
                      {service.description}
                    </p>

                    {/* Feature pills */}
                    {service.features?.length > 0 && (
                      <ul className="flex flex-wrap gap-2 mb-5">
                        {service.features.map((f: string) => (
                          <li
                            key={f}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-muted/60 dark:bg-muted/30 text-muted-foreground"
                          >
                            <Check className="w-3 h-3 text-primary shrink-0" aria-hidden />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Inline CTA */}
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-auto">
                      {t.cta}
                      {isRtl
                        ? <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden />
                        : <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />}
                    </span>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />

                </Link>
              </article>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-10 flex justify-center lg:hidden">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3.5 text-sm bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
            >
              {t.cta}
            </Link>
          </div>

          {/* ── Why choose us ─────────────────────────────────────────────── */}
          {t.whyChooseUs && (
            <div className="mt-20 pt-14 border-t border-border">
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {t.whyChooseUs.title}
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  {t.whyChooseUs.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {t.whyChooseUs.reasons?.map(
                  (r: { title: string; text: string }, i: number) => {
                    const icons = [Award, Code2, FileCheck];
                    const Icon = icons[i % icons.length];
                    return (
                      <div
                        key={r.title}
                        className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors"
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5 text-primary" aria-hidden />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {r.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {r.text}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Hero image */}
              <div className="relative aspect-[21/9] max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border bg-card">
                <Image
                  src={SERVICES_HERO_IMAGE}
                  alt={t.whyChooseUs.imageCaption ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm text-muted-foreground font-medium">
                  {t.whyChooseUs.imageCaption}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}