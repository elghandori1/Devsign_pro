import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Tag } from "lucide-react";
import { Locale } from "@/i18n-config";

export type ArticleCardItem = {
  slug: string;
  title: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
};

interface ArticlesSectionProps {
  heading: string;
  description: string;
  articles: ArticleCardItem[];
  locale: Locale;
}

export default function ArticlesSection({
  heading,
  description,
  articles,
  locale,
}: ArticlesSectionProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (!articles.length) {
    return null;
  }

  return (
    <section
      id="articles"
      className="pb-2 transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-2 md:gap-6 px-2 sm:px-4 md:px-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
            >
              <Link
                href={`/${locale}/articles/${article.slug}`}
                className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/20 via-primary to-primary/20" />
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col h-full">
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] sm:text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-medium text-primary">
                      <Tag size={11} aria-hidden="true" />
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">
                      <CalendarDays size={11} aria-hidden="true" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">
                      <Clock3 size={11} aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-semibold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-1.5 text-primary font-medium">
                    {isRtl ? "إكتشف المزيد" : "Explore this article"}
                    <ArrowIcon size={16} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
