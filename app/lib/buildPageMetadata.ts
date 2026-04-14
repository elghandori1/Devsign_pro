// lib/buildPageMetadata.ts
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n-config";

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000").trim();
}

interface SEOProps {
  locale: Locale;
  title: string;
  description: string;
  keywords: string[];
  route?: string;
  ogImagePath?: string;
}

export function buildPageMetadata({
  locale,
  title,
  description,
  keywords,
  route = "",
  ogImagePath,
}: SEOProps): Metadata {
  const baseUrl = getBaseUrl();
  const ogLocale = locale === "en" ? "en_US":locale === "ar" ? "ar_MA" :"fr_MA";
  const safeRoute = route ? (route.startsWith("/") ? route : `/${route}`) : "";
  const currentUrl = `${baseUrl}/${locale}${safeRoute}`;
  const defaultUrl = `${baseUrl}/${i18n.defaultLocale}${safeRoute}`;
  const ogImage =
    ogImagePath && ogImagePath.length > 0
      ? ogImagePath.startsWith("http")
        ? ogImagePath
        : `${baseUrl}${ogImagePath.startsWith("/") ? "" : "/"}${ogImagePath}`
      : `${baseUrl}/cover/Design-cover.png`;
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
          url: ogImage,
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
      images: [ogImage],
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
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
  };
}