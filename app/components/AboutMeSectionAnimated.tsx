"use client";

import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AboutMeSectionAnimatedProps {
  paragraph1: string;
  paragraph2: string;
  cta: string;
  locale: Locale;
}

const ABOUT_IMAGES = [
  "/images/about/profile1.png",
  "/images/about/profile2.jpg",
  "/images/about/profile3.jpg",
  "/images/about/profile4.jpg",
  "/images/about/profile5.jpg",
];

const imageVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export default function AboutMeSectionAnimated({
  paragraph1,
  paragraph2,
  cta,
  locale,
}: AboutMeSectionAnimatedProps) {
  const isRtl = locale === "ar";

  // ✅ Slider state
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
      
      {/* ✅ Image Slider */}
      <motion.div
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative group w-full h-[280px] sm:h-[360px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-xl"
      >
        <div className="relative w-full h-full">
          {ABOUT_IMAGES.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`About image ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* ✅ Text Content */}
      <div className={isRtl ? "text-right" : "text-left"}>
        <motion.p
          custom={1}
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed mb-4 sm:mb-6"
        >
          {paragraph1}
        </motion.p>

        <motion.p
          custom={2}
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-10 max-w-xl"
        >
          {paragraph2}
        </motion.p>

        <motion.div
          custom={3}
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all"
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}