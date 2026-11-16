import {
  SiExpress,
  SiNextdotjs,
  SiReact,
  SiShopify,
  SiWordpress,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Locale } from "@/i18n-config";

interface TechStackItem {
  name: string;
  use: string;
  why: string;
  href?: string;
  linkLabel?: string;
}

interface TechStackData {
  title: string;
  subtitle: string;
  items: TechStackItem[];
  extra: string;
}

interface TechStackSectionProps {
  data: TechStackData;
  headingId?: string;
  locale: Locale;
}

const TECH_ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  "Express.js": SiExpress,
  Shopify: SiShopify,
  WordPress: SiWordpress,
};

export default function TechStackSection({
  data,
  headingId = "tech-heading",
}: TechStackSectionProps) {
  return (
    <div
      className="px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:pt-20"
      dir="ltr"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-8 max-w-4xl text-center sm:mb-10">
          <h2
            id={headingId}
            className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {data.subtitle}
          </p>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {data.items.map((item) => {
            const Icon = TECH_ICONS[item.name];

            return (
              <li key={item.name} className="flex">
                <article className="flex w-full flex-col rounded-2xl border border-border bg-card p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-5">
                  <div className="flex items-center gap-3">
                    {Icon ? (
                      <span
                        className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                        aria-hidden="true"
                      >
                        <Icon className="size-5" />
                      </span>
                    ) : null}
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-tight text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-primary">
                        {item.use}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {item.why}
                  </p>

                </article>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground sm:mt-8 sm:text-sm">
          {data.extra}
        </p>
      </div>
    </div>
  );
}
