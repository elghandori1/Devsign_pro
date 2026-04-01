import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata } from "@/app/lib/buildPageMetadata";
import PortfolioClient from "../../components/PortfolioClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const data = dict.pages?.portfolio_page;

  const title = data?.heading || (locale === "en" ? "My Work | Portfolio — Web, Systems & Design — Devsign" : locale === "ar" ? "أعمالي | معرض أعمال — ويب، أنظمة وتصميم — ديفساين" : "Mes Projets | Portfolio — Web, Systèmes & Design — Devsign");

  const description = data?.description || (locale === "en" ? "Selected projects: e-commerce, business automation, and ad design. Websites and systems that drive results for startups and businesses." : locale === "ar" ? "مشاريع مختارة: تجارة إلكترونية، أتمتة أعمال، وتصميم إعلانات. مواقع وأنظمة تحقق النتائج." : "Projets sélectionnés : e-commerce, automatisation et design. Sites et systèmes qui génèrent des résultats.");

  const keywords = locale === "en" ? ["portfolio", "projects", "web development", "e-commerce", "automation", "design"] : locale === "ar" ? ["أعمالي", "مشاريع", "تطوير ويب", "تصميم"] : ["portfolio", "projets", "développement web", "design"];

  return buildPageMetadata({
    locale,
    title,
    description,
    route: "/portfolio",
    keywords,
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const data = dict.pages?.portfolio_page;
  const isRtl = locale === "ar";

  if (!data || !data.projects) return null;

  return (
    <PortfolioClient
      data={data}
      locale={locale}
      isRtl={isRtl}
    />
  );
}