import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import { getDictionary } from "@/app/lib/dictionary";
import { flattenPortfolioProjects, hrefToPortfolioSlug } from "@/app/lib/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl();
	const localeAlternates = (path: string) => ({
		languages: {
			en: `${baseUrl}/en${path}`,
			fr: `${baseUrl}/fr${path}`,
			ar: `${baseUrl}/ar${path}`,
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
			path: "/articles/best-laptop-guide-2026",
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			path: "/articles/how-to-check-used-laptop-2026",
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
	];

	const lastModified = new Date("2026-08-18");
	const articleLastModified: Record<string, Date> = {
		"/articles": new Date("2026-06-02"),
		"/articles/best-laptop-guide-2026": new Date("2026-05-07"),
		"/articles/how-to-check-used-laptop-2026": new Date("2026-06-02"),
	};

	const staticEntries: MetadataRoute.Sitemap = routes.flatMap(
		({ path, changeFrequency, priority }) =>
			i18n.locales.map((locale) => ({
				url: `${baseUrl}/${locale}${path}`,
				alternates: localeAlternates(path),
				lastModified,
				changeFrequency,
				priority,
			})),
	);

	const articleEntries: MetadataRoute.Sitemap = articleRoutes.flatMap(
		({ path, changeFrequency, priority }) =>
			i18n.locales.map((locale) => ({
				url: `${baseUrl}/${locale}${path}`,
				alternates: localeAlternates(path),
				lastModified: articleLastModified[path] ?? lastModified,
				changeFrequency,
				priority,
			})),
	);

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
				lastModified,
				changeFrequency: "monthly" as const,
				priority: 0.7,
			}));
		},
	);

	return [...staticEntries, ...articleEntries, ...portfolioEntries];
}