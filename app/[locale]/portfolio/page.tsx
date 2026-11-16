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

  const dict = await getDictionary(locale);
  const data = dict.pages.portfolio_page;
  const seo = data.seo as {
    title: string;
    description: string;
    keywords: string[];
  };

  return buildPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
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
  const isRtl = false;

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
            ? "Selected websites, e-commerce stores, custom applications and engineering projects with clear context, implementation decisions and verified outcomes where available."
            : "Sélection de sites web, boutiques en ligne, applications sur mesure et projets techniques, avec leur contexte, les choix de réalisation et les résultats vérifiables disponibles."
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
