// app/components/schemas/articleSchema.ts

export type ArticleSchemaInput = {
  /** schema.org subtype — Article, BlogPosting or TechArticle */
  type?: "Article" | "BlogPosting" | "TechArticle";
  baseUrl: string;
  locale: string;
  /** Article path without locale, e.g. "/articles/my-slug" */
  path: string;
  headline: string;
  description: string;
  /** Absolute URL or site-relative path of the cover image */
  image: string;
  /** ISO 8601 date, e.g. "2026-08-19" */
  datePublished: string;
  dateModified?: string;
  section?: string;
  /** BCP 47 code, e.g. "en-US" */
  langCode: string;
  wordCount?: number;
};

/**
 * Builds a self-contained Article JSON-LD object that passes Google's
 * Rich Results Test: author/publisher are inlined as full Person objects
 * (with name + url) instead of dangling "@id" references, and image,
 * datePublished/dateModified are always present.
 * The "@id" links are kept so the graph still ties into the site-wide
 * #person / #website entities defined on the homepage.
 */
export function buildArticleSchema({
  type = "Article",
  baseUrl,
  locale,
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  section,
  langCode,
  wordCount,
}: ArticleSchemaInput) {
  const url = `${baseUrl}/${locale}${path}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`;

  const author = {
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Mohammed Elghandori",
    url: `${baseUrl}/${locale}/about`,
  };

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    headline,
    description,
    url,
    image: imageUrl,
    datePublished,
    dateModified: dateModified ?? datePublished,
    articleSection: section,
    inLanguage: langCode,
    ...(wordCount ? { wordCount } : {}),
    isPartOf: { "@id": `${baseUrl}/#website` },
    author,
    publisher: author,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
