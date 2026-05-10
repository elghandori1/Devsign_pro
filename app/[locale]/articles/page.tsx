import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowLeft,
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	Clock3,
	Code2,
	Globe2,
	Sparkles,
	Tag,
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: string }> };

type ArticleTopic = {
	title: string;
	text: string;
};

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
	highlights: string[];
};

type ArticlesPageData = {

	subtitle: string;
	heading: string;
	description: string;
    categoryChips: string[];
	intro?: string;
	sectionLabel: string;
	articlesLabel: string;
	topics: ArticleTopic[];
	articles: ArticleEntry[];
	cta: {
		title: string;
		description: string;
		button: string;
	};
};

const FALLBACK_KEYWORDS: Record<Locale, string[]> = {
	en: [
		"web development articles Morocco",
		"SEO blog Morocco",
		"business automation insights",
		"working online in Morocco",
		"tech and business blog",
	],
	fr: [
		"articles développement web Maroc",
		"blog SEO Maroc",
		"automatisation business",
		"travailler en ligne Maroc",
		"blog tech et business",
	],
	ar: [
		"مقالات تطوير الويب المغرب",
		"مدونة SEO المغرب",
		"رؤى أتمتة الأعمال",
		"العمل عبر الإنترنت في المغرب",
		"مدونة تقنية وأعمال",
	],
};

const TOPIC_ICONS = [Code2, BriefcaseBusiness, Globe2] as const;

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

	const title =
	
		(locale === "en"
			? "Articles on Web Development, SEO & Business Automation | Devsign"
			: locale === "ar"
				? "مقالات حول تطوير الويب و SEO وأتمتة الأعمال | Devsign"
				: "Articles sur le développement web, le SEO et l'automatisation | Devsign");

	const description =
	
		(locale === "en"
			? "Practical articles and insights about tech, business systems, SEO, and working online."
			: locale === "ar"
				? "مقالات عملية ورؤى حول التقنية، أنظمة الأعمال، تحسين محركات البحث والعمل عبر الإنترنت."
				: "Des articles pratiques sur la tech, les systèmes d'entreprise, le SEO et le travail en ligne.");

	return buildPageMetadata({
		locale,
		title,
		description,
		route: "/articles",
		keywords: FALLBACK_KEYWORDS[locale],
	});
}

