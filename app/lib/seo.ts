import type { Metadata } from "next";
import type { Locale } from "@/i18n-config";

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com").trim();
}

export function buildPageMetadata({
  locale,
  baseUrl,
  title,
  description,
  path,
  keywords,
}: {
  locale: Locale;
  baseUrl: string;
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const canonicalUrl = `${baseUrl}/${locale}${path}`;
  const isEnglish = locale === "en";
  const isArabic = locale === "ar";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en${path}`,
        fr: `${baseUrl}/fr${path}`,
        ar: `${baseUrl}/ar${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Devsign",
      locale: isEnglish ? "en_US" : isArabic ? "ar_MA" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
