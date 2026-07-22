// components/AboutMeImageSlider.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Locale } from "@/i18n-config";

interface AboutMeImageSliderProps {
  images: string[];
  locale: Locale;
}

export default function AboutMeImageSlider({
  images,
  locale,
}: AboutMeImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const containerLabel =
    locale === "ar"
      ? "معرض الصور"
      : locale === "fr"
        ? "Galerie de photos"
        : "Photo gallery";

  const goToLabel =
    locale === "ar"
      ? "الانتقال إلى الصورة"
      : locale === "fr"
        ? "Aller à l'image"
        : "Go to image";

  return (
    <div
      className="relative group w-full h-[280px] sm:h-[360px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-xl"
      aria-label={containerLabel}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={img}
              alt={
                index === 0
                  ? locale === "ar"
                    ? "صورة من تجربتي"
                    : locale === "fr"
                      ? "Photo de mon expérience"
                      : "Photo from my experience"
                  : locale === "ar"
                    ? `صورة العرض ${index}`
                    : locale === "fr"
                      ? `Photo de présentation ${index}`
                      : `Showcase photo ${index}`
              }
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-primary"
                : "w-2 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`${goToLabel} ${i + 1}`}
            aria-current={i === currentIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
