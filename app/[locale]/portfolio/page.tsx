import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata } from "@/app/lib/buildPageMetadata";
import PortfolioSchema from "../../components/schemas/PortfolioSchema";
import PortfolioContent from "../../components/PortfolioContent";

type ProjectType = "professional" | "personal" | "academic";

interface PortfolioProjectEntry {
  title?: string;
  description?: string;
  href?: string;
  link?: string;
  image?: string;
  tech?: string;
  type?: ProjectType;
  status?: string;
  category?: string;
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string }>;
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
      ? "Portfolio | high-performance Websites, E-Commerce, Dashboards & AI Automation"
      : locale === "ar"
        ? "معرض الأعمال | مواقع عالية الأداء، متاجر إلكترونية، لوحات تحكم وحلول أتمتة الذكاء الاصطناعي"
        : "Portfolio | Sites performants, E-Commerce, Dashboards & Automatisation IA";
  const description =
    locale === "en"
      ? "Discover high-performance websites, e-commerce stores, dashboards, and AI solutions. See how I help businesses grow online."
      : locale === "ar"
        ? "اكتشف مواقع عالية الأداء، ومتاجر إلكترونية، ولوحات تحكم، وحلول الذكاء الاصطناعي. شاهد كيف أساعد الشركات على النمو عبر الإنترنت."
        : "Découvrez des sites performants, boutiques e-commerce, dashboards et solutions d'IA. Boostez votre croissance.";
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
    ogImagePath: "/cover/Design-cover.jpg",
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

  if (!data || !data.projects) return null;

  const allProjects = Object.values(data.projects).map((p: any) => ({
    title: p.title ?? "",
    description: p.description ?? "",
    href: p.href || p.link || "#",
    image: p.image ?? "",
    tech: p.tech ?? "",
    type: p.type as "professional" | "personal" | "academic",
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
            ? "Portfolio of high-performance Next.js websites, e-commerce stores, business dashboards, and AI-powered solutions built with Technical SEO and scalable architecture."
            : locale === "ar"
              ? "معرض أعمال يضم مواقع Next.js عالية الأداء، ومتاجر إلكترونية، ولوحات تحكم للأعمال، وحلولاً مدعومة بالذكاء الاصطناعي، مع SEO تقني وبنية قابلة للتوسع."
              : "Portfolio de sites Next.js performants, boutiques e-commerce, tableaux de bord métier et solutions d'IA, développés avec un SEO technique et une architecture évolutive."
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
