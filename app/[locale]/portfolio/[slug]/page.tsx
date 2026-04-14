import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { hrefToPortfolioSlug } from "@/app/lib/portfolio";
import PortfolioProjectDetail, {
  type CaseStudyUi,
  type ProjectCaseStudyDetail,
} from "@/app/components/PortfolioProjectDetail";
import infos from "@/app/dictionaries/global.json";
type Props = { params: Promise<{ locale: string; slug: string }> };

type PortfolioProject = {
  title: string;
  description: string;
  tech: string;
  image: string;
  category: string;
  type: string;
  status?: string;
  href: string;
  highlightsHeading?: string;
  detail?: ProjectCaseStudyDetail;
};

function getProjectBySlug(
  projects: PortfolioProject[] | undefined,
  slug: string,
): PortfolioProject | undefined {
  if (!projects?.length) return undefined;
  return projects.find((p) => hrefToPortfolioSlug(p.href) === slug);
}

const defaultCaseStudyUi: CaseStudyUi = {
  breadcrumbHome: "Home",
  breadcrumbPortfolio: "Portfolio",
  backToPortfolio: "Back to portfolio",
  techHeading: "Technologies",
  categoryLabel: "Category",
  typeLabel: "Project type",
  statusLabel: "Status",
  collaborationTitle: "Ready for a similar outcome?",
  collaborationBody:
    "Tell me about your goals — I design, build, and ship digital products for businesses in Morocco and worldwide.",
};

export async function generateStaticParams() {
  const dict = await getDictionary(i18n.defaultLocale);
  const projects = (dict.pages?.portfolio_page?.projects ?? []) as PortfolioProject[];
  return i18n.locales.flatMap((locale) =>
    projects.map((p) => ({
      locale,
      slug: hrefToPortfolioSlug(p.href),
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const projects = dict.pages?.portfolio_page?.projects as PortfolioProject[] | undefined;
  const project = getProjectBySlug(projects, slug);

  if (!project?.detail?.seo) {
    notFound();
  }

  const route = `/portfolio/${slug}`;
  return buildPageMetadata({
    locale,
    title: project.detail.seo.title,
    description: project.detail.seo.description,
    keywords: project.detail.seo.keywords,
    route,
    ogImagePath: project.image,
  });
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const portfolioPage = dict.pages?.portfolio_page;
  const projects = portfolioPage?.projects as PortfolioProject[] | undefined;
  const project = getProjectBySlug(projects, slug);

  if (!project?.detail) {
    notFound();
  }

  const isRtl = locale === "ar";
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/portfolio/${slug}`;
  const imageUrl = project.image.startsWith("http")
    ? project.image
    : `${baseUrl}${project.image.startsWith("/") ? "" : "/"}${project.image}`;

  const caseStudyUi = {
    ...defaultCaseStudyUi,
    ...((portfolioPage as { caseStudyUi?: Partial<CaseStudyUi> } | undefined)
      ?.caseStudyUi ?? {}),
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.detail.seo.description,
    image: imageUrl,
    url: pageUrl,
    inLanguage: locale,
    creator: {
      "@type": "Organization",
      name: "Devsign",
      url: baseUrl,
      email: infos.email,
      telephone: infos.phoneNumber,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: caseStudyUi.breadcrumbHome,
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: caseStudyUi.breadcrumbPortfolio,
        item: `${baseUrl}/${locale}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <PortfolioProjectDetail
        project={{ ...project, detail: project.detail, highlightsHeading: project.highlightsHeading ?? "" }}
        caseStudyUi={caseStudyUi}
        portfolioHref={`/${locale}/portfolio`}
        ctaLabel={portfolioPage?.cta ?? "Contact"}
        locale={locale}
        isRtl={isRtl}
      />
    </>
  );
}
