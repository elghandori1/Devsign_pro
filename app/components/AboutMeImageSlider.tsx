"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n-config";

interface AboutMeImageSliderProps {
  locale: Locale;
}

const IMAGES = [
  "/images/about/profile1.png",
  "/images/about/profile2.jpg",
  "/images/about/profile55.jpg",
  "/images/about/profile4.jpg",
  "/images/about/profile5.jpg",
] as const;

const ALT_TEXT: Record<Locale, string[]> = {
  fr: [
    "Portrait de Mohammed Elghandori, consultant SEO et développeur web",
    "Mohammed Elghandori recevant un certificat à l'Université Al Akhawayn",
    "Mohammed Elghandori lors d'un événement à l'UM6P",
    "Mohammed Elghandori avec le prix de la deuxième place d'une compétition d'ingénierie",
    "Présentation d'un projet technique lors d'une compétition d'ingénierie",
  ],
  en: [
    "Portrait of Mohammed Elghandori, SEO consultant and web developer",
    "Mohammed Elghandori receiving a certificate at Al Akhawayn University",
    "Mohammed Elghandori at an UM6P event",
    "Mohammed Elghandori holding a second-place engineering competition award",
    "Technical project presentation during an engineering competition",
  ],
  ar: [
    "Portrait of Mohammed Elghandori, SEO consultant and web developer",
    "Mohammed Elghandori receiving a certificate at Al Akhawayn University",
    "Mohammed Elghandori at an UM6P event",
    "Mohammed Elghandori holding a second-place engineering competition award",
    "Technical project presentation during an engineering competition",
  ],
};

export default function AboutMeImageSlider({
  locale,
}: AboutMeImageSliderProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const PreviousArrow = ArrowLeft;
  const NextArrow = ArrowRight;

  const labels =
    locale === "fr"
      ? {
          gallery: "Photos de Mohammed Elghandori",
          previous: "Photo précédente",
          next: "Photo suivante",
          goTo: "Afficher la photo",
          position: "Photo",
          of: "sur",
        }
      : {
            gallery: "Photos of Mohammed Elghandori",
            previous: "Previous photo",
            next: "Next photo",
            goTo: "Show photo",
            position: "Photo",
            of: "of",
          };

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const updateActiveImage = () => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      const list = listRef.current;
      if (list) {
        const slides = Array.from(list.children) as HTMLElement[];
        const listCenter = list.getBoundingClientRect().left + list.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          const rect = slide.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - listCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      }
      frameRef.current = null;
    });
  };

  const showImage = (index: number) => {
    const list = listRef.current;
    const slide = list?.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const showPrevious = () => {
    showImage((activeIndex - 1 + IMAGES.length) % IMAGES.length);
  };

  const showNext = () => {
    showImage((activeIndex + 1) % IMAGES.length);
  };

  return (
    <figure
      className="relative min-h-[320px] overflow-hidden bg-muted sm:min-h-[420px] lg:min-h-[520px]"
      aria-label={labels.gallery}
    >
      <div
        ref={listRef}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={updateActiveImage}
        dir="ltr"
      >
        {IMAGES.map((src, index) => (
          <div
            key={src}
            className="relative h-full min-w-full snap-center snap-always"
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={src}
              alt={ALT_TEXT[locale][index]}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5"
        aria-hidden="true"
      />

      <div className="absolute inset-x-3 bottom-3 z-10 flex justify-center sm:bottom-4">
        <div className="flex items-center rounded-full border border-white/15 bg-black/55 p-0.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={showPrevious}
            className="inline-flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={labels.previous}
          >
            <PreviousArrow size={16} aria-hidden="true" />
          </button>
          {IMAGES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => showImage(index)}
              className="inline-flex size-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`${labels.goTo} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/55"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
          <button
            type="button"
            onClick={showNext}
            className="inline-flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={labels.next}
          >
            <NextArrow size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <figcaption className="sr-only" aria-live="polite">
        {labels.position} {activeIndex + 1} {labels.of} {IMAGES.length}
      </figcaption>
    </figure>
  );
}
