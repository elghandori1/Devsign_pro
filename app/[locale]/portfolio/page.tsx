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

  const title =
    data?.heading ||
    (locale === "en"
      ? "Portfolio Projects | Web Development, SEO & Automation"
      : locale === "ar"
        ? "معرض المشاريع | تطوير ويب، سيو وأتمتة"
        : "Portfolio Projets | Développement Web, SEO et Automatisation");

  const description =
    data?.description ||
    (locale === "en"
      ? "Browse professional, personal, and academic projects in web development, SEO, and automation. Fast, modern solutions built to deliver results."
      : locale === "ar"
        ? "تصفح مشاريع احترافية وشخصية وأكاديمية في تطوير الويب والسيو والأتمتة. حلول سريعة وحديثة تحقق نتائج عملية."
        : "Découvrez des projets professionnels, personnels et académiques en développement web, SEO et automatisation.");

  const keywords =
    locale === "en"
      ? [
          "portfolio projects",
          "web development portfolio",
          "SEO case studies",
          "business automation projects",
          "client and personal projects",
          "academic web projects",
        ]
      : locale === "ar"
        ? [
            "معرض المشاريع",
            "مشاريع تطوير ويب",
            "دراسات حالة سيو",
            "مشاريع أتمتة الأعمال",
            "مشاريع شخصية واحترافية",
            "مشاريع أكاديمية",
          ]
        : [
            "portfolio projets",
            "projets développement web",
            "études de cas SEO",
            "projets automatisation entreprise",
            "projets clients et personnels",
            "projets académiques",
          ];

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