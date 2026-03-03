import Link from "next/link";
import { Monitor, Cpu, Palette, ArrowRight } from "lucide-react";
import { ReactNode } from "react";
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
    icon: ReactNode;
}

export default function ServicesGrid({ t, locale }: ServicesGridProps) {
    const data = t.services;

    const services: ServiceCard[] = [
        { ...data.web, icon: <Monitor size={22} className="text-white" /> },
        { ...data.systems, icon: <Cpu size={22} className="text-white" /> },
        { ...data.design, icon: <Palette size={22} className="text-white" /> },
    ];

    return (
        <section
            className="px-4 sm:px-6 py-2 sm:py-10"
            dir={locale === "ar" ? "rtl" : "ltr"}
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">

                    <div
                        className={`max-w-2xl lg:${locale === "ar" ? "text-right" : "text-left"
                            }`}
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
                            {data.heading}
                            <span className="block text-primary mt-2">
                                {data.highlight}
                            </span>
                        </h2>
                    </div>

                    {/* Desktop Button */}
                    <Link
                        href={`/${locale}/services`}
                        className="hidden lg:inline-flex px-5 py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:opacity-90"
                    >
                        {data.viewAll}
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.link}
                            href={`/${locale}${service.link}`}
                            className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                                {service.icon}
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                                {service.description}
                            </p>

                            <span className="flex items-center gap-2 text-primary font-medium text-sm">
                                {data.cta}
                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-2"
                                />
                            </span>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Button */}
                <div className="mt-10 flex justify-center lg:hidden">
                    <Link
                        href={`/${locale}/services`}
                        className="px-6 py-3 text-sm bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:opacity-90"
                    >
                        {data.viewAll}
                    </Link>
                </div>

            </div>
        </section>
    );
}