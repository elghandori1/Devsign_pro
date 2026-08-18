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

function isProjectRecord(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === "object" && !Array.isArray(item));
}

/** Flatten nested / object-shaped `portfolio_page.projects` into a list of project objects. */
export function flattenPortfolioProjects<T extends { href?: string }>(
  projects: unknown,
): T[] {
  if (!projects) return [];

  if (!Array.isArray(projects) && typeof projects === "object") {
    return Object.values(projects as Record<string, unknown>).flatMap((item) =>
      flattenPortfolioProjects<T>(item),
    );
  }

  if (!Array.isArray(projects)) return [];

  const result: T[] = [];
  for (const item of projects) {
    if (Array.isArray(item)) {
      result.push(...flattenPortfolioProjects<T>(item));
    } else if (isProjectRecord(item) && typeof item.href === "string" && item.href) {
      result.push(item as T);
    }
  }
  return result;
}

/** Short label for breadcrumb position 3 (visible name, not the full SEO title). */
export function shortBreadcrumbName(title: string, max = 42): string {
  const cut = title.split(/\s+[—–|]\s+/)[0]?.trim() ?? title;
  if (cut.length <= max) return cut;
  const words = cut.split(/\s+/);
  let out = "";
  for (const word of words) {
    const next = out ? `${out} ${word}` : word;
    if (next.length > max) break;
    out = next;
  }
  return out || cut.slice(0, max);
}

export function parseTechList(tech: unknown): string[] {
  if (Array.isArray(tech)) {
    return tech.map(String).map((t) => t.trim()).filter(Boolean);
  }
  if (typeof tech === "string") {
    return tech.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}
