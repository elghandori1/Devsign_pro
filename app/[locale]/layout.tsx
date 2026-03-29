// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Roboto, Almarai } from "next/font/google";
import "../globals.css";
import { Locale, i18n } from "@/i18n-config";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Footer from "@/app/components/Footer";
import { getDictionary } from "@/app/lib/dictionary";
import { I18nProvider } from "@/app/providers/i18n-provider";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  preload: true,
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const isEnglish = locale === "en";
  const isArabic = locale === "ar";

  const title = isEnglish
    ? "Web Developer in Morocco | Website Design & SEO Solutions"
    : isArabic
      ? "مطور ويب في المغرب | تصميم مواقع وحلول سيو"
      : "Développeur Web au Maroc | Création de Sites & SEO";

  const description = isEnglish
    ? "Professional web developer in Morocco specializing in modern website design, SEO optimization, ai business automation systems, and high-converting social media ads."
    : isArabic
      ? "مطور ويب محترف في المغرب متخصص في تصميم المواقع الحديثة، تحسين محركات البحث، أنظمة أتمتة الأعمال بالذكاء الاصطناعي وإعلانات السوشيال ميديا ذات التحويل العالي."
      : "Développeur web professionnel au Maroc spécialisé en création de sites modernes, optimisation SEO, systèmes d'automatisation par ai et design publicitaire réseaux sociaux.";

  const keywords = isEnglish
    ? [
      "Web Developer Morocco",
      "Website Design Morocco",
      "SEO Optimization Morocco",
      "Business Automation Systems",
      "Responsive Web Design",
      "Social Media Ads Design",
      "Facebook Instagram TikTok Ads",
      "Portfolio Web Developer",
    ]
    : isArabic
      ? [
        "مطور ويب المغرب",
        "تصميم مواقع المغرب",
        "تحسين محركات البحث المغرب",
        "أتمتة الأعمال",
        "موقع ويب متجاوب",
        "تصميم إعلانات السوشيال ميديا",
      ]
      : [
        "Développeur web Maroc",
        "Création site web Maroc",
        "Optimisation SEO Maroc",
        "Automatisation entreprise",
        "Site web responsive",
        "Design publicité réseaux sociaux",
      ];

  return buildPageMetadata({
    locale,
    title,
    description,
    keywords,
    route: "",
  });
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale as Locale);
  const footer = dict?.homepage?.footer ?? null;

  const isEnglish = locale === "en";
  const isArabic = locale === "ar";
  const baseUrl = getBaseUrl();
  const fontClassName = isArabic ? almarai.className : roboto.className;
  const dir = isArabic ? "rtl" : "ltr";

  const jsonLdDescription = isEnglish
    ? "Web developer in Morocco offering website design, SEO optimization, business automation systems, and social media advertising design."
    : isArabic
      ? "مطور ويب في المغرب يقدم تصميم المواقع، تحسين محركات البحث، أنظمة أتمتة الأعمال وتصميم إعلانات السوشيال ميديا."
      : "Développeur web au Maroc offrant création de sites, optimisation SEO, systèmes d'automatisation d'entreprise et design publicitaire pour les réseaux sociaux.";
  const jsonLdServices = isEnglish
    ? ["Creation of Modern Websites", "SEO Optimization", "Business Automation", "Social Media Ads Design", "Automated AI Business Systems"]
    : isArabic
      ? ["إنشاء مواقع حديثة", "تحسين محركات البحث", "أتمتة الأعمال", "تصميم إعلانات السوشيال ميديا", "أنظمة أعمال بالذكاء الاصطناعي"]
      : ["Création de Sites Web", "Optimisation SEO", "Automatisation d'Entreprise", "Design Publicité Réseaux Sociaux", "Systèmes d'Automatisation AI"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Devsign",
    url: baseUrl,
    description: jsonLdDescription,
    sameAs: [
      "https://www.linkedin.com/in/yourprofile",
      "https://www.instagram.com/yourprofile"
    ],
    serviceType: jsonLdServices,
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${fontClassName} antialiased`}>
        <I18nProvider dictionary={dict}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar lang={locale} />
          <main>{children}</main>
          <Footer footer={footer} locale={locale} />
        </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}