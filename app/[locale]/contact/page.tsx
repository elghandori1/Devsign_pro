import type { Metadata } from "next";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { FAQPageSchema } from "@/app/components/schemas";
import ContactForm from "@/app/components/ContactForm";
import infos from "@/app/dictionaries/global.json";

import {
  ArrowRight,
  MapPin,
  Mail,
  Clock,
  Coffee,
  Sparkles,
  Globe,
  Heart,
  MessageCircle,
  Calendar,
  Headphones,
} from "lucide-react";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Github } from "lucide-react";
import FAQSection from "@/app/components/FAQSection";

type Props = { params: Promise<{ locale: string }> };

const EMAIL = infos.email_personal || "";
const WHATSAPP_NUMBER = infos.whatsappLink || "";
const INSTAGRAM_HANDLE = infos.social.instagram || "@devsign_pro";
const GITHUB_HANDLE = infos.githubHandle || "";
const GITHUB_LINK = infos.social.github || "";
const LINKEDIN_HANDLE = infos.social.linkedin || "";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const title =
    locale === "en"
      ? "Contact Mohammed Elghandori | Next.js & SEO Expert"
      : locale === "ar"
        ? "تواصل مع محمد الغنضوري | مطور Next.js وخبير SEO"
        : "Contact Mohammed Elghandori | Dev Next.js & SEO";

  const description =
    locale === "en"
      ? "Contact Mohammed Elghandori, a Full-Stack Web Developer in Morocco. Hire me for Next.js dashboards, corporate sites, and Technical SEO."
      : locale === "ar"
        ? "تواصل مع محمد الغنضوري، مطور ويب Full-Stack في المغرب. متاح لمشاريع Next.js، المواقع المؤسسية، ولوحات التحكم والـ SEO التقني."
        : "Contactez Mohammed Elghandori, développeur Full-Stack au Maroc. Disponible pour vos projets Next.js, sites corporate et SEO technique.";

  const keywords =
    locale === "en"
      ? [
          "contact web developer Morocco",
          "hire Next.js developer",
          "Technical SEO expert",
          "freelance dashboard developer",
          "hire full-stack engineer",
        ]
      : locale === "ar"
        ? [
            "تواصل مطور ويب المغرب",
            "توظيف مطور Next.js",
            "خبير SEO تقني",
            "مطور لوحات تحكم",
            "مهندس برمجيات مستقل",
          ]
        : [
            "contact développeur web Maroc",
            "embaucher développeur Next.js",
            "expert SEO technique",
            "développeur freelance",
            "ingénieur full-stack",
          ];

  return buildPageMetadata({
    locale,
    title,
    description,
    route: "/contact",
    keywords,
    ogImagePath: "/cover/Designpro-cover.jpg",
    type: "website",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.pages?.contact_page;
  const isRtl = locale === "ar";
  if (!t) return null;

  const baseUrl = getBaseUrl();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/${locale}/contact#webpage`,
    url: `${baseUrl}/${locale}/contact`,
    name:
      locale === "en"
        ? "Contact | Freelance Web Developer & SEO Specialist in Morocco"
        : locale === "ar"
          ? "تواصل | مطور ويب مستقل وخبير SEO في المغرب"
          : "Contact | Développeur Web Freelance & Spécialiste SEO au Maroc",
    description: t.description,
    inLanguage: locale === "en" ? "en-US" : locale === "ar" ? "ar-MA" : "fr-MA",
    isPartOf: { "@id": `${baseUrl}/#website` },
    publisher: { "@id": `${baseUrl}/#person` },
    about: { "@id": `${baseUrl}/#person` },
    mainEntity: {
      "@type": "ContactPoint",
      "@id": `${baseUrl}/${locale}/contact#contactpoint`,
      contactType: "sales",
      email: EMAIL,
      telephone: infos.phoneNumber || "",
      availableLanguage: [
        { "@type": "Language", name: "English" },
        { "@type": "Language", name: "French" },
        { "@type": "Language", name: "Arabic" },
      ],
      areaServed: [
        { "@type": "Country", name: "Morocco" },
        { "@type": "Place", name: "Worldwide" },
      ],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
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
          locale === "en" ? "Home" : locale === "ar" ? "الرئيسية" : "Accueil",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          locale === "en" ? "Contact" : locale === "ar" ? "تواصل" : "Contact",
        item: `${baseUrl}/${locale}/contact`,
      },
    ],
  };
  const faqs = [
    {
      question:
        locale === "en"
          ? "Do you work with international clients or only in Morocco?"
          : locale === "ar"
            ? "هل تعمل مع عملاء دوليين أم فقط في المغرب؟"
            : "Travaillez-vous avec des clients internationaux ou uniquement au Maroc ?",
      answer:
        locale === "en"
          ? "While I'm based in Morocco, I work with startups and enterprises globally. My web applications are built with international SEO, multilingual support, and global performance standards—ready to serve users anywhere in the world."
          : locale === "ar"
            ? "على الرغم من أنني مقيم في المغرب، إلا أنني أعمل مع الشركات الناشئة والمؤسسات على مستوى العالم. يتم بناء تطبيقات الويب الخاصة بي مع مراعاة الـ SEO الدولي، ودعم اللغات المتعددة، ومعايير الأداء العالمية لتخدمة المستخدمين في أي مكان."
            : "Bien que basé au Maroc, je collabore avec des startups et des entreprises à l'international. Mes applications web sont conçues avec un SEO international, un support multilingue et des standards de performance mondiaux.",
    },
    {
      question:
        locale === "en"
          ? "Can you work with startups, enterprises, or development teams on technical SEO and web development?"
          : locale === "ar"
            ? "هل يمكنك العمل مع الشركات الناشئة أو المؤسسات أو فرق التطوير في تحسين محركات البحث التقني وتطوير الويب؟"
            : "Pouvez-vous travailler avec des startups, des entreprises ou des équipes de développement sur le SEO technique et le développement web ?",
      answer:
        locale === "en"
          ? "Yes. I can integrate with product, marketing, or development teams, or work independently. I do not only build applications; I also implement technical SEO: metadata, canonical tags, robots.txt, XML sitemaps, structured data / Schema.org, hreflang, semantic architecture, internal linking, performance, Core Web Vitals, and AI-ready structured content. This helps startups and enterprises improve visibility in search engines and AI engines while keeping the product fast, scalable, and maintainable."
          : locale === "ar"
            ? "نعم. يمكنني الاندماج مع فرق المنتج أو التسويق أو التطوير، أو العمل بشكل مستقل. أنا لا أكتفي ببناء التطبيقات فقط، بل أقوم أيضاً بتنفيذ تحسين محركات البحث التقني: البيانات الوصفية، وعلامات canonical، وملف robots.txt، وخرائط الموقع XML، والبيانات المنظمة / Schema.org، وhreflang، والبنية الدلالية، والربط الداخلي، والأداء، وCore Web Vitals، والمحتوى المنظم الجاهز لمحركات الذكاء الاصطناعي. هذا يساعد الشركات الناشئة والمؤسسات على تحسين الظهور في محركات البحث ومحركات الذكاء الاصطناعي مع الحفاظ على منتج سريع وقابل للتوسع وسهل الصيانة."
            : "Oui. Je peux intégrer une équipe produit, marketing ou développement, ou travailler en autonomie. Je ne fais pas que développer des applications : j'applique aussi le SEO technique : métadonnées, balises canonical, fichier robots.txt, sitemaps XML, données structurées / Schema.org, hreflang, architecture sémantique, maillage interne, performance, Core Web Vitals et contenu structuré prêt pour les moteurs IA. Cela aide les startups et les entreprises à améliorer leur visibilité sur les moteurs de recherche et les moteurs IA tout en gardant un produit rapide, évolutif et maintenable.",
    },
    {
      question:
        locale === "en"
          ? "Do you provide ongoing support after project delivery?"
          : locale === "ar"
            ? "هل تقدم دعماً مستمراً بعد تسليم المشروع؟"
            : "Fournissez-vous un support continu après la livraison ?",
      answer:
        locale === "en"
          ? "Yes. I offer monthly maintenance retainers that include performance monitoring, security updates, Technical SEO health checks, and AI citation tracking. This ensures your digital product stays fast, secure, and visible as search algorithms evolve."
          : locale === "ar"
            ? "نعم. أقدم خطط صيانة شهرية تشمل مراقبة الأداء، وتحديثات الأمان، وفحوصات صحة الـ SEO التقني، وتتبع الاستشهادات في محركات الذكاء الاصطناعي. هذا يضمن بقاء منتجك الرقمي سريعاً، آمناً، ومتصدراً لنتائج البحث."
            : "Oui. Je propose des forfaits de maintenance mensuels incluant le monitoring des performances, les mises à jour de sécurité, les audits SEO technique et le suivi des citations IA. Cela garantit que votre produit reste rapide, sécurisé et visible.",
    },
  ];
  const channels = [
    {
      label: t.email,
      href: `mailto:${EMAIL}`,
      icon: MdEmail,
      description: t.channels.emailDescription,
    },
    {
      label: t.whatsapp,
      href: WHATSAPP_NUMBER,
      icon: BsWhatsapp,
      description: t.channels.whatsappDescription,
    },
    {
      label: t.instagram,
      href: INSTAGRAM_HANDLE,
      icon: BsInstagram,
      description: t.channels.instagramDescription,
    },
    {
      label: t.linkedin,
      href: LINKEDIN_HANDLE,
      icon: BsLinkedin,
      description: t.channels.linkedinDescription,
    },
  ];

  const quickResponses = [
    { icon: Clock, text: t.quickResponses.response24h },
    { icon: Coffee, text: t.quickResponses.freeConsultation },
    { icon: Sparkles, text: t.quickResponses.noObligation },
    { icon: Globe, text: t.quickResponses.worldwide },
  ];

  const WHY_ICONS = [MessageCircle, Calendar, Headphones];
  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQPageSchema faqs={faqs} />
      <section
        className="relative overflow-hidden hero-section-light border-b border-border"
        aria-labelledby="contact-hero-heading"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-12 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
              aria-hidden="true"
            />
            {t.form.availability}
          </div>

          <h1
            id="contact-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-5xl leading-[1.15]"
            itemProp="headline"
          >
            {t.heading}
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed"
            itemProp="description"
          >
            {t.description}
          </p>

          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
            role="list"
            aria-label="Quick benefits"
          >
            {quickResponses.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-card rounded-full border border-border"
                role="listitem"
              >
                <item.icon
                  size={13}
                  className="text-primary shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10 sm:mb-14">
          {t.subtitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* ── LEFT: Channels + Location ── */}
          <div className="flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground">
              <Mail
                size={18}
                className="text-primary shrink-0"
                aria-hidden="true"
              />
              {t.chooseWay}
            </h3>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group relative flex flex-col p-4 sm:p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                    itemScope
                    itemType="https://schema.org/ContactPoint"
                  >
                    <meta itemProp="contactType" content={channel.label} />
                    <div
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground mb-0.5 leading-tight">
                      {channel.label}
                    </span>
                    <span className="text-xs text-muted-foreground mb-3 leading-relaxed flex-1">
                      {channel.description}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium text-primary ${
                        isRtl ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span>{t.getInTouch}</span>
                      <ArrowRight
                        size={11}
                        className={`transition-transform duration-200 group-hover:translate-x-1 ${
                          isRtl ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Location + GitHub strip */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <MapPin
                  size={16}
                  className="text-primary shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-foreground truncate">
                  {t.location}
                </span>
              </div>
              <div
                className="w-px h-4 bg-border hidden xs:block shrink-0"
                aria-hidden="true"
              />
              <a
                href={GITHUB_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 flex-1 min-w-0 group"
              >
                <Github
                  size={16}
                  className="text-primary shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  @{GITHUB_HANDLE}
                </span>
              </a>
            </div>
          </div>

          <ContactForm
            formData={t.form}
            sendMessage={t.sendMessage}
            orWrite={t.orWrite}
            email={EMAIL}
            locale={locale}
          />
        </div>
      </section>

      {t.whyReachOut?.reasons?.length ? (
        <section
          className="border-t border-border"
          aria-labelledby="why-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <header className="text-center mb-10 sm:mb-14">
              <h2
                id="why-heading"
                className="inline-flex items-center justify-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 flex-wrap"
              >
                <Heart
                  size={22}
                  className="text-primary shrink-0"
                  aria-hidden="true"
                />
                {t.whyReachOut.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.whyReachOut.subtitle}
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {(t.whyReachOut.reasons as { title: string; text: string }[]).map(
                (reason, index) => {
                const Icon = WHY_ICONS[index % WHY_ICONS.length];
                return (
                  <article
                    key={reason.title}
                    className="group relative p-5 sm:p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors">
                        <Icon
                          className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {reason.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="border-t border-border bg-primary/5"
        aria-labelledby="contact-faq-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <header className="text-center mb-10 sm:mb-14">
            <h2
              id="contact-faq-heading"
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              {locale === "en"
                ? "Project & Technical SEO FAQ"
                : locale === "ar"
                  ? "الأسئلة الشائعة حول المشاريع وSEO التقني"
                  : "FAQ Projets & SEO technique"}
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto">
              {locale === "en"
                ? "Everything you need to know about working with startups, enterprises, and development teams — including technical SEO, metadata, schema, performance, and ongoing support."
                : locale === "ar"
                  ? "كل ما تحتاج معرفته حول العمل مع الشركات الناشئة والمؤسسات وفرق التطوير — بما في ذلك SEO التقني، والبيانات الوصفية، وSchema، والأداء، والدعم المستمر."
                  : "Tout ce que vous devez savoir sur la collaboration avec les startups, les entreprises et les équipes de développement — SEO technique, métadonnées, schema, performance et support continu."}
            </p>
          </header>

          <FAQSection faqs={faqs} locale={locale} />
        </div>
      </section>
    </main>
  );
}
