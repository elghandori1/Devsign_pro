import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import type { Locale } from "@/i18n-config";
import { i18n, localeToBcp47 } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { FAQPageSchema } from "@/app/components/schemas";
import FAQSection from "@/app/components/FAQSection";
import ContactForm from "@/app/components/ContactForm";
import infos from "@/app/dictionaries/global.json";

type Props = { params: Promise<{ locale: string }> };

type ContactFaq = { question: string; answer: string };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  const seo = dict.pages.contact_page.seo as {
    title: string;
    description: string;
    keywords: string[];
  };

  return buildPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    route: "/contact",
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
  const t = dict.pages.contact_page;
  const baseUrl = getBaseUrl();
  const email = infos.email_personal || "";
  const whatsapp = infos.whatsappLink || "";
  const faqs = t.faq.items as ContactFaq[];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/${locale}/contact#webpage`,
    url: `${baseUrl}/${locale}/contact`,
    name: t.seo.title,
    description: t.seo.description,
    inLanguage: localeToBcp47(locale),
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#person` },
    mainEntity: {
      "@type": "ContactPoint",
      "@id": `${baseUrl}/${locale}/contact#contactpoint`,
      contactType: "sales",
      email,
      telephone: infos.phoneNumber || "",
      areaServed: [
        { "@type": "Country", name: "France" },
        { "@type": "Place", name: "Europe" },
        { "@type": "Place", name: "Worldwide" },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fr" ? "Accueil" : "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${baseUrl}/${locale}/contact`,
      },
    ],
  };

  const benefitIcons = [Clock3, ShieldCheck, Sparkles] as const;
  const processIcons = [MessageCircle, CheckCircle2, ArrowRight] as const;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <FAQPageSchema faqs={faqs} />

      <section className="relative overflow-hidden border-b border-border hero-section-light" aria-labelledby="contact-heading">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_74%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:py-24">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {t.form.availability}
          </p>
          <h1 id="contact-heading" className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.description}
          </p>
          <a href="#quote-form" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:brightness-110">
            {t.heroCta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>

          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3" aria-label={t.benefitsLabel}>
            {t.quickResponses.items.map((item: string, index: number) => {
              const Icon = benefitIcons[index % benefitIcons.length];
              return (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-3 text-sm font-medium">
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20" aria-labelledby="contact-form-section-heading">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{t.formEyebrow}</p>
            <h2 id="contact-form-section-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{t.subtitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.formIntro}</p>

            <div className="mt-7 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h3 className="font-bold">{t.beforeContact.title}</h3>
              <ul className="mt-4 space-y-4">
                {t.beforeContact.items.map((item: { title: string; text: string }) => (
                  <li key={item.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Link href={`mailto:${email}`} className="flex min-h-14 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition hover:border-primary/35">
                <Mail className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span><span className="block text-sm font-semibold">{t.email}</span><span className="block text-xs text-muted-foreground">{t.channels.emailDescription}</span></span>
              </Link>
              <Link href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition hover:border-primary/35">
                <BsWhatsapp className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span><span className="block text-sm font-semibold">{t.whatsapp}</span><span className="block text-xs text-muted-foreground">{t.channels.whatsappDescription}</span></span>
              </Link>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {t.location}
            </p>
          </div>

          <div id="quote-form" className="min-w-0 scroll-mt-24">
            <ContactForm formData={t.form} sendMessage={t.sendMessage} orWrite={t.orWrite} email={email} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-primary/5" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <header className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{t.process.eyebrow}</p>
            <h2 id="process-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{t.process.title}</h2>
          </header>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {t.process.steps.map((step: { title: string; text: string }, index: number) => {
              const Icon = processIcons[index % processIcons.length];
              return (
                <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                    <span className="text-xs font-bold text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="contact-faq-heading">
        <header className="mb-9 text-center">
          <h2 id="contact-faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">{t.faq.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t.faq.description}</p>
        </header>
        <FAQSection faqs={faqs} locale={locale} />
      </section>
    </main>
  );
}
