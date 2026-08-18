import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import { i18n } from "@/i18n-config";
import { readFileSync } from "fs";
import { join } from "path";

function getIndexNowKey(): string {
	if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
	try {
		return readFileSync(join(process.cwd(), "public", "indexnow-key.txt"), "utf8").trim();
	} catch {
		return "";
	}
}

/** Primary public URLs to push for fast Bing / Yandex / Brave indexing. */
export function getIndexNowUrls(baseUrl = getBaseUrl()): string[] {
	const paths = [
		"",
		"/about",
		"/services",
		"/services/web-development",
		"/services/technical-seo",
		"/services/ecommerce-development",
		"/services/business-dashboards",
		"/portfolio",
		"/contact",
		"/articles",
		"/articles/best-laptop-guide-2026",
		"/articles/how-to-check-used-laptop-2026",
	];

	return i18n.locales.flatMap((locale) =>
		paths.map((path) => `${baseUrl}/${locale}${path}`),
	);
}

/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 * Brave Search benefits via Bing's index.
 */
export async function submitIndexNow(urls?: string[]): Promise<{
	ok: boolean;
	status: number;
	key: string;
	urlCount: number;
	body: string;
}> {
	const key = getIndexNowKey();
	const baseUrl = getBaseUrl();
	const host = new URL(baseUrl).host;
	const targetUrls = urls?.length ? urls : getIndexNowUrls(baseUrl);

	if (!key) {
		return {
			ok: false,
			status: 0,
			key: "",
			urlCount: 0,
			body: "Missing IndexNow key",
		};
	}

	const payload = {
		host,
		key,
		keyLocation: `${baseUrl}/${key}.txt`,
		urlList: targetUrls,
	};

	const response = await fetch("https://api.indexnow.org/indexnow", {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify(payload),
	});

	const body = await response.text();
	return {
		ok: response.ok || response.status === 202,
		status: response.status,
		key,
		urlCount: targetUrls.length,
		body,
	};
}
