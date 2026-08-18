import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata } from "@/app/lib/buildPageMetadata";
import {
  flattenPortfolioProjects,
  hrefToPortfolioSlug,
  parseTechList,
} from "@/app/lib/portfolio";
import PortfolioSchema from "../../components/schemas/PortfolioSchema";
import PortfolioContent from "../../components/PortfolioContent";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string }>;
};

type ProjectType = "professional" | "personal" | "academic";

type DictionaryProject = {
  title?: string;
  description?: string;
  detail?: {
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
  href?: string;
  link?: string;
  image?: string;
  tech?: string | string[];
  type?: ProjectType;
  status?: string;
  category?: string;
  linkLabel?: string;
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const title =
    locale === "en"
      ? "Web Development Portfolio & Case Studies | Devsignpro"
      : locale === "ar"
        ? "معرض أعمال تطوير الويب ودراسات الحالة | Devsignpro"
        : "Portfolio Développement Web & Études de Cas | Devsignpro";

  const description =
    locale === "en"
      ? "Explore my portfolio of high-performance Next.js websites, custom dashboards, and Technical SEO projects. See real results and business impact."
      : locale === "ar"
        ? "استكشف معرض أعمالي لمواقع Next.js عالية الأداء، لوحات التحكم المخصصة، ومشاريع SEO التقني. شاهد نتائج حقيقية وتأثير ملموس على الأعمال."
        : "Portfolio de sites Next.js, tableaux de bord et projets SEO technique. Résultats mesurables et impact business concret au Maroc.";

  const keywords =
    locale === "en"
      ? [
          "portfolio",
          "web development projects morocco",
          "Next.js portfolio",
          "SEO case studies",
          "AI automation projects",
          "dashboard development",
          "full-stack developer portfolio",
          "client projects",
          "academic projects",
          "web applications",
        ]
      : locale === "ar"
        ? [
            "معرض أعمال",
            "مشاريع تطوير ويب المغرب",
            "مشاريع Next.js",
            "دراسات SEO",
            "مشاريع أتمتة IA",
            "تطوير لوحات التحكم",
            "مطور متكامل",
            "أعمال العملاء",
            "مشاريع أكاديمية",
            "تطبيقات ويب",
          ]
        : [
            "portfolio",
            "projets développement web maroc",
            "projets Next.js",
            "études de cas SEO",
            "projets automatisation IA",
            "développement dashboards",
            "développeur full-stack",
            "projets clients",
            "projets académiques",
            "applications web",
          ];

  return buildPageMetadata({
    locale,
    title,
    description,
    keywords,
    route: "/portfolio",
    ogImagePath: "/cover/Designpro-cover.jpg",
    type: "website",
  });
}

export default async function PortfolioPage({ params, searchParams }: Props) {
  const { locale: rawLocale } = await params;
  const { filter: rawFilter } = await searchParams;

  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const validFilters = ["all", "professional", "personal", "academic"] as const;
  type FilterKey = (typeof validFilters)[number];

  const activeFilter = validFilters.includes(rawFilter as FilterKey)
    ? (rawFilter as FilterKey)
    : "all";

  const dict = await getDictionary(locale);
  const data = dict.pages?.portfolio_page;
  const isRtl = locale === "ar";

  if (!data) return null;

  const allProjects = flattenPortfolioProjects<DictionaryProject>(
    data.projects,
  ).map((p) => ({
    slug: hrefToPortfolioSlug(p.href ?? ""),
    title: p.detail?.seo?.title ?? p.title ?? "",
    description: p.detail?.seo?.description ?? p.description ?? "",
    href: p.href || p.link || "#",
    image: p.image ?? "",
    tech: parseTechList(p.tech),
    type: (p.type ?? "personal") as ProjectType,
    status: p.status,
    category: p.category,
    linkLabel: p.linkLabel,
  }));

  const filteredProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.type === activeFilter);

  return (
    <>
      <PortfolioSchema
        locale={locale}
        title={data.heading || "Portfolio"}
        description={
          locale === "en"
            ? "Portfolio of high-performance Next.js websites, e-commerce, business dashboards, and solutions built with Technical SEO and scalable architecture."
            : locale === "ar"
              ? "معرض أعمال يضم مواقع Next.js عالية الأداء، ومتاجر إلكترونية، ولوحات تحكم للأعمال، وحلولاً رقمية مبنية على SEO تقني وبنية قابلة للتوسع."
              : "Portfolio de sites Next.js performants, boutiques e-commerce, tableaux de bord et solutions digitales, développés avec un SEO technique et une architecture évolutive."
        }
        projects={allProjects}
      />
      <PortfolioContent
        data={data}
        locale={locale}
        isRtl={isRtl}
        allProjects={allProjects}
        filteredProjects={filteredProjects}
        activeFilter={activeFilter}
      />
    </>
  );
}
