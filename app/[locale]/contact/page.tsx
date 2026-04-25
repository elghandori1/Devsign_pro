import type { Metadata } from "next";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import ContactClient from "../../components/ContactClient";
import infos from "@/app/dictionaries/global.json";

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
      ? "Contact Us. Let's Build Something Amazing | Devsign"
      : locale === "ar"
        ? "اتصل بنا. لنبنِ شيئاً مذهلاً معاً | ديفساين"
        : "Contactez-nous. Créons Quelque Chose d'Incroyable | Devsign";

  const description =
    locale === "en"
      ? "Ready to bring your digital vision to life? Get in touch for websites, automation, AI integration, and creative design. Based in Morocco, serving worldwide."
      : locale === "ar"
        ? "مستعد لتحويل رؤيتك الرقمية إلى واقع؟ تواصل للحصول على مواقع ويب، أتمتة، دمج ذكاء اصطناعي، وتصميم إبداعي. من المغرب، نخدم العالم."
        : "Prêt à concrétiser votre vision numérique ? Contactez-moi pour sites web, automatisation, intégration IA et design créatif. Basé au Maroc, servant le monde entier.";

  const keywords =
    locale === "en"
      ? ["contact", "hire web developer", "Morocco", "freelance", "web design", "automation"]
      : locale === "ar"
        ? ["اتصل", "مطور ويب", "المغرب", "تصميم", "أتمتة"]
        : ["contact", "développeur web", "Maroc", "design", "automatisation"];

  return buildPageMetadata({
    locale,
    title,
    description,
    route: "/contact",
    keywords,
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

  const title =
    locale === "en"
      ? "Contact Us | Let's Build Something Amazing — Devsign"
      : locale === "ar"
        ? "اتصل بنا | لنبنِ شيئاً مذهلاً معاً — ديفساين"
        : "Contactez-nous | Créons Quelque Chose d'Incroyable — Devsign";

  const description =
    locale === "en"
      ? "Ready to bring your digital vision to life? Get in touch for websites, automation, AI integration, and creative design. Based in Morocco, serving worldwide."
      : locale === "ar"
        ? "مستعد لتحويل رؤيتك الرقمية إلى واقع؟ تواصل للحصول على مواقع ويب، أتمتة، دمج ذكاء اصطناعي، وتصميم إبداعي. من المغرب، نخدم العالم."
        : "Prêt à concrétiser votre vision numérique ? Contactez-moi pour sites web, automatisation, intégration IA et design créatif. Basé au Maroc, servant le monde entier.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/${locale}/contact#webpage`,
    url: `${baseUrl}/${locale}/contact`,
    name: title,
    description: description,
    inLanguage: locale,
    isPartOf: { "@id": `${baseUrl}/#website` },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: EMAIL,
      telephone: WHATSAPP_NUMBER,
      availableLanguage: [
        { "@type": "Language", name: "English" },
        { "@type": "Language", name: "French" },
        { "@type": "Language", name: "Arabic" },
      ],
      areaServed: [
        { "@type": "Country", name: "Morocco" },
        { "@type": "Place", name: "Worldwide" }
      ]
    },
  };

    const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient 
        data={t} 
        locale={locale} 
        isRtl={isRtl}
        email={EMAIL}
        whatsappNumber={WHATSAPP_NUMBER}
        instagramHandle={INSTAGRAM_HANDLE}
        githubHandle={GITHUB_HANDLE}
        githubLink={GITHUB_LINK}
        linkedinHandle={LINKEDIN_HANDLE}
      />
    </>
  );
}