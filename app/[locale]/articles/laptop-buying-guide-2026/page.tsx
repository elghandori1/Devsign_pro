import type { Metadata } from "next";
import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Tag,
  ChevronRight,
  MessageCircle,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { buildArticleSchema } from "@/app/components/schemas";
import ShareButton from "@/app/components/ShareButton";

type Props = { params: Promise<{ locale: string }> };
const ARTICLE_PATH = "/articles/laptop-buying-guide-2026";
const ARTICLE_SLUG = "laptop-buying-guide-2026";

type ArticleEntry = {
  href?: string;
  slug: string;
  title: string;
  image: string;
  category: string;
  date: string;
  published: string;
  readTime: string;
  excerpt: string;
  head?: string;
  text?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
  text6?: string;
  text7?: string;
  text8?: string;
  text9?: string;
  text10?: string;
  highlights: string[];
};

type ArticlesPageData = {
  articles: ArticleEntry[];
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const data = (dict.pages as { articles_page?: ArticlesPageData } | undefined)
    ?.articles_page;
  const article = data?.articles.find((item) => item.slug === ARTICLE_SLUG);

  if (!article) notFound();

  const seoTitle =
    locale === "en"
      ? "How to Choose a Laptop in 2026 | Students & Business Owners"
      : locale === "ar"
        ? "كيفية اختيار لابتوب في 2026 | للطلاب وأصحاب الأعمال"
        : "Comment choisir un laptop en 2026 | Étudiants et entrepreneurs";

  const seoDescription =
    locale === "en"
      ? "Learn how to choose a laptop in 2026 for study or business. Compare CPU, RAM, SSD specs and learn how to inspect a used laptop before you buy."
      : locale === "ar"
        ? "دليلك الشامل لاختيار لابتوب في 2026 للدراسة والعمل. قارن المواصفات وتعلم كيفية فحص اللابتوب المستعمل قبل الشراء لضمان أفضل صفقة."
        : "Apprenez à choisir le bon laptop en 2026. Comparez les specs et découvrez comment vérifier un PC portable d'occasion avant l'achat.";

  return buildPageMetadata({
    locale,
    title: seoTitle,
    description: seoDescription,
    keywords: [
      article.category,
      article.title,
      "laptop guide 2026",
      "best laptop",
      "developer laptop",
      "how to check used laptop",
      "laptop commands",
    ],
    route: ARTICLE_PATH,
    ogImagePath: article.image,
    type: "article",
  });
}

/**
 * Renders the intro block (article.text): plain paragraphs only.
 * The page already has an <h1> — the intro must NOT produce an <h2>.
 */
function renderIntro(content: string | undefined) {
  if (!content) return null;
  const paragraphs = content.split("\n").filter((l) => l.trim());
  if (paragraphs.length === 0) return null;

  return paragraphs.map((line, i) => (
    <p
      key={i}
      className="text-base sm:text-lg text-foreground/85 leading-[1.8] mb-4 last:mb-0"
    >
      {line.trim()}
    </p>
  ));
}

/**
 * Renders a content section (text1..text10):
 * first line = <h2>, body = grouped <ul>/<li>, <blockquote>, or <p>.
 */
function renderContentBlock(content: string | undefined, index: number) {
  if (!content) return null;

  const lines = content.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return null;

  const title = lines[0].trim();
  const bodyLines = lines.slice(1);
  const headingId = `section-${index}`;

  const elements: ReactElement[] = [];
  let listItems: string[] = [];

  // Flush accumulated bullet lines into ONE semantic <ul>
  const flushList = () => {
    if (listItems.length === 0) return;
    const items = [...listItems];
    listItems = [];
    elements.push(
      <ul key={`ul-${elements.length}`} className="space-y-3 my-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 pl-1 text-base sm:text-lg text-foreground/85 leading-relaxed"
          >
            <span
              aria-hidden="true"
              className="mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>,
    );
  };

  for (const line of bodyLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Bullet point: • text or * text
    if (trimmed.startsWith("\u2022") || trimmed.startsWith("*")) {
      listItems.push(trimmed.replace(/^[\u2022*]\s*/, ""));
      continue;
    }

    flushList();

    // Quoted text: "quote"
    if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1) {
      elements.push(
        <blockquote
          key={`q-${elements.length}`}
          className="border-l-4 border-primary/25 bg-primary/4 rounded-r-xl px-6 py-5 my-5 text-foreground/90 italic text-lg leading-relaxed"
        >
          <p>{trimmed.slice(1, -1)}</p>
        </blockquote>,
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="text-base sm:text-lg text-foreground/85 leading-[1.8]"
      >
        {trimmed}
      </p>,
    );
  }
  flushList();

  return (
    <section
      key={`block-${index}`}
      aria-labelledby={headingId}
      className="mb-10 last:mb-0"
    >
      <h2
        id={headingId}
        className="text-xl sm:text-2xl font-bold text-foreground mb-5 leading-snug tracking-tight"
      >
        {title}
      </h2>
      <div className="space-y-3">{elements}</div>
    </section>
  );
}

