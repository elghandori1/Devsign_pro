import { readFileSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (
	process.env.NEXT_PUBLIC_BASE_URL || "https://www.devsignpro.com"
).replace(/\/+$/, "");

const key = (
	process.env.INDEXNOW_KEY ||
	readFileSync(join(process.cwd(), "public", "indexnow-key.txt"), "utf8")
).trim();

const locales = ["en", "fr", "ar"];
const paths = [
	"",
	"/about",
	"/services",
	"/services/web-development",
	"/services/business-systems",
	"/services/ecommerce",
	"/portfolio",
	"/contact",
	"/articles",
	"/articles/best-laptop-guide-2026",
	"/articles/how-to-check-used-laptop-2026",
];

const urlList = locales.flatMap((locale) =>
	paths.map((path) => `${baseUrl}/${locale}${path}`),
);

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
