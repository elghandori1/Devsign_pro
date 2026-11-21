import type { NextConfig } from "next";
import { i18n } from "./i18n-config";

const i18nDefaultLocale = i18n.defaultLocale;

const securityHeaders = [
	{ key: "X-DNS-Prefetch-Control", value: "on" },
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{ key: "X-Frame-Options", value: "SAMEORIGIN" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
	},
	{
		key: "Cross-Origin-Opener-Policy",
		value: "same-origin",
	},
];

const iconCacheHeaders = [
	{
		key: "Cache-Control",
		value: "public, max-age=604800, stale-while-revalidate=86400",
	},
];

const nextConfig: NextConfig = {
	poweredByHeader: false,
	compress: true,
	images: {
		formats: ["image/avif", "image/webp"],
	},
	experimental: {
		// Inline the small critical stylesheet instead of a render-blocking request.
		inlineCss: true,
	},
	// 308 permanent redirects for legacy slugs that were already
	// crawled/indexed — consolidates all SEO signals on the new URLs.
	async redirects() {
		return [
			// The Morocco market page has French and English equivalents. Bare
			// requests resolve to the French page; the retired Arabic URL does too.
			{
				source: "/consultant-seo-developpeur-web-maroc",
				destination: "/fr/consultant-seo-developpeur-web-maroc",
				permanent: true,
			},
			{
				source: "/ar/consultant-seo-developpeur-web-maroc",
				destination: "/en/consultant-seo-developpeur-web-maroc",
				permanent: true,
			},
			// Both retired guides were consolidated into the buying and inspection guide.
			...["best-laptop-guide-2026", "how-to-check-used-laptop-2026"].flatMap(
				(slug) => [
					{
						source: `/:locale(en|fr)/articles/${slug}`,
						destination: "/:locale/articles/laptop-buying-guide-2026",
						permanent: true,
					},
					{
						source: `/ar/articles/${slug}`,
						destination: "/en/articles/laptop-buying-guide-2026",
						permanent: true,
					},
					{
						source: `/articles/${slug}`,
						destination: `/${i18nDefaultLocale}/articles/laptop-buying-guide-2026`,
						permanent: true,
					},
				],
			),
			// Retired sections and portfolio slugs that have an equivalent page.
			// Each gets a locale-prefixed rule and a bare rule (straight to the
			// default locale) so no URL goes through a redirect chain.
			// social-campaign and services/social-design have no replacement and
			// intentionally stay 404.
			...[
				["/projects", "/portfolio"],
				["/blog", "/articles"],
				["/portfolio/math-multiplication-game", "/portfolio/math-practice-game"],
				["/portfolio/money-transfer", "/portfolio/currency-converter"],
				["/portfolio/calucature-utility-tool", "/portfolio/currency-converter"],
				["/portfolio/ecommerce-platform", "/portfolio/landing-page-ecommerce"],
			].flatMap(([from, to]) => [
				{
					source: `/:locale(en|fr)${from}`,
					destination: `/:locale${to}`,
					permanent: true,
				},
				{
					source: `/ar${from}`,
					destination: `/en${to}`,
					permanent: true,
				},
				{
					source: from,
					destination: `/${i18nDefaultLocale}${to}`,
					permanent: true,
				},
			]),
			// Locale-prefixed legacy slugs
			{
				source: "/:locale(en|fr)/services/ecommerce",
				destination: "/:locale/services/ecommerce-development",
				permanent: true,
			},
			{
				source: "/:locale(en|fr)/services/business-systems",
				destination: "/:locale/services/business-dashboards",
				permanent: true,
			},
			{
				source: "/ar/services/ecommerce",
				destination: "/en/services/ecommerce-development",
				permanent: true,
			},
			{
				source: "/ar/services/business-systems",
				destination: "/en/services/business-dashboards",
				permanent: true,
			},
			// Arabic has been retired. Preserve each current path and consolidate
			// its signals into the equivalent English URL in one permanent hop.
			{
				source: "/ar",
				destination: "/en",
				permanent: true,
			},
			{
				source: "/ar/:path*",
				destination: "/en/:path*",
				permanent: true,
			},
			// Bare legacy slugs (no locale prefix) — send straight to the
			// default-locale target to avoid a double redirect chain.
			{
				source: "/services/ecommerce",
				destination: `/${i18nDefaultLocale}/services/ecommerce-development`,
				permanent: true,
			},
			{
				source: "/services/business-systems",
				destination: `/${i18nDefaultLocale}/services/business-dashboards`,
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
			{
				source: "/favicon.ico",
				headers: [
					...iconCacheHeaders,
					{ key: "Content-Type", value: "image/x-icon" },
				],
			},
			{
				source: "/favicon.png",
				headers: [
					...iconCacheHeaders,
					{ key: "Content-Type", value: "image/png" },
				],
			},
			{
				source: "/favicon-:size(\\d+x\\d+).png",
				headers: [
					...iconCacheHeaders,
					{ key: "Content-Type", value: "image/png" },
				],
			},
			{
				source: "/apple-touch-icon.png",
				headers: [
					...iconCacheHeaders,
					{ key: "Content-Type", value: "image/png" },
				],
			},
			{
				source: "/mstile-150x150.png",
				headers: [
					...iconCacheHeaders,
					{ key: "Content-Type", value: "image/png" },
				],
			},
			{
				source: "/site.webmanifest",
				headers: [
					{
						key: "Content-Type",
						value: "application/manifest+json; charset=utf-8",
					},
					{
						key: "Cache-Control",
						value: "public, max-age=86400",
					},
				],
			},
			{
				source: "/browserconfig.xml",
				headers: [
					{ key: "Content-Type", value: "application/xml; charset=utf-8" },
					{ key: "Cache-Control", value: "public, max-age=86400" },
				],
			},
			{
				source: "/robots.txt",
				headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
			},
			{
				source: "/sitemap.xml",
				headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
			},
		];
	},
};

export default nextConfig;
