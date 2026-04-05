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
                className="flex flex-col h-full relative z-10"
              >
                {/* Service Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-muted to-muted/80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow p-6 sm:p-8">
                  {/* Title with underline animation - no transition on exit */}
                  <div className="mb-3">
                    <h4
                      className="text-xl sm:text-2xl font-bold group-hover:text-primary 
                         transition-colors duration-300 inline-block"
                    >
                      {service.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">
                    {service.description} ...
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
                    {service.features.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full
                         bg-primary/5 text-primary border border-primary/20
                         group-hover:bg-primary/10 group-hover:border-primary/40
                         transition-all duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA Text */}
                  <span
                    className="text-primary font-semibold text-sm group-hover:text-primary/80 
                         transition-colors duration-300 w-fit"
                  >
                    {sectionData.cta}
                  </span>
                </div>

                {/* Bottom accent bar - ONLY animates in, NO animation on exit */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40
               scale-x-0 group-hover:scale-x-100
               duration-500 origin-left rounded-b-full"
                  style={{
                    transitionProperty: "transform",
                    transitionTimingFunction: "ease-out",
                  }}
                />

                {/* Corner decoration - only moves on hover, no transition back */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                  <div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/15 to-transparent 
                        rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6
                        duration-300"
                    style={{
                      transitionProperty: "transform",
                      transitionTimingFunction: "ease-out",
                    }}
                  />
                </div>
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
