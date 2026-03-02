// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Almarai } from "next/font/google";
import "../globals.css";
import { Locale, i18n } from "@/i18n-config";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider";

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

const getBaseUrl = () =>
  (process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com").trim();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const baseUrl = getBaseUrl();
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

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
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
      url: `${baseUrl}/${locale}`,
      siteName: "Devsign",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Devsign - Web Developer in Morocco",
        },
      ],
      locale: isEnglish ? "en_US" : isArabic ? "ar_MA" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`],
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
    icons: {
      icon: "/favicon.ico",
    },
  };
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

  const isEnglish = locale === "en";
  const isArabic = locale === "ar";
  const baseUrl = getBaseUrl();
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

  const fontClassName = isArabic ? almarai.className : roboto.className;
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${fontClassName} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar lang={locale} />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}