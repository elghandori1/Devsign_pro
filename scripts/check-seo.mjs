import assert from "node:assert/strict";

// Run against a production build, or pass the deployed origin after release.
const origin = new URL(process.argv[2] || "http://localhost:3000").origin;
const canonicalOrigin = new URL(process.argv[3] || "https://devsignpro.com").origin;
const locales = ["en", "fr"];
const hreflangByLocale = { en: "en", fr: "fr-FR" };
const failures = [];
let checks = 0;

async function check(label, run) {
  checks++;
  try {
    await run();
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}

async function get(path) {
  return fetch(new URL(path, origin), {
    redirect: "manual",
    signal: AbortSignal.timeout(30000),
  });
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key.toLowerCase(), value,
    ]),
  );
}

const sitemapResponse = await get("/sitemap.xml");
assert.equal(sitemapResponse.status, 200, "Sitemap must be accessible");
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
assert.ok(urls.length > 0, "Sitemap must contain pages");
assert.equal(new Set(urls).size, urls.length, "Sitemap must not contain duplicates");
assert.ok(!urls.some((url) => new URL(url).pathname === "/ar" || new URL(url).pathname.startsWith("/ar/")), "Retired Arabic URLs must not be in the sitemap");

await check("robots.txt", async () => {
  const response = await get("/robots.txt");
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.ok(body.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  assert.ok(!/^Disallow:\s*\/\s*$/mi.test(body), "Site-wide crawl block");
});

for (const url of urls) {
  await check(url, async () => {
    const page = new URL(url);
    assert.equal(page.origin, canonicalOrigin, "Unexpected sitemap domain");
    const response = await get(page.pathname);
    assert.equal(response.status, 200, "Sitemap page must not redirect or fail");
    assert.ok(!/noindex/i.test(response.headers.get("x-robots-tag") || ""));
    const html = await response.text();
    const tags = [...html.matchAll(/<(?:link|meta)\b[^>]*>/gi)].map(([tag]) => attributes(tag));
    const canonicals = tags.filter((tag) => tag.rel === "canonical");
    assert.equal(canonicals.length, 1, "Expected exactly one canonical");
    assert.equal(canonicals[0].href, url, "Incorrect canonical");
    assert.ok(!tags.some((tag) => /^(robots|googlebot)$/i.test(tag.name || "") && /noindex/i.test(tag.content || "")));
    if (page.pathname.endsWith("/consultant-seo-developpeur-web-maroc") || page.pathname.endsWith("/seo-consultant-web-developer-morocco")) {
      const frenchUrl = `${canonicalOrigin}/fr/consultant-seo-developpeur-web-maroc`;
      const englishUrl = `${canonicalOrigin}/en/seo-consultant-web-developer-morocco`;
      for (const [hreflang, href] of [["fr-MA", frenchUrl], ["en-MA", englishUrl], ["x-default", englishUrl]]) {
        assert.ok(tags.some((tag) => tag.hreflang === hreflang && tag.href === href), `Missing Morocco alternate: ${hreflang}`);
        assert.ok(urls.includes(href), "Morocco language alternate absent from sitemap");
      }
    } else {
      const suffix = page.pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
      for (const locale of [...locales, "x-default"]) {
        const hrefLocale = locale === "x-default" ? "fr" : locale;
        const hreflang = locale === "x-default" ? "x-default" : hreflangByLocale[locale];
        const expected = `${canonicalOrigin}/${hrefLocale}${suffix}`;
        assert.ok(tags.some((tag) => tag.hreflang === hreflang && tag.href === expected), `Missing language alternate: ${hreflang}`);
        assert.ok(urls.includes(expected), "Language alternate absent from sitemap");
      }
    }
  });
}

// Links without a locale follow the browser language (French by default).
for (const [path, language, target] of [
  ["/", undefined, "/fr"],
  ["/", "fr-FR,fr;q=0.9,en;q=0.8", "/fr"],
  ["/", "en-GB,en;q=0.9", "/en"],
  ["/about", "en-US,en;q=0.9,fr;q=0.5", "/en/about"],
  ["/about", "de-DE,de;q=0.9", "/fr/about"],
]) {
  await check(`Language redirect ${path} (${language ?? "no header"})`, async () => {
    const response = await fetch(new URL(path, origin), {
      redirect: "manual",
      headers: language ? { "accept-language": language } : {},
      signal: AbortSignal.timeout(30000),
    });
    assert.equal(response.status, 307, "Expected temporary redirect");
    assert.equal(new URL(response.headers.get("location"), origin).pathname, target);
    assert.match(response.headers.get("vary") || "", /accept-language/i);
  });
}

const redirects = [];
redirects.push(
  ["/consultant-seo-developpeur-web-maroc", "/fr/consultant-seo-developpeur-web-maroc"],
  ["/ar/consultant-seo-developpeur-web-maroc", "/en/seo-consultant-web-developer-morocco"],
  ["/en/consultant-seo-developpeur-web-maroc", "/en/seo-consultant-web-developer-morocco"],
  ["/seo-consultant-web-developer-morocco", "/en/seo-consultant-web-developer-morocco"],
  ["/fr/seo-consultant-web-developer-morocco", "/fr/consultant-seo-developpeur-web-maroc"],
);
const replacements = [
  ["articles/best-laptop-guide-2026", "articles/laptop-buying-guide-2026"],
  ["articles/how-to-check-used-laptop-2026", "articles/laptop-buying-guide-2026"],
  ["services/ecommerce", "services/ecommerce-development"],
  ["services/business-systems", "services/business-dashboards"],
  ["projects", "portfolio"],
  ["blog", "articles"],
  ["portfolio/math-multiplication-game", "portfolio/math-practice-game"],
  ["portfolio/money-transfer", "portfolio/currency-converter"],
  ["portfolio/calucature-utility-tool", "portfolio/currency-converter"],
  ["portfolio/ecommerce-platform", "portfolio/landing-page-ecommerce"],
  ["portfolio/nutritia-shopify-store", "portfolio/shopify-supplements-store"],
];
for (const [oldPath, newPath] of replacements) {
  redirects.push([`/${oldPath}`, `/fr/${newPath}`]);
  for (const locale of locales) redirects.push([`/${locale}/${oldPath}`, `/${locale}/${newPath}`]);
  redirects.push([`/ar/${oldPath}`, `/en/${newPath}`]);
}

// Every retired Arabic URL must resolve directly to the equivalent English
// canonical while preserving query parameters. Derive this from the sitemap so
// new public routes automatically receive migration coverage.
for (const url of urls) {
  const page = new URL(url);
  if (!page.pathname.startsWith("/en")) continue;
  const suffix = page.pathname.slice(3);
  redirects.push([`/ar${suffix}`, page.pathname]);
}
for (const [source, target] of redirects) {
  await check(`Redirect ${source}`, async () => {
    const response = await get(`${source}?utm_source=seo-check`);
    assert.ok([301, 308].includes(response.status), "Expected permanent redirect");
    const location = new URL(response.headers.get("location"), origin);
    assert.equal(location.origin, origin);
    assert.equal(location.pathname, target, "Redirect must go straight to replacement");
    assert.equal(location.searchParams.get("utm_source"), "seo-check", "Query lost");
    assert.equal((await get(location.pathname + location.search)).status, 200, "Redirect target must load without another redirect");
  });
}
for (const locale of locales) {
  for (const path of [`/${locale}/seo-check-missing-page`, `/${locale}/portfolio/seo-check-missing-project`]) {
    await check(`404 ${path}`, async () => {
      const response = await get(path);
      assert.equal(response.status, 404, "Missing page must not return a soft 404");
      assert.match(await response.text(), /<meta[^>]*name="robots"[^>]*content="noindex"/i);
    });
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`${failures.length} of ${checks} checks failed.`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${checks} SEO checks, including all ${urls.length} sitemap pages, language alternates, redirects, query preservation and 404 responses.`);
}
