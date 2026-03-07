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
    ? "Web Developer in Morocco | Website Design, SEO & Business Automation"
    : isArabic
      ? "مطور ويب في المغرب | تصميم مواقع، سيو وأتمتة الأعمال"
      : "Développeur Web au Maroc | Création Site Web & SEO";

  const description = isEnglish
    ? "Professional web developer in Morocco offering modern website design, SEO optimization, responsive web development, business automation systems, and high-converting social media ads."
    : isArabic
      ? "مطور ويب محترف في المغرب يقدم تصميم مواقع حديثة، تحسين السيو، تطوير ويب متجاوب، أنظمة أتمتة الأعمال وإعلانات سوشيال ميديا ذات تحويل عالٍ."
      : "Développeur web au Maroc spécialisé en création de sites web modernes, optimisation SEO, développement responsive, systèmes d'automatisation et design publicitaire.";

  const keywords = isEnglish
    ? [
      "Web Developer Morocco",
      "Website Design Morocco",
      "SEO Expert Morocco",
      "Responsive Web Design",
      "Business Automation Morocco",
      "Startup Website Development",
      "Social Media Ads Design",
      "Facebook Instagram TikTok Ads",
      "Professional Portfolio Morocco",
      "Small Business Website Morocco",
    ]
    : isArabic
      ? [
        "مطور ويب المغرب",
        "تصميم مواقع المغرب",
        "خبير سيو المغرب",
        "موقع ويب متجاوب",
        "أتمتة الأعمال المغرب",
        "وكالة ويب المغرب",
      ]
      : [
        "Développeur Web Maroc",
        "Création Site Web Maroc",
        "Expert SEO Maroc",
        "Site Web Responsive",
        "Automatisation Entreprise Maroc",
        "Agence Web Maroc",
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

  const jsonLdDescription = isEnglish
    ? "Web developer in Morocco specializing in website design, SEO optimization, business automation systems and social media ads."
    : isArabic
      ? "مطور ويب في المغرب متخصص في تصميم المواقع، تحسين السيو، أنظمة أتمتة الأعمال وإعلانات السوشيال ميديا."
      : "Développeur web au Maroc spécialisé en création de sites web, optimisation SEO, systèmes d'automatisation d'entreprise et design publicitaire pour les réseaux sociaux.";
  const jsonLdServices = isEnglish
    ? ["Website Design", "SEO Optimization", "Business Automation Systems", "Social Media Advertising Design", "Responsive Web Development"]
    : isArabic
      ? ["تصميم المواقع", "تحسين السيو", "أنظمة أتمتة الأعمال", "تصميم إعلانات السوشيال ميديا", "تطوير ويب متجاوب"]
      : ["Création de Sites Web", "Optimisation SEO", "Systèmes d'Automatisation d'Entreprise", "Design Publicitaire pour Réseaux Sociaux", "Développement Web Responsive"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${baseUrl}/#devsign`,
    name: "Devsign",
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/logo.png`,
    description: jsonLdDescription,
    serviceType: jsonLdServices,
    sameAs: [
      "https://www.facebook.com/yourpage",
      "https://www.instagram.com/yourprofile",
      "https://www.linkedin.com/in/yourprofile",
    ],
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="bg-background text-foreground transition-colors duration-300 min-h-screen hero-section-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <section className="relative px-6 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left order-2 lg:order-1" dir={isArabic ? "rtl" : "ltr"}>
            <h1 className="hero-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.15]"
              style={{ textAlign: isArabic ? 'right' : 'left' }}>
              {isArabic ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-foreground dark:to-muted hero-headline-highlight">
                    {t.hero.title_line1} {" "}

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

            <p className="hero-text text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed font-light"
              style={{ textAlign: isArabic ? 'right' : 'left' }}>
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 px-2">
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-all shadow-lg shadow-primary/30 transform hover:scale-[1.02] active:scale-95 text-center"
              >
                {t.hero.cta_primary}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="px-8 py-3.5 bg-card hover:bg-card/80 border border-input text-foreground font-semibold rounded-md transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-95"
              >
                {t.hero.cta_secondary} {!isArabic && <ArrowRight size={16} />}
                {isArabic && <ArrowLeft size={16} />}
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-sm flex flex-col">
              <div className="aspect-square overflow-hidden border-2 border-primary/20 rounded-lg">
                <Image
                //  src="/images/profile3.png"
                  src="/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg"
                  alt={t.hero.profile_name}
                  width={480}
                  height={480}
                  className="w-full h-full object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              <div className="flex flex-col items-center px-4 py-5">
                <p className="hero-text text-lg font-medium">
                  {t.hero.profile_name}
                </p>
                <p className="hero-text text-center text-sm text-muted-foreground mt-0.5 mb-4">
                  {t.hero.profile_role}
                </p>
                <Link
                  href="#about"
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md text-sm transition-all inline-block"
                >
                  {t.hero.cta_more_about}
                </Link>
                {/* Social Icons */}
                <div className="flex items-center justify-center gap-4 mt-5">
                  <Link
                    href="https://www.facebook.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 hidden flex items-center justify-center rounded-full border border-border hover:bg-[#1877f2] hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Facebook"
                  >
                    <FaInstagram size={18} />
                  </Link>
                  <Link
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={18} />
                  </Link>
                  <Link
                    href="https://wa.me/212XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <BsWhatsapp size={18} />
                  </Link>
                  <Link
                    href="mailto:contact@devsign.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    aria-label="Email"
                  >
                    <MdEmail size={18} />
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

      <ScrollReveal delay={0.05}>
        <SubTitle translations={t.services_section.services} />
        <ServicesGrid t={t.services_section} locale={locale} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle translations={t.contact_section.about_me} />
        <AboutMeSection translations={t.contact_section.about_me} locale={locale} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SubTitle translations={t.why_we_are_section.why_we_are} />
        <WhyWeAreSection translations={t.why_we_are_section.why_we_are} locale={locale} />
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