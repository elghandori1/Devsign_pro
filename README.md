# Devsign Pro

Devsign Pro is a professional portfolio and services platform created to showcase projects, expertise, and digital solutions in web development, SEO optimization, and AI automation.

The platform serves as both a portfolio and a business website, highlighting real-world projects, technical skills, and services designed to help startups, businesses, and entrepreneurs build a stronger online presence.

## Live Website

https://devsignpro.com

## What You'll Find

* Professional portfolio of web development projects
* Case studies and technical articles
* SEO-focused website solutions
* AI automation tools and workflows
* Digital product showcases
* Service offerings for businesses and startups
* Multilingual user experience

## Services

### Web Development

Design and development of modern, responsive, and scalable web applications with a strong focus on performance, accessibility, and maintainability.

### SEO Optimization

Technical and on-page SEO improvements aimed at increasing visibility, improving search engine rankings, and driving organic traffic.

### AI Automation

Custom automation solutions powered by AI to streamline workflows, reduce repetitive tasks, and improve business efficiency.

### Digital Design

Creation of marketing assets, landing pages, and social media visuals designed to support brand growth and customer engagement.

## Key Features

* High-performance architecture
* SEO-friendly implementation
* Responsive design for all devices
* Multilingual support (English, French, and Arabic)
* Modern UI/UX principles
* Fast loading and optimized user experience
* Project and service showcase

## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Internationalization (i18n)
* Responsive and SEO-focused architecture

## Goal

The goal of Devsign Pro is to provide businesses and entrepreneurs with modern digital solutions that combine performance, scalability, user experience, and business value while showcasing a portfolio of real-world projects and technical expertise.

## Search indexing maintenance

- The canonical production origin is `https://devsignpro.com`. If setting `NEXT_PUBLIC_BASE_URL`, use that origin, never a preview deployment URL. Deployment-specific Vercel variables do not determine canonical URLs.
- In the hosting domain settings, configure `www.devsignpro.com` to permanently redirect (301 or 308) to `devsignpro.com`, preserving paths and query parameters. A hosting redirect runs before application code; change the existing 307 there.
- Keep retired URL redirects when content has an equivalent replacement. Missing pages without a replacement should continue returning 404.
- The sitemap intentionally omits `lastmod` until reliable per-page content modification dates are maintained. Do not use the current build date or a shared arbitrary date.
- Keep the sitemap, IndexNow URL lists and public discovery files aligned when adding or retiring pages. IndexNow submissions do not request Google indexing.

Set `NEXT_PUBLIC_BASE_URL=https://devsignpro.com` for both the production build and server, overriding any localhost value in a local `.env`. After building and starting a production server, run `npm run check:seo -- http://localhost:3000`. The check uses `https://devsignpro.com` as the expected canonical origin; an optional second argument overrides it for an intentionally local build. After deployment, run `npm run check:seo -- https://devsignpro.com`.

In Search Console, submit or check `https://devsignpro.com/sitemap.xml`. Inspect the exact URLs in the redirect-error, canonical-disagreement and crawled-not-indexed reports. Compare last crawl dates with deployment, test the live URLs, and request indexing for important replacement pages. Validate a fix only for an issue actually resolved. Intentional redirect and alternate-canonical exclusions need not disappear.
