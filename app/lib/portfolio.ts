/** Slug segment from `href` like `/portfolio/corporate-website` → `corporate-website` */
export function hrefToPortfolioSlug(href: string): string {
  const trimmed = href.trim();
  const noQuery = trimmed.split("?")[0] ?? trimmed;
  const parts = noQuery.split("/").filter(Boolean);
  const idx = parts.indexOf("portfolio");
  if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]!;
  const last = parts[parts.length - 1];
  return last ?? "";
}
