// app/[locale]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import Statistics from "../components/Statistics";
import SubTitle from "../components/SubTitles";
import ServicesGrid from "../components/ServicesGrid";
import AboutMeSection from "../components/AboutMeSection";
import WhyWeAreSection from "../components/WhyWeAreSection";
import ProjectsShowcase from "../components/ProjectsShowcase";
import ContactSection from "../components/ContactSection";
import ScrollReveal from "../components/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const isEnglish = locale === "en";
  const isArabic = locale === "ar";

  const title = isEnglish
    ? "Full-Stack Web Developer Morocco | Website Design, SEO & AI Automation"
    : isArabic
      ? "مطور ويب في المغرب | تصميم مواقع، خبير سيو (SEO) وأتمتة ذكية"
      : "Développeur Web Full-Stack Maroc | Création Site Web, Expert SEO & IA";

  const description = isEnglish
    ? "Expert Full-Stack Web Developer in Morocco. Specialized in high-performance Next.js websites, SEO optimization, and AI-driven business automation for growth."
    : isArabic
      ? "مطور ويب (Full-Stack) في المغرب متخصص في تصميم مواقع احترافية، تحسين محركات البحث (SEO)، وحلول الأتمتة بالذكاء الاصطناعي لتطوير ونمو الشركات."
      : "Développeur Web Full-Stack au Maroc spécialisé en création de sites modernes, optimisation SEO avancée et automatisation d'entreprise par l'IA.";

  const keywords = isEnglish
    ? [
        "Full-Stack Developer Morocco",
        "SEO Specialist Morocco",
        "Web Design Agency Morocco",
        "AI Automation Agency Morocco",
        "Business Automation Systems",
        "Next.js Developer Morocco",
        "Social Media Ads Expert",
        "Social Media Ads Design",
        "Facebook Instagram TikTok Ads",
      ]
    : isArabic
      ? [
          "مطور ويب المغرب",
          "تصميم مواقع المغرب",
          "خبير سيو المغرب",
          "تحسين محركات البحث",
          "أتمتة الأعمال بالذكاء الاصطناعي",
          "انشاء موقع الكتروني",
          "وكالة ويب المغرب",
        ]
      : [
          "Création site web Maroc",
          "Développeur Web Freelance Maroc",
          "Expert SEO Maroc",
          "Référencement Naturel Maroc",
          "Automatisation IA Maroc",
          "Agence Web Maroc",
          "Développeur Next.js",
          "Site Web Responsive",
        ];

  return buildPageMetadata({
    locale,
    title,
    description,
    keywords,
    route: "",
  });
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const t = dict.homepage;
  const baseUrl = getBaseUrl();

  const isEnglish = locale === "en";
  const isArabic = locale === "ar";

  const orgDescription = isEnglish
    ? "Web developer in Morocco specialising in professional website design, SEO optimisation, AI-powered business automation, and social-media advertising design."
    : isArabic
      ? "مطور ويب محترف في المغرب متخصص في تصميم المواقع الاحترافية، تحسين محركات البحث، أنظمة أتمتة الأعمال بالذكاء الاصطناعي وتصميم إعلانات منصات التواصل الاجتماعي."
      : "Développeur web au Maroc spécialisé en création de sites web professionnels, optimisation SEO, automatisation d'entreprise par IA et conception publicitaire pour les réseaux sociaux.";

  const jobTitle = isEnglish
    ? "Full-Stack Developer, SEO Specialist & AI Automation Engineer"
    : isArabic
      ? "مطور Full-Stack وخبير SEO وأتمتة الأعمال بالذكاء الاصطناعي"
      : "Développeur Full-Stack, Expert SEO & Automatisation IA";
  const webPageName = isEnglish
    ? "Full-Stack Web Developer Morocco — Website Design, SEO & AI Automation"
    : isArabic
      ? "مطور ويب في المغرب — تطوير مواقع، خبير SEO وأتمتة الأعمال بالذكاء الاصطناعي"
      : "Développeur Web Full-Stack Maroc — Création Site Web, SEO & Automatisation IA";
  const webPageDescription = isEnglish
    ? "Professional Full-Stack Web Developer in Morocco. I build modern websites, provide SEO optimisation, AI business automation and high-converting digital solutions."
    : isArabic
      ? "مطور ويب محترف في المغرب متخصص في تطوير مواقع الويب الحديثة، تحسين محركات البحث وأتمتة الأعمال بالذكاء الاصطناعي."
      : "Développeur web full-stack au Maroc spécialisé en création de sites modernes, optimisation SEO et automatisation IA.";
  const catalogName = isEnglish
    ? "Digital Services"
    : isArabic
      ? "الخدمات الرقمية"
      : "Services Digitaux";

  const services: Array<{ name: string; description: string }> = isEnglish
    ? [
        {
          name: "Website Design & Development",
          description:
            "Custom, responsive websites built with Next.js and modern front-end technologies, optimised for speed, accessibility and conversion.",
        },
        {
          name: "SEO Optimisation",
          description:
            "Technical and on-page SEO audits, keyword strategy, structured data implementation and Core Web Vitals improvements to rank higher on Google.",
        },
        {
          name: "AI Business Automation",
          description:
            "End-to-end workflow automation using AI tools and APIs to reduce manual tasks, increase efficiency and scale business operations.",
        },
        {
          name: "Social Media Advertising Design",
          description:
            "High-converting ad creatives and campaigns for Facebook, Instagram and other platforms, designed to maximise ROI.",
        },
        {
          name: "Responsive Web Development",
          description:
            "Mobile-first development ensuring flawless performance on every screen size and device.",
        },
        {
          name: "Next.js Web Development",
          description:
            "Server-side rendered and statically generated web applications built with Next.js for outstanding performance and SEO.",
        },
      ]
    : isArabic
      ? [
          {
            name: "تصميم وتطوير المواقع الاحترافية",
            description:
              "تصميم مواقع ويب مخصصة ومتجاوبة باستخدام Next.js وأحدث تقنيات الواجهة الأمامية، محسّنة للسرعة وإمكانية الوصول والتحويل.",
          },
          {
            name: "تحسين محركات البحث (SEO)",
            description:
              "تدقيق SEO التقني والداخلي، استراتيجية الكلمات المفتاحية، تطبيق البيانات المنظمة وتحسين Core Web Vitals للحصول على تصنيف أعلى في Google.",
          },
          {
            name: "أتمتة الأعمال بالذكاء الاصطناعي",
            description:
              "أتمتة سير العمل الكاملة باستخدام أدوات الذكاء الاصطناعي وواجهات API لتقليل المهام اليدوية وزيادة الكفاءة وتوسيع نطاق العمل.",
          },
          {
            name: "تصميم إعلانات منصات التواصل الاجتماعي",
            description:
              "تصميم إعلانات إبداعية وحملات تسويقية عالية التحويل لفيسبوك وإنستغرام وغيرها من المنصات.",
          },
          {
            name: "تطوير مواقع متجاوبة مع الأجهزة المحمولة",
            description:
              "تطوير يُقدّم أولوية للجوال لضمان أداء مثالي على جميع أحجام الشاشات والأجهزة.",
          },
          {
            name: "تطوير مواقع باستخدام Next.js",
            description:
              "تطبيقات ويب بالعرض من جانب الخادم والتوليد الثابت باستخدام Next.js لأداء استثنائي وتحسين محركات البحث.",
          },
        ]
      : [
          {
            name: "Création de Sites Web Professionnels",
            description:
              "Sites web sur-mesure et responsives développés avec Next.js, optimisés pour la vitesse, l'accessibilité et la conversion.",
          },
          {
            name: "Optimisation SEO",
            description:
              "Audit SEO technique et on-page, stratégie de mots-clés, implémentation de données structurées et amélioration des Core Web Vitals.",
          },
          {
            name: "Automatisation d'Entreprise par IA",
            description:
              "Automatisation complète des flux de travail grâce à des outils IA et des APIs pour réduire les tâches manuelles et développer les activités.",
          },
          {
            name: "Design Publicitaire pour Réseaux Sociaux",
            description:
              "Créations publicitaires et campagnes à fort taux de conversion pour Facebook, Instagram et autres plateformes.",
          },
          {
            name: "Développement Web Responsive",
            description:
              "Développement mobile-first garantissant des performances optimales sur tous les écrans.",
          },
          {
            name: "Développement Web Sur-Mesure Next.js",
            description:
              "Applications web en rendu côté serveur et génération statique avec Next.js pour des performances et un SEO exceptionnels.",
          },
        ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Devsign",
        description: orgDescription,
        inLanguage: locale,
        publisher: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Mohammed Devsign",
        url: `${baseUrl}/${locale}`,
        jobTitle: jobTitle,
        worksFor: { "@id": `${baseUrl}/#organization` },
        knowsAbout: [
          "Web Development",
          "Next.js Development",
          "React.js",
          "SEO Optimisation",
          "Technical SEO",
          "AI Automation",
          "Business Process Automation",
          "Digital Marketing",
          "Social Media Advertising Design",
          "Full-Stack Development",
          "JavaScript",
          "TypeScript",
          "Node.js",
        ],
        knowsLanguage: [
          { "@type": "Language", name: "English" },
          { "@type": "Language", name: "French" },
          { "@type": "Language", name: "Arabic" },
        ],
        sameAs: [
          // "https://www.linkedin.com/in/YOUR_HANDLE",
          // "https://github.com/YOUR_HANDLE",
        ],
      },

      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${baseUrl}/#organization`,
        name: "Devsignpro",
        url: `${baseUrl}/${locale}`,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        email: "devsignprofessional@gmail.com",
        description: orgDescription,
        foundingDate: "2021",
        priceRange: "$$",
        founder: { "@id": `${baseUrl}/#person` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Casablanca",
          addressRegion: "Casablanca-Settat",
          addressCountry: "MA",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "devsignprofessional@gmail.com",
          contactType: "customer service",
          availableLanguage: ["English", "French", "Arabic"],
        },
        knowsAbout: [
          "Web Development",
          "Next.js",
          "React",
          "javascript",
          "typescript",
          "SEO",
          "Technical SEO",
          "AI Automation",
          "Business Automation",
          "Social Media Advertising",
          "Digital Marketing",
          "Full-Stack Development",
        ],
        areaServed: [
          {
            "@type": "Country",
            name: "Morocco",
          },
          {
            "@type": "Place",
            name: "Worldwide (Remote)",
          },
        ],
        sameAs: [
          // Uncomment and fill in your actual profiles:
          // "https://www.facebook.com/YOUR_REAL_PAGE",
          // "https://www.instagram.com/YOUR_REAL_PROFILE",
          // "https://www.linkedin.com/company/YOUR_COMPANY",
          // "https://github.com/YOUR_HANDLE",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: catalogName,
          itemListElement: services.map((svc, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              "@id": `${baseUrl}/#service-${index + 1}`,
              name: svc.name,
              serviceType: svc.name,
              description: svc.description,
              provider: { "@id": `${baseUrl}/#organization` },
              areaServed: {
                "@type": "Country",
                name: "Morocco",
              },
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${locale}#webpage`,
        url: `${baseUrl}/${locale}`,
        name: webPageName,
        description: webPageDescription,
        inLanguage: locale,
        image: {
          "@type": "ImageObject",
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
        mainEntity: { "@id": `${baseUrl}/#organization` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: isEnglish ? "Home" : isArabic ? "الرئيسية" : "Accueil",
              item: `${baseUrl}/${locale}`,
            },
          ],
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero-headline", ".hero-text"],
        },
      },
    ],
  };

  return (
    <main className="bg-background text-foreground transition-colors duration-300 min-h-screen hero-section-light">
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        className="relative overflow-hidden hero-section-light border-b border-border"
        aria-labelledby="hero-heading"
      >
        {/* ── grid texture ── */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* ── ambient glows ── */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 right-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 lg:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="flex flex-col gap-5 sm:gap-6">
              <div
                className="inline-flex items-center gap-2 bg-primary/10 text-primary
  border border-primary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium w-fit"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                  aria-hidden="true"
                />
                {t.hero.availability ?? "Available for new projects"}
              </div>
              <h1
                id="hero-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.2] sm:leading-[1.1]"
              >
                {isArabic ? (
                  <>
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-r
                       from-foreground to-muted-foreground
                       dark:from-foreground dark:to-muted"
                    >
                      {t.hero.title_line1}{" "}
                    </span>
                    {t.hero.title_highlight}
                  </>
                ) : (
                  <>
                    {t.hero.title_line1}{" "}
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-r
                       from-foreground to-muted-foreground
                       dark:from-foreground dark:to-muted"
                    >
                      {t.hero.title_highlight}
                    </span>
                  </>
                )}
              </h1>

              {/* description */}
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t.hero.description}
              </p>

              {/* focus line */}
              <p
                className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3 sm:pl-4
              rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3 sm:rtl:pr-4"
              >
                {t.hero.focus}
              </p>

              {/* CTA buttons */}
              <div
                className={`flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto`}
              >
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2
               px-5 sm:px-7 py-2.5 sm:py-3.5 bg-primary text-primary-foreground
               font-semibold rounded-xl text-sm sm:text-base
               hover:opacity-90 active:scale-95 transition-all
               shadow-lg shadow-primary/25"
                >
                  {t.hero.cta_primary}
                </Link>

                <Link
                  href={`/${locale}/portfolio`}
                  className="inline-flex items-center justify-center gap-2
               px-5 sm:px-7 py-2.5 sm:py-3.5 bg-card border border-border
               text-foreground font-semibold rounded-xl text-sm sm:text-base
               hover:border-primary/30 hover:bg-muted/50 active:scale-95
               transition-all"
                >
                  {t.hero.cta_secondary}
                  {isArabic ? (
                    <ArrowLeft size={16} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={16} aria-hidden="true" />
                  )}
                </Link>
              </div>
            </div>

            {/* ── PROFILE SIDE - ENLARGED IMAGE ── */}
            <div
              className={`flex justify-center ${isArabic ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]">
                <div
                  className="absolute -inset-4 rounded-3xl border border-primary/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
                  {/* image — better portrait proportions */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg"
                      alt={t.hero.profile_name}
                      width={420}
                      height={525}
                      className="w-full h-full object-cover object-top
                       transition-transform duration-700 hover:scale-105"
                      priority
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 420px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  {/* name / role strip */}
                  <div className="px-4 py-3 border-t border-border">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {t.hero.profile_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {t.hero.profile_role}
                    </p>
                    <Link
                      href={`/${locale}#about`}
                      className="mt-3 w-full inline-flex items-center justify-center gap-1.5
                       px-3 py-1.5 bg-primary text-primary-foreground font-semibold
                       rounded-lg text-xs hover:opacity-90 active:scale-95 transition-all"
                    >
                      {t.hero.cta_more_about}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <Statistics translations={t.stats} />
      </ScrollReveal>

      <ScrollReveal delay={0.04}>
        <SubTitle sectionLabel={t.services_section.sectionLabel} />
        <ServicesGrid
          sectionData={t.services_section}
          servicesData={dict.pages.services_page.services}
          locale={locale}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle sectionLabel={t.about_section.sectionLabel} />
        <AboutMeSection translations={t.about_section} locale={locale} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle sectionLabel={t.why_we_are_section.sectionLabel} />
        <WhyWeAreSection translations={t.why_we_are_section} locale={locale} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle sectionLabel={t.projects_section.sectionLabel} />
        <ProjectsShowcase
          translations={t.projects_section.subtitle}
          projectsData={dict.pages.portfolio_page.projects}
          locale={locale}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ContactSection translations={t.contact_section} />
      </ScrollReveal>
    </main>
  );
}
