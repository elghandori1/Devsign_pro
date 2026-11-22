"use client";

import { useEffect, useState } from "react";

type FilterKey = "all" | "professional" | "personal" | "academic";

interface PortfolioFiltersProps {
  filters: { id: FilterKey; label: string; count: number }[];
  /** id of the element holding the project cards. */
  gridId: string;
}

const isFilter = (value: string | null): value is FilterKey =>
  value === "all" || value === "professional" || value === "personal" || value === "academic";

/**
 * Client-side project filter. The page stays static with every project in the
 * HTML (good for crawlers); filtering only toggles a data attribute that CSS
 * uses to hide non-matching cards. `?filter=` links keep working.
 */
export default function PortfolioFilters({ filters, gridId }: PortfolioFiltersProps) {
  const [active, setActive] = useState<FilterKey>("all");

  const apply = (next: FilterKey, updateUrl: boolean) => {
    setActive(next);
    document.getElementById(gridId)?.setAttribute("data-filter", next);
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (next === "all") url.searchParams.delete("filter");
      else url.searchParams.set("filter", next);
      window.history.replaceState(null, "", url);
    }
  };

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("filter");
    if (isFilter(initial) && initial !== "all") {
      // Sync the UI with a shared ?filter= link after hydration.
      apply(initial, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {filters.map((filter) => {
        const isActive = active === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => apply(filter.id, true)}
            aria-pressed={isActive}
            aria-controls={gridId}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            <span>{filter.label}</span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[11px] tabular-nums ${
                isActive ? "bg-black/25" : "bg-muted text-background"
              }`}
            >
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
