// lib/buildPageMetadata.ts
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n-config";

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com").trim();
}

interface SEOProps {
  locale: Locale;
  title: string;
  description: string;
  keywords: string[];
  route?: string;
}

export function buildPageMetadata({
  locale,
  title,
  description,
  keywords,
  route = "",
}: SEOProps): Metadata {
  const baseUrl = getBaseUrl();
  const ogLocale = locale === "en" ? "en_US":locale === "ar" ? "ar_MA" :"fr_MA";
  const safeRoute = route ? (route.startsWith("/") ? route : `/${route}`) : "";
  const currentUrl = `${baseUrl}/${locale}${safeRoute}`;
  const defaultUrl = `${baseUrl}/${i18n.defaultLocale}${safeRoute}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en${safeRoute}`,
        fr: `${baseUrl}/fr${safeRoute}`,
        ar: `${baseUrl}/ar${safeRoute}`,
        "x-default": defaultUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "Devsign",
      images: [
        {
          url: `/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og-image.jpg`],
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