export default async function ArticlesPage({ params }: Props) {
	const { locale: rawLocale } = await params;
	const locale: Locale = i18n.locales.includes(rawLocale as Locale)
		? (rawLocale as Locale)
		: i18n.defaultLocale;

	const dict = await getDictionary(locale);
	const data = (dict.pages as { articles_page?: ArticlesPageData } | undefined)
		?.articles_page;

	if (!data) return null;

	const isRtl = locale === "ar";
	const Arr = isRtl ? ArrowLeft : ArrowRight ;

	const topics = data.topics ?? [];
	const articles = data.articles ?? [];
    const categoryChips = data.categoryChips ?? [];

	const schema = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${getBaseUrl()}/${locale}/articles#page`,
				url: `${getBaseUrl()}/${locale}/articles`,
				name: data.heading,
				description: data.description,
				inLanguage: locale,
			},
			{
				"@type": "ItemList",
				"@id": `${getBaseUrl()}/${locale}/articles#list`,
				itemListElement: articles.map((article: ArticleEntry, index: number) => ({
					"@type": "ListItem",
					position: index + 1,
					item: {
						"@type": "BlogPosting",
						headline: article.title,
						description: article.excerpt,
						articleSection: article.category,
						datePublished: article.published,
						inLanguage: locale,
						author: {
							"@type": "Person",
							name: "Mohammed Elghandori",
						},
						publisher: {
							"@type": "Organization",
							name: "Devsign",
							url: "https://devsign.ma",
						},
						url: `${getBaseUrl()}/${locale}/articles/${article.slug}`,
					},
				})),
			},
		],
	};

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
				name: data.heading,
				item: `${getBaseUrl()}/${locale}/articles`,
			},
		],
	};

	const heroTopics = topics.slice(0, 3);

	return (
		<main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			<section
				aria-labelledby="hero-heading"
				className="relative overflow-hidden hero-section-light border-b border-border"
			>
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage:
							"linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>
				<div className="absolute -top-32 -left-32 w-125 h-125 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute -bottom-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

				<div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
					<div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Sparkles size={13} aria-hidden="true" />
						{data.subtitle}
					</div>

					<h1
						id="hero-heading"
						className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-5 max-w-4xl"
					>
						{data.heading}
					</h1>

					<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-5">
						{data.description}
					</p>


					{categoryChips.length > 0 ? (
						<div className="flex flex-wrap gap-2 mb-8">
							{categoryChips.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium border border-primary/20"
								>
									<Tag size={12} aria-hidden="true" />
									{tag}
								</span>
							))}
						</div>
					) : null}

					<div className="flex flex-wrap gap-3 sm:gap-4">
						<Link
							href={`/${locale}/contact`}
							className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
						>
							{data.cta.button}
							<Arr size={16} aria-hidden="true" />
						</Link>
						<a
							href="#articles"
							className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
						>
							{locale === "ar" ? "تصفح المقالات" : locale === "fr" ? "Explorer les articles" : "Browse articles"}
						</a>
					</div>
				</div>
			</section>

			<section
				aria-labelledby="topics-heading"
				className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20"
			>
				<div className="text-center mb-10 sm:mb-14">
					<h2 id="topics-heading" className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-3">
						<Code2 className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
						{data.sectionLabel}
					</h2>
				</div>

				<div className="grid gap-5 sm:gap-6 md:grid-cols-3">
					{heroTopics.map((topic: ArticleTopic, index: number) => {
						const TopicIcon = TOPIC_ICONS[index] ?? Code2;

						return (
							<article
								key={topic.title}
								className="group relative rounded-3xl border border-border bg-card p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
							>
								<div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/20 via-primary to-primary/20" />
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-5">
									<TopicIcon size={22} aria-hidden="true" />
								</div>
								<h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
								<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
									{topic.text}
								</p>
							</article>
						);
					})}
				</div>
			</section>

			<section
				id="articles"
				aria-labelledby="articles-heading"
				className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20"
			>
				<div className="flex flex-col gap-3 sm:gap-4 mb-10 sm:mb-14 text-center">
					<h2 id="articles-heading" className="text-2xl sm:text-3xl font-bold">
						{data.articlesLabel}
					</h2>
					<p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
						{locale === "ar"
							? "ملاحظات عملية ودراسات قصيرة أشارك فيها ما أتعلمه من المشاريع، الأتمتة، والنمو الرقمي."
							: locale === "fr"
								? "Des notes pratiques et des analyses courtes tirées de projets, d'automatisation et de croissance digitale."
								: "Practical notes and short breakdowns from client work, automation, and digital growth."}
					</p>
				</div>

				<div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
					{articles.map((article: ArticleEntry) => (
						<article
							key={article.href ?? article.slug}
							id={article.slug}
							className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
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
										sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, (max-width: 1535px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
										loading="lazy"
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

									<h3 className="text-lg sm:text-xl font-semibold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
										{article.title}
									</h3>

									<p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
										{article.excerpt}
									</p>

									<div className="space-y-2 mb-4">
										{article.highlights.slice(0, 2).map((highlight: string) => (
											<div key={highlight} className="flex items-start gap-2.5 text-sm text-foreground/85">
												<span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
												<span className="line-clamp-2">{highlight}</span>
											</div>
										))}
									</div>
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                                            {locale === "ar" ? "إكتشف المزيد" : locale === "fr" ? "Découvrir cet article" : "Explore This Articles"}
							<Arr size={16} aria-hidden="true" />
                                        </span>
                                    </div>
								</div>
							</Link>
						</article>
					))}
				</div>
			</section>

			<section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
				<div className="relative overflow-hidden rounded-4xl border border-border bg-card p-7 sm:p-10 lg:p-12">
					<div className="absolute -top-24 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
					<div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-3xl">
							<p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
								<Sparkles size={13} aria-hidden="true" />
								{data.cta.title}
							</p>
							<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
								{data.cta.title}
							</h2>
							<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
								{data.cta.description}
							</p>
						</div>

						<Link
							href={`/${locale}/contact`}
							className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
						>
							{data.cta.button}
							<Arr size={16} aria-hidden="true" />
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