export default async function BestLaptopGuide2026({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const data = (dict.pages as { articles_page?: ArticlesPageData } | undefined)
    ?.articles_page;
  const article = data?.articles.find((item) => item.slug === ARTICLE_SLUG);

  if (!data || !article) notFound();

  const isRtl = locale === "ar";
  const Arr = isRtl ? ArrowRight : ArrowLeft;
  const Chev = isRtl ? ArrowLeft : ChevronRight;

  // article.text = intro (no heading); text1..text10 = sections with headings
  const sectionBlocks = [
    article.text1,
    article.text2,
    article.text3,
    article.text4,
    article.text5,
    article.text6,
    article.text7,
    article.text8,
    article.text9,
    article.text10,
  ].filter(Boolean) as string[];

  const allText = [article.text, ...sectionBlocks].filter(Boolean).join(" ");

  const relatedArticles = data.articles
    .filter((a) => a.slug !== ARTICLE_SLUG)
    .sort(
      (a, b) =>
        new Date(b.published).getTime() - new Date(a.published).getTime(),
    )
    .slice(0, 3);

  const shareUrl = `${getBaseUrl()}/${locale}${ARTICLE_PATH}`;
  const baseUrl = getBaseUrl();
  const langCode =
    locale === "en" ? "en-US" : locale === "ar" ? "ar-MA" : "fr-MA";

  const articleSchema = buildArticleSchema({
    type: "Article",
    baseUrl,
    locale,
    path: ARTICLE_PATH,
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.published,
    section: article.category,
    langCode,
    wordCount: allText.split(/\s+/).length,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home",
        item: `${getBaseUrl()}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "ar" ? "المقالات" : locale === "fr" ? "Articles" : "Articles",
        item: `${getBaseUrl()}/${locale}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          locale === "ar"
            ? "كيفية اختيار لابتوب في 2026"
            : locale === "fr"
              ? "Comment choisir un laptop en 2026"
              : "How to Choose a Laptop in 2026",
        item: shareUrl,
      },
    ],
  };

  // Labels
  const labels = {
    back:
      locale === "ar"
        ? "الرجوع إلى المقالات"
        : locale === "fr"
          ? "Retour aux articles"
          : "Back to articles",
    home: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home",
    articles: locale === "ar" ? "المقالات" : locale === "fr" ? "Articles" : "Articles",
    keyTakeaways:
      locale === "ar" ? "أبرز النقاط" : locale === "fr" ? "Points clés" : "Key Takeaways",
    contactme:
      locale === "ar" ? "تواصل معي" : locale === "fr" ? "Contacter" : "Contact Me",
    share: locale === "ar" ? "مشاركة" : locale === "fr" ? "Partager" : "Share",
    allArticles:
      locale === "ar"
        ? "جميع المقالات"
        : locale === "fr"
          ? "Tous les articles"
          : "All articles",
    relatedArticles:
      locale === "ar"
        ? "مقالات مفيدة أخرى"
        : locale === "fr"
          ? "Autres articles utiles"
          : "Other Helpful Articles",
    authorName: locale === "ar" ? "محمد الغنضوري" : "Mohammed Elghandori",
    authorRole:
      locale === "ar"
        ? "مطور ويب Full-Stack وخبير SEO"
        : locale === "fr"
          ? "Développeur Web Full-Stack & Spécialiste SEO"
          : "Full-Stack Web Developer & SEO Specialist",
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10"
      >
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link
              href={`/${locale}`}
              className="hover:text-primary transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {labels.home}
            </Link>
          </li>
          <li aria-hidden="true">
            <Chev size={14} className={isRtl ? "rotate-180" : ""} />
          </li>
          <li>
            <Link
              href={`/${locale}/articles`}
              className="hover:text-primary transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {labels.articles}
            </Link>
          </li>
          <li aria-hidden="true">
            <Chev size={14} className={isRtl ? "rotate-180" : ""} />
          </li>
          <li
            aria-current="page"
            className="text-foreground font-medium truncate max-w-50 sm:max-w-xs"
          >
            {locale === "ar"
              ? "كيفية اختيار لابتوب في 2026"
              : locale === "fr"
                ? "Comment choisir un laptop en 2026"
                : "How to Choose a Laptop in 2026"}
          </li>
        </ol>
      </nav>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Link */}
        <nav aria-label={labels.back} className="mb-8">
          <Link
            href={`/${locale}/articles`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            <Arr
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            {labels.back}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary font-semibold">
              <Tag size={12} aria-hidden="true" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
              <CalendarDays size={12} aria-hidden="true" />
              <time dateTime={article.published}>{article.date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
              <Clock3 size={12} aria-hidden="true" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-5 tracking-tight text-foreground">
            {article.title}
          </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
              {article.excerpt}
            </p>
        </header>

        {/* Hero Image */}
        <figure className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted mb-10 sm:mb-14 shadow-lg ring-1 ring-border">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </figure>

        {/* Lead / Excerpt (rendered once — not duplicated in header) */}
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 sm:mb-12 font-medium border-l-4 border-primary/20 pl-5 italic">
          {article.excerpt}
        </p>

        {/* Key Takeaways */}
        {article.highlights.length > 0 && (
          <aside
            aria-labelledby="key-takeaways"
            className="rounded-xl bg-card border border-border p-6 sm:p-7 mb-10 sm:mb-12"
          >
            <h2
              id="key-takeaways"
              className="text-xl sm:text-2xl font-bold text-foreground mb-5 leading-snug tracking-tight"
            >
              {labels.keyTakeaways}
            </h2>
            <ul className="space-y-3">
              {article.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm sm:text-base text-foreground/90"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-2 w-2 rounded-full bg-primary shrink-0"
                  />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Intro (no heading — page h1 covers it) */}
        {renderIntro(article.text)}

        {/* Main Content Sections */}
        <div className="space-y-2 mt-10">
          {sectionBlocks.map((block, index) =>
            renderContentBlock(block, index),
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section
            aria-labelledby="related-articles"
            className="mt-12 sm:mt-10 pt-8 border-t border-border"
          >
            <h2 id="related-articles" className="text-2xl font-bold text-foreground mb-8">
              {labels.relatedArticles}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/${locale}${related.href || `/articles/${related.slug}`}`}
                    className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 no-underline"
                  >
                    <div className="relative aspect-video w-full bg-muted overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs text-primary font-semibold mb-2 uppercase tracking-wide">
                        {related.category}
                      </span>
                      <h3 className="text-base font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-auto line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Author Footer */}
        <footer className="mt-10 sm:mt-14 pt-8 border-t border-border">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/mohammed-profile.png"
                  alt={`${labels.authorName} — ${labels.authorRole}`}
                  width={56}
                  height={56}
                  className="rounded-full object-cover shrink-0 ring-2 ring-primary/10"
                />
                <div>
                  <p className="text-base font-bold text-foreground">
                    {labels.authorName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {labels.authorRole}
                  </p>

                  {/* Social Media Links */}
                  <ul aria-label="Social media" className="flex items-center gap-4 mt-3">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/YOUR-PROFILE/"
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-[#0A66C2] transition-colors duration-200"
                      >
                        <Linkedin size={18} aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/YOUR-USERNAME"
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label="GitHub"
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Github size={18} aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/YOUR-USERNAME"
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label="Instagram"
                        className="text-muted-foreground hover:text-[#E1306C] transition-colors duration-200"
                      >
                        <Instagram size={18} aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/70 active:bg-muted/50 transition-colors no-underline touch-manipulation"
                >
                  <MessageCircle size={15} aria-hidden="true" className="shrink-0" />
                  <span className="truncate">{labels.contactme}</span>
                </Link>

                <ShareButton
                  url={shareUrl}
                  title={article.title}
                  text={article.excerpt}
                  label={labels.share}
                />
              </div>
            </div>
          </div>
        </footer>

        {/* Bottom Navigation */}
        <nav aria-label={labels.allArticles} className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <Arr size={16} aria-hidden="true" />
            {labels.allArticles}
          </Link>
        </nav>
      </article>
    </main>
  );
}