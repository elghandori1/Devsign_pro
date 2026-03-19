//app/[locale]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, InstagramIcon, ArrowLeft } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import getTrans from "../lib/translation";
import { Locale, i18n } from "@/i18n-config";
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

const getBaseUrl = () =>
  (process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com").trim();

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = i18n.locales.includes(rawLocale as Locale)
    ? rawLocale
    : i18n.defaultLocale;
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/${locale}`;
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

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/fr`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Devsign",
      images: [
        {
          url: `${baseUrl}/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: "Web Developer in Morocco - Devsign",
        },
      ],
      locale: isEnglish ? "en_US" : isArabic ? "ar_MA" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-home.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getTrans(locale);
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

  // ── JSON-LD graph
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
    <div className="bg-background text-foreground transition-colors duration-300 min-h-screen hero-section-light">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="relative px-4 sm:px-6 py-6 md:py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-14 md:mt-8">
          {/* TEXT CONTENT */}
          <div className="text-left order-2 lg:order-1">
            <h1
              className="hero-headline text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-8 sm:my-8 leading-[1.30]"
              style={{ textAlign: isArabic ? "right" : "left" }}
            >
              {isArabic ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-foreground dark:to-muted hero-headline-highlight">
                    {t.hero.title_line1}{" "}
                  </span>
                  {t.hero.title_highlight}
                </>
              ) : (
                <>
                  {t.hero.title_line1}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-foreground dark:to-muted hero-headline-highlight">
                    {t.hero.title_highlight}
                  </span>
                </>
              )}
            </h1>

            <p
              className="hero-text text-sm sm:text-base md:text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed font-light"
              style={{ textAlign: isArabic ? "right" : "left" }}
            >
              {t.hero.description}
            </p>

            <p
              className="hero-text text-xs sm:text-sm md:text-base text-muted-foreground italic mb-6"
              style={{ textAlign: isArabic ? "right" : "left" }}
            >
              {t.hero.focus}
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-all shadow-lg shadow-primary/30 transform hover:scale-[1.02] active:scale-95 text-center"
              >
                {t.hero.cta_primary}
              </Link>

              <Link
                href={`/${locale}/services`}
                className="px-8 py-3.5 bg-card hover:bg-card/80 border border-input text-foreground font-semibold rounded-md transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                {t.hero.cta_secondary}
                {!isArabic && <ArrowRight size={16} />}
                {isArabic && <ArrowLeft size={16} />}
              </Link>
            </div>
          </div>

          {/* PROFILE */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            <div className="w-full max-w-[260px] sm:max-w-sm flex flex-col">
              <div className="aspect-square overflow-hidden border-2 border-primary/20 rounded-lg">
                <Image
                  src="/images/profile3.png"
                  alt={t.hero.profile_name}
                  width={480}
                  height={480}
                  className="w-full h-full object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>

              <div className="flex flex-col items-center px-4 py-4">
                <p className="hero-text text-base sm:text-lg font-medium">
                  {t.hero.profile_name}
                </p>

                <p className="hero-text text-center text-xs sm:text-sm text-muted-foreground mt-1 mb-3">
                  {t.hero.profile_role}
                </p>

                <Link
                  href="#about"
                  className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md text-sm transition-all"
                >
                  {t.hero.cta_more_about}
                </Link>

                {/* SOCIAL */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <Link
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-card/95 rounded-full border border-pink-500/50 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={17} />
                  </Link>

                  <Link
                    href="https://wa.me/212XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-card/95 rounded-full border border-green-500/60 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <BsWhatsapp size={17} />
                  </Link>

                  <Link
                    href="mailto:contact@devsign.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-card/95 rounded-full border border-blue-500/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    aria-label="Email"
                  >
                    <MdEmail size={17} />
                  </Link>
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
        <SubTitle translations={t.services_section.services} />
        <ServicesGrid t={t.services_section} locale={locale} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle translations={t.contact_section.about_me} />
        <AboutMeSection
          translations={t.contact_section.about_me}
          locale={locale}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle translations={t.why_we_are_section.why_we_are} />
        <WhyWeAreSection
          translations={t.why_we_are_section.why_we_are}
          locale={locale}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle translations={t.projects_section} />
        <ProjectsShowcase translations={t.projects_section} locale={locale} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ContactSection translations={t.contact} locale={locale} />
      </ScrollReveal>
    </div>
  );
}
