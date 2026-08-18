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
	// 301 permanent redirects for legacy service slugs that were already
	// crawled/indexed — consolidates all SEO signals on the new URLs.
	async redirects() {
		return [
			// Locale-prefixed legacy slugs
			{
				source: "/:locale(en|fr|ar)/services/ecommerce",
				destination: "/:locale/services/ecommerce-development",
				permanent: true,
			},
			{
				source: "/:locale(en|fr|ar)/services/business-systems",
				destination: "/:locale/services/business-dashboards",
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
