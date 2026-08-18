// app/[locale]/layout.tsx
import type { Metadata, Viewport } from "next";
import { Roboto, Almarai } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";

import { Locale, i18n, localeToBcp47 } from "@/i18n-config";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Footer from "@/app/components/Footer";
import { getDictionary } from "@/app/lib/dictionary";
import { I18nProvider } from "@/app/providers/i18n-provider";
import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import { WebSiteSchema } from "@/app/components/schemas";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
  variable: "--font-almarai",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  const layoutSeo = dict.SEO_content.layout_page;

  return {
    metadataBase: new URL(getBaseUrl()),
    title: layoutSeo.generateMetadata.title,
    description: layoutSeo.generateMetadata.description,
    keywords: layoutSeo.generateMetadata.keywords,
    applicationName: "Devsignpro",
    creator: "Mohammed elghandori",
    publisher: "Devsignpro",
    authors: [{ name: "Mohammed elghandori", url: getBaseUrl() }],
    category: "technology",
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      ],
      shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/favicon-32x32.png",
          color: "#0a0a0a",
        },
      ],
    },
    
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": "#0a0a0a",
      "msapplication-TileImage": "/mstile-150x150.png",
      "msapplication-config": "/browserconfig.xml",
    },
    alternates: {
      types: {
        "text/plain": [
          { url: "/llms.txt", title: "LLM instructions" },
          { url: "/llms-full.txt", title: "Full LLM context" },
        ],
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? {
            other: {
              "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
            },
          }
        : {}),
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
  const dict = await getDictionary(locale as Locale);
  const footer = dict?.footer ?? null;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fontClassName = locale === "ar" ? almarai.className : roboto.className;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const baseUrl = getBaseUrl();
  const layoutSeo = dict.SEO_content.layout_page.generateMetadata;
  return (
    <html lang={localeToBcp47(locale)} dir={dir} suppressHydrationWarning>
      <body className={`${fontClassName} antialiased`}>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
        <I18nProvider dictionary={dict}>
          <ThemeProvider attribute="class" defaultTheme="white" enableSystem>
            <WebSiteSchema
              baseUrl={baseUrl}
              locale={locale}
              description={layoutSeo.description}
            />

            <Navbar locale={locale} />
            {children}
            <Footer footer={footer} locale={locale} />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
