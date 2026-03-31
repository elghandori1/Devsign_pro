"use client";

import { Users, Clock, BarChart3, Shield } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  text: string;
  subtext: string;
}

interface StatsTranslations {
  items: StatItem[];
}

export default function Statistics({
  translations,
}: {
  translations: StatsTranslations;
}) {
  if (!translations?.items) return null;

  const icons = [Users, Clock, BarChart3, Shield];

  return (
    <section className="max-w-7xl mx-auto p-4 fade-in-section">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
        {translations.items.map((item, idx) => {
          const Icon = icons[idx];

          return (
            <div
              key={idx}
              className="text-center group p-4 rounded-xl transition hover:bg-card/50"
            >
              {/* Icon */}
              <div className="text-primary w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition">
                <Icon className="w-10 h-10" />
              </div>

              {/* Counter */}
              <div className="font-bold text-2xl md:text-3xl text-foreground">
                <AnimatedCounter
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </div>

              {/* Text */}
              <div className="text-sm md:text-base font-medium text-foreground">
                {item.text}
              </div>

              {/* Subtext */}
              <div className="text-xs text-muted-foreground">
                {item.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}