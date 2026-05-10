import type { Metadata } from "next";
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
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import ShareButton from "@/app/components/ShareButton";

type Props = { params: Promise<{ locale: string }> };
const ARTICLE_PATH = "/articles/best-laptop-guide-2026";
const ARTICLE_SLUG = "best-laptop-guide-2026";

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
  highlights: string[];
};

type ArticlesPageData = {
  heading: string;
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

  return buildPageMetadata({
    locale,
    title: article.title,
    description: article.excerpt,
    keywords: [
      article.category,
      article.title,
      "laptop guide 2026",
      "best laptop",
      "developer laptop",
    ],
    route: ARTICLE_PATH,
    ogImagePath: article.image,
  });
}

function renderContentBlock(content: string | undefined, index: number) {
  if (!content) return null;

  const lines = content.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return null;

  const title = lines[0];
  const bodyLines = lines.slice(1);

  return (
    <div key={`block-${index}`} className="mb-10 last:mb-0">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5 leading-snug tracking-tight">
        {title}
      </h2>
      <div className="space-y-3">
        {bodyLines.map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          // Bullet point: * text
          if (trimmed.startsWith("•") || trimmed.startsWith("*")) {
            const bulletText = trimmed.replace(/^\•\s*/, "");
            return (
              <div
                key={i}
                className="flex items-start gap-3 pl-1 text-base sm:text-lg text-foreground/85 leading-relaxed"
              >
                <span className="mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{bulletText}</span>
              </div>
            );
          }

          // Quoted text: "quote"
          if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary/25 bg-primary/4 rounded-r-xl px-6 py-5 my-5 text-foreground/90 italic text-lg leading-relaxed"
              >
                {trimmed.slice(1, -1)}
              </blockquote>
            );
          }

          // Regular paragraph
          return (
            <p
              key={i}
              className="text-base sm:text-lg text-foreground/85 leading-[1.8]"
            >
              {trimmed}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default async function ArticleDetailsPage({ params }: Props) {
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

  const contentBlocks = [
    article.text,
    article.text1,
    article.text2,
    article.text3,
    article.text4,
    article.text5,
    article.text6,
  ].filter(Boolean) as string[];

  // Build share URL for native share
  const shareUrl = `${getBaseUrl()}/${locale}${ARTICLE_PATH}`;

  // Structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.image.startsWith("http")
      ? article.image
      : `${getBaseUrl()}${article.image.startsWith("/") ? "" : "/"}${article.image}`,
    datePublished: article.published,
    dateModified: article.published,
    articleSection: article.category,
    inLanguage: locale,
    wordCount: contentBlocks.join(" ").split(/\s+/).length,
    author: {
      "@type": "Person",
      name: "Mohammed Elghandori",
      url: "https://devsignpro.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Devsignpro",
      logo: {
        "@type": "ImageObject",
        url: `${getBaseUrl()}/logo/devsign-logo.jpg`,
      },
      url: "https://devsignpro.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name:
          locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home",
        item: `${getBaseUrl()}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          locale === "ar"
            ? "المقالات"
            : locale === "fr"
              ? "Articles"
              : "Articles",
        item: `${getBaseUrl()}/${locale}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
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
    articles:
      locale === "ar" ? "المقالات" : locale === "fr" ? "Articles" : "Articles",
    keyTakeaways:
      locale === "ar"
        ? "أبرز النقاط"
        : locale === "fr"
          ? "Points clés"
          : "Key Takeaways",
    contactme:
      locale === "ar"
        ? "تواصل معي"
        : locale === "fr"
          ? "Contacter"
          : "Contact Me",
    share: locale === "ar" ? "مشاركة" : locale === "fr" ? "Partager" : "Share",
    allArticles:
      locale === "ar"
        ? "جميع المقالات"
        : locale === "fr"
          ? "Tous les articles"
          : "All articles",
    authorName:
      locale === "ar"
        ? "محمد الغنضوري"
        : locale === "fr"
          ? "Mohammed Elghandori"
          : "Mohammed Elghandori",
    authorRole:
      locale === "ar"
        ? "مطور برمجيات"
        : locale === "fr"
          ? "développeur de logiciels"
          : "software developer",
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
      {/* ─── Structured Data ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Breadcrumb Navigation ─── */}
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
          <li className="text-foreground font-medium truncate max-w-50 sm:max-w-xs">
            {article.title}
          </li>
        </ol>
      </nav>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* ─── Back Link ─── */}

        <Link
          href={`/${locale}/articles`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:underline underline-offset-4"
        >
          <Arr
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {labels.back}
        </Link>

        {/* ─── Article Header ─── */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary font-semibold">
              <Tag size={12} aria-hidden="true" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
              <CalendarDays size={12} aria-hidden="true" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
              <Clock3 size={12} aria-hidden="true" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-5 tracking-tight text-foreground">
            {article.title}
          </h1>

          {article.head && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
              {article.head}
            </p>
          )}
        </header>

        {/* ─── Hero Image ─── */}
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

        {/* ─── Article Body ─── */}
        <div className="prose-custom">
          {/* Lead / Excerpt */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 sm:mb-12 font-medium border-l-4 border-primary/20 pl-5 italic">
            {article.excerpt}
          </p>

          {/* Key Takeaways */}
          {article.highlights.length > 0 && (
            <aside className="rounded-xl bg-card border border-border p-6 sm:p-7 mb-10 sm:mb-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                {labels.keyTakeaways}
              </h3>
              <ul className="space-y-3">
                {article.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm sm:text-base text-foreground/90"
                  >
                    <span className="mt-2 inline-block h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Main Content */}
          <div className="space-y-2">
            {contentBlocks.map((block, index) =>
              renderContentBlock(block, index),
            )}
          </div>
        </div>

        {/* ─── Author Footer ─── */}
        <footer className="mt-14 sm:mt-16 pt-8 border-t border-border">
          <div className="flex flex-col space-y-5">
            {/* Author Profile - Centered on mobile */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/profile.png"
                  alt="Mohammed Elghandori"
                  width={48}
                  height={48}
                  className="rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {labels.authorName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {labels.authorRole}
                  </p>
                </div>
              </div>

              {/* Buttons - Grid on mobile, flex on desktop */}
              <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/70 active:bg-muted/50 transition-colors no-underline touch-manipulation"
                >
                  <MessageCircle size={15} className="shrink-0" />
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

        {/* ─── Bottom Navigation ─── */}
        <div className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <Arr size={16} />
            {labels.allArticles}
          </Link>
        </div>
      </article>
    </main>
  );
}
