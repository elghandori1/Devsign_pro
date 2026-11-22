import { readFileSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (
	process.env.NEXT_PUBLIC_BASE_URL || "https://devsignpro.com"
).replace(/\/+$/, "");

const key = (
	process.env.INDEXNOW_KEY ||
	readFileSync(join(process.cwd(), "public", "indexnow-key.txt"), "utf8")
).trim();

// Submit every page in the live sitemap, so new pages are never forgotten.
const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const urlList = [...(await sitemapResponse.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
if (!urlList.length) throw new Error("Sitemap contains no URLs");

const host = new URL(baseUrl).host;
const payload = {
	host,
	key,
	keyLocation: `${baseUrl}/${key}.txt`,
	urlList,
};

const response = await fetch("https://api.indexnow.org/indexnow", {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify(payload),
});

const body = await response.text();
console.log(
	JSON.stringify(
		{
			ok: response.ok || response.status === 202,
			status: response.status,
			urlCount: urlList.length,
			host,
			body,
		},
		null,
		2,
	),
);

if (!(response.ok || response.status === 202)) {
	process.exit(1);
}
