// components/ServicesGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n-config";
import { Check } from "lucide-react";

interface SectionData {
  sectionLabel: string;
  heading: string;
  highlight: string;
  viewAll: string;
  cta: string;
}

interface ServiceItem {
  image: string;
  title: string;
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
    <section
      className="px-4 sm:px-6 py-8 sm:py-10 fade-in-section"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div className={`max-w-2xl lg:${isRtl ? "text-right" : "text-left"}`}>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]">
              {sectionData.heading}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mt-2">
                {sectionData.highlight}
              </span>
            </h3>
          </div>

          <Link
            href={`/${locale}/services`}
            className="hidden lg:inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-md shadow-primary/20"
          >
            {sectionData.viewAll}
          </Link>
        </div>

        {/* Services Cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 fade-in-section">
          {servicesList.map((service) => (
            <article
              key={service.link}
              className="group flex flex-col h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20"
            >
              <Link
                href={`/${locale}${service.link}`}
                className="flex flex-col h-full"
              >
                {/* Service Image - Optimized by Next.js */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow p-6 sm:p-8 relative z-10">
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
                    {service.features.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full shadow-sm border border-border/50 text-muted-foreground flex items-center gap-1"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  {/* CTA Button with Zero-Dependency Inline SVGs */}
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-auto">
                    {sectionData.cta}
                    {isRtl ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:-translate-x-1.5"
                      >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
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
            {sectionData.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
