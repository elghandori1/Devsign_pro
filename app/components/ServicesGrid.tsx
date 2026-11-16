import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n-config";

interface ServiceCard {
  title: string;
  description: string;
  price?: string;
  link: string;
  image: string;
  imageAlt: string;
  proof: string;
}

interface SectionData {
  sectionLabel: string;
  heading: string;
  viewAll: string;
  cta: string;
  cards: ServiceCard[];
}

interface ServicesGridProps {
  sectionData: SectionData;
  locale: Locale;
  headingId?: string;
}

export default function ServicesGrid({
  sectionData,
  locale,
  headingId = "services-heading",
}: ServicesGridProps) {
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const cards = sectionData.cards ?? [];

  return (
    <div
      className="px-4 pb-8 pt-14 sm:px-6 sm:pb-10 sm:pt-16 lg:pt-20"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-12">
          <h2
            id={headingId}
            className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {sectionData.sectionLabel}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
            {sectionData.heading}
          </p>
        </header>

        <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <li key={card.link} className="flex">
              <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 2.5rem), 300px"
                  />
                  {card.price ? (
                    <span className="absolute end-3 top-3 rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-foreground shadow-md">
                      {card.price}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-primary">
                    {card.proof}
                  </p>

                  <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
                    <Link
                      href={`/${locale}${card.link}`}
                      className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background"
                    >
                      {card.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>

                  <span
                    className="mt-auto inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {sectionData.cta}
                    <Arrow
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={`/${locale}/services`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/5 px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
          >
            {sectionData.viewAll}
          </Link>
        </div>
      </div>
    </div>
  );
}
