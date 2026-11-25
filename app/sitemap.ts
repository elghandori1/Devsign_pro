import type { MetadataRoute } from "next";
import { i18n, localeToBcp47 } from "@/i18n-config";
import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import { getDictionary } from "@/app/lib/dictionary";
import { flattenPortfolioProjects, hrefToPortfolioSlug } from "@/app/lib/portfolio";
import { MOROCCO_PAGE_PATHS } from "@/app/lib/moroccoPage";
import { googleVisibilityArticle } from "@/app/lib/googleVisibilityArticle";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl();
	const localeAlternates = (path: string) => ({
		languages: {
			[localeToBcp47("en")]: `${baseUrl}/en${path}`,
			[localeToBcp47("fr")]: `${baseUrl}/fr${path}`,
			"x-default": `${baseUrl}/${i18n.defaultLocale}${path}`,
		},
	});

	const routes = [
		{ path: "", changeFrequency: "weekly" as const, priority: 1 },
		{ path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
		{ path: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
		{
			path: "/services/web-development",
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{
			path: "/services/technical-seo",
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{
			path: "/services/seo-content-optimization",
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{
			path: "/services/ecommerce-development",
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{
			path: "/services/business-dashboards",
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{ path: "/portfolio", changeFrequency: "monthly" as const, priority: 0.8 },
		{ path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
	];

	const articleRoutes = [
		{ path: "/articles", changeFrequency: "monthly" as const, priority: 0.7 },
		{
			path: "/articles/nextjs-seo-framework-guide-2026",
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			path: "/articles/laptop-buying-guide-2026",
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
	];

	// Omit lastModified until we track meaningful content changes per page.
	// A fixed shared date or a build timestamp misrepresents content freshness.

	const staticEntries: MetadataRoute.Sitemap = routes.flatMap(
		({ path, changeFrequency, priority }) =>
			i18n.locales.map((locale) => ({
				url: `${baseUrl}/${locale}${path}`,
				alternates: localeAlternates(path),
				changeFrequency,
				priority,
			})),
	);

	const articleEntries: MetadataRoute.Sitemap = articleRoutes.flatMap(
		({ path, changeFrequency, priority }) =>
			i18n.locales.map((locale) => ({
				url: `${baseUrl}/${locale}${path}`,
				alternates: localeAlternates(path),
				changeFrequency,
				priority,
			})),
	);

	const moroccoFrenchUrl = `${baseUrl}/fr${MOROCCO_PAGE_PATHS.fr}`;
	const moroccoEnglishUrl = `${baseUrl}/en${MOROCCO_PAGE_PATHS.en}`;
	const moroccoMarketEntries: MetadataRoute.Sitemap = [moroccoFrenchUrl, moroccoEnglishUrl].map((url) => ({
		url,
		alternates: {
			languages: {
				"fr-MA": moroccoFrenchUrl,
				"en-MA": moroccoEnglishUrl,
				"x-default": moroccoEnglishUrl,
			},
		},
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const dict = await getDictionary(i18n.defaultLocale);
	const portfolioProjects = flattenPortfolioProjects<{ href?: string }>(
		dict.pages?.portfolio_page?.projects,
	);

	const portfolioEntries: MetadataRoute.Sitemap = portfolioProjects.flatMap(
		(project) => {
			if (!project?.href) return [];
			const slug = hrefToPortfolioSlug(project.href);
			if (!slug) return [];

			return i18n.locales.map((locale) => ({
				url: `${baseUrl}/${locale}/portfolio/${slug}`,
				alternates: localeAlternates(`/portfolio/${slug}`),
				changeFrequency: "monthly" as const,
				priority: 0.7,
			}));
		},
	);

	return [
		...staticEntries,
		...articleEntries,
		{ url: `${baseUrl}/fr${googleVisibilityArticle.href}` },
		...moroccoMarketEntries,
		...portfolioEntries,
	];
}
