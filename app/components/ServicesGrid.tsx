// components/ServicesGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n-config";

interface SectionData {
  sectionLabel: string;
  heading: string;
  viewAll: string;
  cta: string;
}

interface ServiceItem {
  image: string;
  title: string;
  title_card: string;
  description: string;
  link: string;
  features: string[];
}

interface ServicesGridProps {
  sectionData: SectionData;
  servicesData: Record<string, ServiceItem>;
  locale: Locale;
}

export default function ServicesGrid({
  sectionData,
  servicesData,
  locale,
}: ServicesGridProps) {
  const servicesList = Object.values(servicesData).slice(0, 3);
  const isRtl = locale === "ar";

  return (
    <div
      className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 sm:pt-4 fade-in-section"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── GEO/AEO Paragraph ── */}
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed mb-12 sm:mb-14">
          {sectionData.heading}
        </p>

        {/* ── 3 Main Service Cards ── */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 fade-in-section">
          {servicesList.map((service, idx) => {
            return (
              <article
                key={service.link}
                className="group flex flex-col h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20"
              >
                <Link
                  href={`/${locale}${service.link}`}
                  className="flex flex-col h-full relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
                  aria-label={`${
                    isRtl
                      ? "تعرف على"
                      : locale === "fr"
                        ? "En savoir plus sur"
                        : "Learn more about"
                  } ${service.title}`}
                >
                  {/* Service Image */}
                  <div className="relative w-full aspect-16/10 overflow-hidden bg-linear-to-br from-muted to-muted/80">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-col grow p-6 sm:p-8">
                    <div className="mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {service.title_card}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 grow line-clamp-3">
                      {service.description}
                    </p>

                    <ul className="flex flex-wrap gap-2 mb-4 lg:mb-6 list-none p-0 m-0">
                      {service.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/5 text-primary border border-primary/20 group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-300"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:text-primary/80 transition-colors duration-300 w-fit">
                      {sectionData.cta}
                      <svg
                        className={`w-4 h-4 shrink-0 arrow-signal ${isRtl ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 6l6 6-6 6M5 12h14"
                        />
                      </svg>
                    </span>
                  </div>

                  <div
                    className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary/40 via-primary to-primary/40 scale-x-0 group-hover:scale-x-100 duration-500 origin-left rounded-b-full"
                    style={{
                      transitionProperty: "transform",
                      transitionTimingFunction: "ease-out",
                    }}
                    aria-hidden="true"
                  />

                  <div
                    className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none"
                    aria-hidden="true"
                  >
                    <div
                      className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-primary/15 to-transparent rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 duration-300"
                      style={{
                        transitionProperty: "transform",
                        transitionTimingFunction: "ease-out",
                      }}
                    />
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* ── View All Services Button ── */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-md shadow-primary/20"
            aria-label={sectionData.viewAll}
          >
            {sectionData.viewAll}
          </Link>
        </div>
      </div>
    </div>
  );
}
