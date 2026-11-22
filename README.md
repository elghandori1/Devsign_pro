# Devsign Pro

Devsign Pro is the portfolio and services website of an SEO & GEO consultant and web developer based in France. It helps businesses, startups and agencies get found on Google and in AI answer engines (ChatGPT, Perplexity, Google AI Overviews), and turn that visibility into enquiries.

The site is also a working example of the method it sells: fast, crawlable, structured for search engines and LLMs, and built to convert.

## Live Website

https://devsignpro.com (French by default, English at `/en`)

## Services

1. **Technical SEO audit**: crawlability, indexing, Core Web Vitals, redirects, canonicals, hreflang and structured data, delivered as a prioritized action plan.
2. **SEO & GEO content optimization**: search intent, keywords, internal linking and answer-ready content for Google and AI engines.
3. **SEO-ready website creation**: showcase and business websites built on a clean technical SEO foundation.
4. **Online stores**: Shopify, WooCommerce and Next.js e-commerce, with product, collection and schema optimization.
5. **Management and analytics dashboards**: custom dashboards to track sales, leads and business KPIs.

## What You'll Find

* Case studies of real client projects (websites, Shopify stores, dashboards)
* Service pages with transparent starting prices
* Technical articles on SEO and Next.js
* A free quote form as the main conversion path

## Technical Highlights

* **Next.js 16 App Router** with static generation for every public page
* **i18n routing** (`fr`, `en`): a proxy picks the locale from `Accept-Language` (307 + `Vary`) and falls back to French for crawlers
* **Hreflang and canonicals** on every page, with `x-default` and dedicated `fr-MA` / `en-MA` alternates for the Morocco page
* **Schema.org JSON-LD**: Person, ProfessionalService, Service, FAQPage, BreadcrumbList, ProfilePage and ImageObject
* **GEO / LLM readiness**: `llms.txt` and `llms-full.txt`, plus concise answer-first content
* **Redirect hygiene**: single-hop 308 redirects for retired slugs and locales, with query strings preserved
* **Performance**: AVIF/WebP images, a variable font and analytics that load after the first interaction; Lighthouse scores 100 for accessibility, best practices and SEO on the main pages
* **Dark mode** through `next-themes`, with WCAG-compliant contrast in both themes
* **Automated SEO checks**: `npm run check:seo` verifies the sitemap, canonicals, hreflang, redirects and 404s against a build or the live site
* **IndexNow** submission script for faster discovery

## Tech Stack

* Next.js 16 (App Router), React 19, TypeScript
* Tailwind CSS 4, Framer Motion
* Nodemailer for the contact and quote form
* JSON dictionaries for all content (`app/dictionaries`)

## Goal

Rank for "Consultant SEO et GEO en France pour sites web et boutiques en ligne", and show through the site itself what a technically sound, search-ready website looks like.