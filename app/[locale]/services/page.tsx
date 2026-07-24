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
  Sparkles,
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import Statistics from "../../components/Statistics";
import { FAQPageSchema } from "@/app/components/schemas/FAQPageSchema";

type Props = { params: Promise<{ locale: string }> };

const getSEOKeywords = (locale: Locale): string[] =>
  ({
    en: [
      "web development services Morocco",
      "freelance web development Morocco",
      "AI automation services",
      "website design Morocco",
      "business automation solutions",
    ],
    fr: [
      "développement web Maroc",
      "freelance développement web Maroc",
      "automatisation IA entreprise",
      "création site web Casablanca",
      "solutions automatisation business",
    ],
    ar: [
      "تطوير ويب المغرب",
      "خدمات تطوير الويب المغرب",
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
    en: "Web Development, Technical SEO & AI Automation Services| Devsignpro",
    fr: "Services de Développement Web, SEO Technique & IA | Devsignpro",
    ar: "خدمات تطوير الويب، SEO التقني وأتمتة الذكاء الاصطناعي | Devsignpro",
  };

  const descriptions = {
    en: "Freelance web developer Morocco specializing in Next.js, Technical SEO, GEO & AEO. Building high-performance websites, e-commerce & AI automation solutions.",
    fr: "Développeur web freelance Maroc spécialisé en Next.js, SEO technique, GEO & AEO. Création de sites performants, e-commerce et automatisation IA.",
    ar: "مطور ويب مستقل بالمغرب متخصص في Next.js، SEO تقني، GEO وAEO. بناء مواقع عالية الأداء، متاجر إلكترونية وحلول أتمتة الذكاء الاصطناعي.",
  };

  return buildPageMetadata({
    locale,
    title: titles[locale],
    description: descriptions[locale],
    route: "/services",
    keywords: getSEOKeywords(locale),
    ogImagePath: "/cover/Designpro-cover.jpg",
    type: "website",
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

  const servicesList = Object.entries(data.services || {}).map(
    ([key, svc]: [string, any]) => ({
      id: key,
      title: svc.title ?? "",
      title_card: svc.title_card, 
      description: svc.description ?? "",
      link: svc.link ?? `/${locale}/services/${key}`,
      image: svc.image ?? "",
      features: svc.features ?? [],
      category: svc.category ?? "digital-solutions",
    }),
  );

  const faqs = [
    {
      question:
        locale === "en"
          ? "What is Generative Engine Optimization (GEO)?"
          : locale === "ar"
            ? "ما هو تحسين محرك التوليد (GEO)؟"
            : "Qu'est-ce que l'Optimisation du Moteur Génératif (GEO) ?",
      answer:
        locale === "en"
          ? "GEO is the practice of structuring your website and content so AI platforms like ChatGPT, Google AI Overviews, and Perplexity can discover, cite, and recommend your business in their answers. Unlike traditional SEO which targets blue links, GEO ensures your brand appears inside AI-generated responses—driving highly qualified traffic."
          : locale === "ar"
            ? "GEO هو ممارسة تنظيم موقعك والمحتوى بحيث تتمكن منصات الذكاء الاصطناعي مثل ChatGPT وGoogle AI Overviews وPerplexity من اكتشاف علامتك التجارية والإشارة إليها في إجاباتها."
            : "Le GEO est la pratique consistant à structurer votre site et votre contenu pour que les plateformes IA comme ChatGPT, Google AI Overviews et Perplexity puissent découvrir et citer votre entreprise.",
    },
    {
      question:
        locale === "en"
          ? "What is Answer Engine Optimization (AEO)?"
          : locale === "ar"
            ? "ما هو تحسين محرك الإجابات (AEO)؟"
            : "Qu'est-ce que l'Optimisation du Moteur de Réponses (AEO) ?",
      answer:
        locale === "en"
          ? "AEO focuses on formatting your content to directly answer user questions in featured snippets, voice search, and AI chatbots. By using schema markup, FAQ schema, and concise entity-first content, AEO helps you capture position zero and voice search results."
          : locale === "ar"
            ? "يركز AEO على تنسيق المحتوى للإجابة المباشرة على أسئلة المستخدمين في المقتطفات المميزة والبحث الصوتي وروبوتات الدردشة AI."
            : "L'AEO se concentre sur le formatage de votre contenu pour répondre directement aux questions des utilisateurs dans les extraits enrichis, la recherche vocale et les chatbots IA.",
    },
    {
      question:
        locale === "en"
          ? "Do you provide Technical SEO and Core Web Vitals optimization?"
          : locale === "ar"
            ? "هل تقدم تحسين SEO التقني وCore Web Vitals؟"
            : "Proposez-vous du SEO technique et l'optimisation des Core Web Vitals ?",
      answer:
        locale === "en"
          ? "Yes. Every project includes technical SEO audits, Lighthouse optimization, structured data implementation (Schema.org), crawl budget management, and Core Web Vitals tuning (LCP, INP, CLS) to ensure top rankings and user experience."
          : locale === "ar"
            ? "نعم. يتضمن كل مشروع تدقيقات SEO تقنية وتحسين Lighthouse وتنفيذ البيانات المنظمة وإدارة ميزانية الزحف وضبط Core Web Vitals."
            : "Oui. Chaque projet inclut des audits SEO techniques, l'optimisation Lighthouse, l'implémentation de données structurées et le réglage des Core Web Vitals.",
    },
    {
      question:
        locale === "en"
          ? "Do you offer Technical SEO, GEO, and AEO audits?"
          : locale === "ar"
            ? "هل تقدم عمليات تدقيق SEO تقني وGEO وAEO؟"
            : "Proposez-vous des audits SEO technique, GEO et AEO ?",
      answer:
        locale === "en"
          ? "Yes. I offer comprehensive audits covering Technical SEO (Core Web Vitals, structured data, indexability), Generative Engine Optimization (GEO) for ChatGPT and Perplexity visibility, and Answer Engine Optimization (AEO) for featured snippets and voice search. Perfect for businesses looking to improve both traditional and AI search presence."
          : locale === "ar"
            ? "نعم. أقدم عمليات تدقيق شاملة تغطي SEO التقني (Core Web Vitals والبيانات المنظمة وقابلية الفهرسة)، وGEO للظهور في ChatGPT وPerplexity، وAEO للمقتطفات المميزة والبحث الصوتي."
            : "Oui. Je propose des audits complets couvrant le SEO technique (Core Web Vitals, données structurées, indexabilité), le GEO pour la visibilité sur ChatGPT et Perplexity, et l'AEO pour les featured snippets et la recherche vocale.",
    },
  ];

  const serviceCollectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/${locale}/services#page`,
        url: `${baseUrl}/${locale}/services`,
        name: data.heading,
        description: data.description,
        inLanguage: locale,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        mainEntity: { "@id": `${baseUrl}/${locale}/services#list` },
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/${locale}/services#list`,
        itemListElement: servicesList.map((svc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            "@id": `${baseUrl}/${locale}/services/${svc.id}#service`,
            name: svc.title_card,
            description: svc.description,
            image: svc.image.startsWith("http")
              ? svc.image
              : `${baseUrl}${svc.image}`,
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: {
              "@type": "Place",
              name: "Morocco",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
              },
            },
            url: `${baseUrl}/${locale}${svc.link}`,
          },
        })),
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name:
          locale === "en" ? "Home" : locale === "ar" ? "الرئيسية" : "Accueil",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          locale === "en"
            ? "Services"
            : locale === "ar"
              ? "الخدمات"
              : "Services",
        item: `${baseUrl}/${locale}/services`,
      },
    ],
  };

  const Arr = isRtl ? ArrowLeft : ArrowRight;
  const arrClass = isRtl ? "rotate-180" : "";

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-background"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <FAQPageSchema faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceCollectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section
        aria-labelledby="services-hero-heading"
        className="relative overflow-hidden hero-section-light border-b border-border"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={13} aria-hidden="true" />
            {data.subtitle}
          </div>

          <h1
            id="services-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-5 max-w-5xl"
            itemProp="headline"
          >
            {data.heading}
          </h1>
          <p
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-7"
            itemProp="description"
          >
            {data.description}
          </p>

          <div
            className="flex flex-wrap gap-2 mb-8"
            role="list"
            aria-label="Service categories"
          >
            {(data.hashtags ?? []).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium border border-primary/20"
                role="listitem"
                itemProp="keywords"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      <section
        aria-labelledby="services-list-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20"
      >
        <header className="text-center mb-10 sm:mb-14">
          <h2
            id="services-list-heading"
            className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-2"
          >
            <Award
              className="w-6 h-6 text-primary shrink-0"
              aria-hidden="true"
            />
            {data.subtitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            {locale === "en"
              ? "Comprehensive digital solutions built for search engines, AI platforms, and business growth."
              : locale === "ar"
                ? "حلول رقمية شاملة مبنية لمحركات البحث ومنصات الذكاء الاصطناعي ونمو الأعمال."
                : "Solutions digitales complètes conçues pour les moteurs de recherche, les plateformes IA et la croissance business."}
          </p>
        </header>

        <div
          className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Available services"
        >
          {servicesList.map((service, idx) => (
            <article
              key={service.id}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
              role="listitem"
              itemScope
              itemType="https://schema.org/Service"
            >
              <Link
                href={`/${locale}${service.link}`}
                className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                itemProp="url"
              >
                {/* Thumbnail */}
                <figure className="relative w-full aspect-[16/10] overflow-hidden bg-muted shrink-0">
                  <Image
                    src={service.image}
                    alt={`${service.title} - ${locale === "en" ? "Professional service by Devsignpro Morocco" : locale === "ar" ? "خدمة احترافية من Devsignpro المغرب" : "Service professionnel par Devsignpro Maroc"}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={idx < 2 ? "eager" : "lazy"}
                    priority={idx < 2}
                    quality={80}
                    itemProp="image"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
            
                </figure>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <h3
                    className="text-lg sm:text-xl font-bold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2.5"
                    itemProp="name"
                  >
                    {service.title_card}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-4"
                    itemProp="description"
                  >
                    {service.description}
                  </p>

                  {/* Feature pills: AEO-optimized for AI extraction */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.features.map((f: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full border border-primary/20 group-hover:bg-primary/5 text-primary transition-all duration-200"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-primary opacity-60"
                          aria-hidden="true"
                        />
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-border mb-4" />

                  {/* CTA */}
                  <footer
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold text-primary ${isRtl ? "flex-row-reverse" : ""}`}
                  >
                    <span>{data.cta}</span>
                    <Arr
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-200 group-hover:${isRtl ? "-translate-x-1" : "translate-x-1"} ${arrClass}`}
                    />
                  </footer>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 inset-x-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="projects-heading"
        className="border-t border-border bg-primary/5"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <header className="text-center mb-10 sm:mb-14">
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              {data.Selected_projects}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {data.Real_results}
            </p>
          </header>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            role="list"
          >
            {portfolioProjects
              .filter((p: any) => p.type === "professional")
              .slice(0, 3)
              .map((project: any, idx: number) => (
                <article
                  key={project.title ?? idx}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  <Link
                    href={`/${locale}${project.href}`}
                    className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <figure className="relative h-48 sm:h-52 overflow-hidden bg-muted shrink-0">
                      <Image
                        src={project.image}
                        alt={`${project.title} - ${locale === "en" ? "Case study by Devsignpro" : locale === "ar" ? "دراسة حالة من Devsignpro" : "Étude de cas par Devsignpro"}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 3}
                        itemProp="image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      <div
                        className={`absolute top-2 ${isRtl ? "right-2" : "left-2"}`}
                      >
                        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white">
                          {project.category}
                        </span>
                      </div>

                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                        aria-hidden="true"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background text-primary font-semibold text-xs sm:text-sm translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          {data.viewDetails ?? "View details"}
                          <Arr size={14} className={arrClass} />
                        </span>
                      </div>
                    </figure>

                    <div className="flex flex-col flex-1 p-5">
                      <h3
                        className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-snug"
                        itemProp="name"
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1"
                        itemProp="description"
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech
                          .split(",")
                          .slice(0, 3)
                          .map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full border border-primary/20 group-hover:bg-primary/5 text-primary transition-all duration-200"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                      </div>

                      {project.status && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit mb-3">
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
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/40 hover:text-primary hover:bg-primary/5 active:scale-95 transition-all duration-200"
            >
              {data.View_All_Projects}
              <Arr size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {data.whyChooseUs && (
        <section
          aria-labelledby="why-heading"
          className="border-t border-border"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <header className="text-center mb-10 sm:mb-14">
              <h2
                id="why-heading"
                className="text-2xl sm:text-3xl font-bold mb-3"
              >
                {data.whyChooseUs.title}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {data.whyChooseUs.subtitle}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {data.whyChooseUs.reasons?.map(
                (r: { title: string; text: string }, i: number) => {
                  const Icon = WHY_ICONS[i % WHY_ICONS.length];
                  return (
                    <div
                      key={r.title}
                      className="group relative p-5 sm:p-6 rounded-2xl border border-border bg-primary/5 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                      role="listitem"
                      itemScope
                      itemType="https://schema.org/ListItem"
                    >
                      <meta itemProp="position" content={String(i + 1)} />
                      <div
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"
                        aria-hidden="true"
                      />
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon
                          className="w-5 h-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <h3
                        className="font-semibold text-foreground mb-2 text-base"
                        itemProp="name"
                      >
                        {r.title}
                      </h3>
                      <p
                        className="text-sm text-muted-foreground leading-relaxed"
                        itemProp="description"
                      >
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

      {/* ═══════════════════════════════════════════════════════
          5. STATISTICS
          ═══════════════════════════════════════════════════════ */}
      <div className="border-t border-border">
        <Statistics translations={dict.homepage.stats} locale={locale} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          6. FAQ SECTION (AEO-optimized for AI answers & snippets)
          ═══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-border bg-primary/5"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <header className="text-center mb-10 sm:mb-14">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              {locale === "en"
                ? "Frequently Asked Questions"
                : locale === "ar"
                  ? "الأسئلة الشائعة"
                  : "Questions Fréquemment Posées"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {locale === "en"
                ? "Everything you need to know about GEO, AEO, and modern web development."
                : locale === "ar"
                  ? "كل ما تحتاج لمعرفته حول GEO وAEO وتطوير الويب الحديث."
                  : "Tout ce que vous devez savoir sur le GEO, l'AEO et le développement web moderne."}
            </p>
          </header>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-border bg-card overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-primary/5 transition-colors">
                  <h3
                    className="font-semibold text-foreground pr-4"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  <span className="shrink-0 w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center text-primary group-open:rotate-180 transition-transform">
                    <ArrowRight
                      size={12}
                      className={isRtl ? "rotate-180" : ""}
                    />
                  </span>
                </summary>
                <div
                  className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. FINAL CTA
          ═══════════════════════════════════════════════════════ */}
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
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
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
