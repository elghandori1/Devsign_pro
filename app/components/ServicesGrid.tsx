import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Locale } from "@/i18n-config";

interface ServiceItem {
  title: string;
  description: string;
  link: string;
}

interface Services {
  sectionLabel: string;
  heading: string;
  highlight: string;
  viewAll: string;
  cta: string;
  web: ServiceItem;
  systems: ServiceItem;
  design: ServiceItem;
}

interface ServicesGridProps {
  t: {
    services: Services;
  };
  locale: Locale;
}

interface ServiceCard extends ServiceItem {
  image: string;
}

export default function ServicesGrid({ t, locale }: ServicesGridProps) {
  const data = t.services;

  const services: ServiceCard[] = [
    {
      ...data.web,
      image:
        "/images/services/secure-seo-optimized-website-development-responsive-design-business-growth.jpeg",
    },
    {
      ...data.systems,
      image:
        "/images/services/business-automation-ai-powered-systems-workflow-analytics-dashboard.jpeg",
    },
    {
      ...data.design,
      image:
        "/images/services/social-media-marketing-advertising-dashboard-design.jpeg",
    },
  ];

  return (
    <section
      className="px-4 sm:px-6 py-8 sm:py-10 fade-in-section"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div
            className={`max-w-2xl lg:${locale === "ar" ? "text-right" : "text-left"}`}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]">
              {data.heading}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mt-2">
                {data.highlight}
              </span>
            </h3>
          </div>

          <Link
            href={`/${locale}/services`}
            className="hidden lg:inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-md shadow-primary/20"
          >
            {data.viewAll}
          </Link>
        </div>

        {/* Services Cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 fade-in-section">
          {services.map((service) => (
            <article
              key={service.link}
              className="group flex flex-col h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20"
            >
              <Link
                href={`/${locale}${service.link}`}
                className="flex flex-col h-full"
              >
                {/* Service Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow p-6 sm:p-8 relative z-10">
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h4>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 flex-grow">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-auto">
                    {data.cta}
                    {locale === "ar" ? (
                      <ArrowLeft
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-x-1.5"
                      />
                    ) : (
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    )}
                  </span>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            </article>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href={`/${locale}/services`}
            className="px-8 py-3.5 text-sm bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:opacity-90 shadow-md shadow-primary/20"
          >
            {data.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
