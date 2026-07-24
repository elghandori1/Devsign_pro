// app/[locale]/layout.tsx
import type { Metadata, Viewport } from "next";
import { Roboto, Almarai } from "next/font/google";
import Script from "next/script";
// @ts-ignore
import "@/app/globals.css";

import { Locale, i18n } from "@/i18n-config";
import Navbar from "@/app/components/Navbar";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Footer from "@/app/components/Footer";
import { getDictionary } from "@/app/lib/dictionary";
import { I18nProvider } from "@/app/providers/i18n-provider";
import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import { PersonSchema, ProfessionalServiceSchema, WebSiteSchema } from "@/app/components/schemas";

import infos from "@/app/dictionaries/global.json";

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
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
    },
    manifest: "/site.webmanifest",
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
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
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
  const layoutSeo = dict.SEO_content.layout_page;

  const baseUrl = getBaseUrl();
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fontClassName = locale === "ar" ? almarai.className : roboto.className;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const metadata = layoutSeo.generateMetadata;
  const openGraph = layoutSeo.generateOpenGraph;
  const services = openGraph.services;
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
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
          
          <PersonSchema
            baseUrl={baseUrl}
            locale={locale}
            name="Mohammed elghandori"
            jobTitle={openGraph.jobTitle}
            description={openGraph.personDescription}
            image={`${baseUrl}/profile-photo.jpg`}
            social={{
              linkedin: infos.social.linkedin,
              github: infos.social.github,
              facebook: infos.social.facebook}}
          />

          <ProfessionalServiceSchema
            baseUrl={baseUrl}
            locale={locale}
            name="Devsignpro"
            description={openGraph.orgDescription}
            email={infos.email}
            phone={infos.phoneNumber}
            logoUrl={`${baseUrl}/logo/devsignpro-logo.jpg`}
            founderId={`${baseUrl}/#person`}
            services={services}
            social={{
              linkedin: infos.social.linkedin,
              instagram: infos.social.instagram,
              facebook: infos.social.facebook,
              github: infos.social.github,
            }}
          />

          <WebSiteSchema
            baseUrl={baseUrl}
            locale={locale}
            name="Devsignpro"
            description={metadata.description}
          />

          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer footer={footer} locale={locale} />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
