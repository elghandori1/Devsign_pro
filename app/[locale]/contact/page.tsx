import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { MapPin, ArrowRight, MessageCircle, Calendar, Headphones } from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import getTrans from "@/app/lib/translation";
import { getBaseUrl, buildPageMetadata } from "@/app/lib/seo";

const CONTACT_IMAGE = "/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg";

type Props = { params: Promise<{ locale: string }> };

const EMAIL = "contact@devsign.com";
const WHATSAPP_NUMBER = "212XXXXXXXXX";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const baseUrl = getBaseUrl();

  const title =
    locale === "en"
      ? "Contact Us | Get in Touch — Devsign"
      : locale === "ar"
        ? "اتصل بنا | تواصل معنا — ديفساين"
        : "Contactez-nous | Nous contacter — Devsign";

  const description =
    locale === "en"
      ? "Get in touch for your website, automation, AI integration, or ad design project. Based in Morocco, serving startups and SMBs worldwide."
      : locale === "ar"
        ? "تواصل من أجل موقعك أو أتمتة أو دمج ذكاء اصطناعي أو تصميم إعلانات. من المغرب، نخدم الشركات الناشئة والمتوسطة."
        : "Contactez-moi pour votre site, automatisation, intégration IA ou design. Au Maroc, au service des startups et PME.";

  const keywords =
    locale === "en"
      ? ["contact", "hire web developer", "Morocco", "freelance"]
      : locale === "ar"
        ? ["اتصل", "مطور ويب", "المغرب"]
        : ["contact", "développeur web", "Maroc"];

  return buildPageMetadata({
    locale,
    baseUrl,
    title,
    description,
    path: "/contact",
    keywords,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getTrans(locale);
  const t = dict.pages?.contact;
  const isRtl = locale === "ar";
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

  if (!t) return null;

  const channels = [
    {
      label: t.email,
      href: `mailto:${EMAIL}`,
      icon: MdEmail,
      className: "hover:bg-primary hover:text-primary-foreground hover:border-primary",
    },
    {
      label: t.whatsapp,
      href: waLink,
      icon: BsWhatsapp,
      className: "hover:bg-green-500 hover:text-white hover:border-green-500",
    },
    {
      label: t.facebook,
      href: "https://www.facebook.com/yourpage",
      icon: FaFacebookF,
      className: "hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            {t.subtitle}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t.heading}
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
            {channels.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`
                    inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-border
                    bg-card text-foreground font-medium transition-all duration-300
                    hover:scale-[1.02] active:scale-95
                    ${item.className}
                  `}
                >
                  <Icon size={22} className="flex-shrink-0" aria-hidden />
                  <span>{item.label}</span>
                  <ArrowRight
                    size={16}
                    className={isRtl ? "rotate-180" : ""}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">{t.orWrite}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-primary font-medium hover:underline inline-flex items-center gap-2"
            >
              {EMAIL}
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden />
            <span>{t.location}</span>
          </div>

          {/* Why Reach Out */}
          {t.whyReachOut?.reasons?.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {t.whyReachOut.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {t.whyReachOut.reasons.map(
                  (r: { title: string; text: string }, i: number) => {
                    const icons = [MessageCircle, Calendar, Headphones];
                    const Icon = icons[i % icons.length];
                    return (
                      <div
                        key={r.title}
                        className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors text-center"
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-5 h-5 text-primary" aria-hidden />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {r.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {r.text}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="relative aspect-[21/9] max-w-2xl mx-auto rounded-2xl overflow-hidden border border-border bg-card">
                <Image
                  src={CONTACT_IMAGE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
