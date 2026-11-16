import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import ServiceDetailLanding, {
  type ServiceLandingContent,
} from "@/app/components/ServiceDetailLanding";
import { i18n, localeToBcp47, type Locale } from "@/i18n-config";

type Props = { params: Promise<{ locale: string }> };
type Landing = ServiceLandingContent & {
  seo: { title: string; description: string; keywords: string[] };
};
const PAGE_UPDATED = "2026-11-16";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

function resolveLocale(rawLocale: string): Locale {
  return i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const service = dict.pages.services_page.services.ecommerce_development;
  const landing = service.landing as Landing;
  return buildPageMetadata({
    locale,
    title: landing.seo.title,
    description: landing.seo.description,
    keywords: landing.seo.keywords,
    route: "/services/ecommerce-development",
    ogImagePath: service.image,
    type: "website",
  });
}

export default async function EcommerceDevelopmentPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = await getDictionary(locale);
  const service = dict.pages.services_page.services.ecommerce_development;
  const landing = service.landing as Landing;
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/services/ecommerce-development`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: landing.seo.title,
        description: landing.seo.description,
        inLanguage: localeToBcp47(locale),
        dateModified: PAGE_UPDATED,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: landing.hero.heading,
        description: landing.seo.description,
        serviceType:
          locale === "fr"
            ? "Création et refonte de boutique en ligne"
            : "Online store design and development",
        url: pageUrl,
        image: `${baseUrl}${service.image}`,
        provider: { "@id": `${baseUrl}/#person` },
        areaServed:
          locale === "fr"
            ? [
                { "@type": "Country", name: "France" },
                { "@type": "Place", name: "Europe" },
              ]
            : { "@type": "Place", name: "Worldwide" },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          url: pageUrl,
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 2500,
            priceCurrency: "EUR",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: landing.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: landing.breadcrumb.home,
            item: `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: landing.breadcrumb.services,
            item: `${baseUrl}/${locale}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: landing.breadcrumb.current,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <ServiceDetailLanding
      locale={locale}
      image={service.image}
      schema={schema}
      landing={landing}
      headingId="ecommerce-development-heading"
      scopeId="ecommerce-scope"
    />
  );
}
